'use client';

import { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Play, Upload, Download, Bug, RotateCcw } from 'lucide-react';
import type { CodeEditorProps } from '@/types/enhanced';

export default function CodeEditor({
  code,
  language,
  onChange,
  onRun,
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure editor
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: readOnly,
      automaticLayout: true,
    });

    // Add Arduino snippets for C++
    if (language === 'cpp') {
      monaco.languages.registerCompletionItemProvider('cpp', {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: 'setup',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'void setup() {\n\t$0\n}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Arduino setup function',
              },
              {
                label: 'loop',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'void loop() {\n\t$0\n}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Arduino loop function',
              },
              {
                label: 'pinMode',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'pinMode(${1:pin}, ${2:mode});$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Set pin mode (INPUT, OUTPUT, INPUT_PULLUP)',
              },
              {
                label: 'digitalWrite',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'digitalWrite(${1:pin}, ${2:value});$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Write digital value (HIGH or LOW)',
              },
              {
                label: 'digitalRead',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'digitalRead(${1:pin})$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Read digital value from pin',
              },
              {
                label: 'analogWrite',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'analogWrite(${1:pin}, ${2:value});$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Write PWM value (0-255)',
              },
              {
                label: 'analogRead',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'analogRead(${1:pin})$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Read analog value (0-1023)',
              },
              {
                label: 'delay',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'delay(${1:ms});$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Delay in milliseconds',
              },
              {
                label: 'Serial.begin',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'Serial.begin(${1:9600});$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Initialize serial communication',
              },
              {
                label: 'Serial.println',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'Serial.println(${1:value});$0',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Print line to serial monitor',
              },
            ],
          };
        },
      });
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and running...\n');

    try {
      if (onRun) {
        await onRun();
      } else {
        // Simulate execution
        setTimeout(() => {
          setOutput('Program started...\n\nSerial Monitor Output:\n> Ready\n> Running main loop\n');
          setIsRunning(false);
        }, 2000);
      }
    } catch (error) {
      setOutput(`Error: ${error}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleDebug = async () => {
    setShowDebugPanel(true);
    const currentCode = editorRef.current?.getValue() || code;

    try {
      const response = await fetch('/api/ai/debug-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: currentCode,
          language,
        }),
      });

      const result = await response.json();

      // Add markers for errors
      if (result.errors && editorRef.current) {
        const monaco = (window as any).monaco;
        const model = editorRef.current.getModel();

        const markers = result.errors.map((error: any) => ({
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: error.line,
          startColumn: 1,
          endLineNumber: error.line,
          endColumn: 100,
          message: error.message,
        }));

        monaco.editor.setModelMarkers(model, 'owner', markers);
      }

      setOutput(`Debug Analysis:\n\n${result.explanation}\n\n${result.errors?.map((e: any) => `Line ${e.line}: ${e.message}`).join('\n') || 'No errors found!'}`);
    } catch (error) {
      setOutput(`Debug failed: ${error}`);
    }
  };

  const handleDownload = () => {
    const currentCode = editorRef.current?.getValue() || code;
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'cpp' ? 'ino' : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm('Reset code to original? This cannot be undone.')) {
      onChange?.(code);
      editorRef.current?.setValue(code);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-300">
            {language === 'cpp' ? 'Arduino C++' : language === 'python' ? 'Python' : 'JavaScript'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {!readOnly && (
            <>
              <button
                onClick={handleDebug}
                className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition-colors"
                title="Debug with AI"
              >
                <Bug className="h-4 w-4" />
                <span>Debug</span>
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors disabled:opacity-50"
                title="Run code"
              >
                <Play className="h-4 w-4" />
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 hover:bg-gray-700 text-gray-300 rounded transition-colors"
                title="Reset code"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </>
          )}

          <button
            onClick={handleDownload}
            className="p-1.5 hover:bg-gray-700 text-gray-300 rounded transition-colors"
            title="Download code"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-grow">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={(value) => onChange?.(value || '')}
          onMount={handleEditorDidMount}
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>

      {/* Output Panel */}
      {(output || showDebugPanel) && (
        <div className="border-t border-gray-700 bg-gray-800 p-4 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-300">
              {showDebugPanel ? 'Debug Output' : 'Serial Monitor'}
            </span>
            <button
              onClick={() => {
                setOutput('');
                setShowDebugPanel(false);
              }}
              className="text-xs text-gray-400 hover:text-gray-200"
            >
              Clear
            </button>
          </div>
          <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
