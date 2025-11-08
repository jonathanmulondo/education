'use client';

import { useState } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import type { MentorMessage } from '@/types';

interface MentorChatProps {
  projectId: string;
  stepId?: string;
}

export default function MentorChat({ projectId, stepId }: MentorChatProps) {
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your AI mentor. I'm here to help you understand the concepts and answer any questions about this project. Feel free to ask 'why' or 'how' questions!",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: MentorMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          step_id: stepId,
          user_query: input,
          conversation_history: messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: MentorMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: MentorMessage = {
        role: 'assistant',
        content:
          "I'm sorry, I encountered an error. Please try again or check your connection.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card h-[600px] flex flex-col">
      <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Bot className="h-6 w-6 text-primary-600" />
        <h3 className="text-lg font-semibold">AI Mentor</h3>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto space-y-4 mb-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-primary-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {message.role === 'user' ? (
                <UserIcon className="h-5 w-5 text-white" />
              ) : (
                <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </div>
            <div
              className={`flex-grow max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Bot className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="input-field"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="btn-primary flex items-center space-x-2"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
