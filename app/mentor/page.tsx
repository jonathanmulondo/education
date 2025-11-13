'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles, Lightbulb, Code, Cpu } from 'lucide-react';

export default function MentorPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_query: userMessage,
          conversation_history: messages,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    { icon: Lightbulb, text: "Explain Ohm's Law", color: 'yellow' },
    { icon: Code, text: 'How do I use Arduino Serial?', color: 'blue' },
    { icon: Cpu, text: 'What is a microcontroller?', color: 'purple' },
    { icon: Sparkles, text: 'Help me debug my circuit', color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4">
            <Bot className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-yellow-500 bg-clip-text text-transparent">
            Ask Bob
          </h1>
          <p className="text-gray-400 text-lg">
            Your 24/7 STEM learning companion. Ask me anything about electronics, programming, or engineering!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Bot className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Start a conversation</h3>
                <p className="text-gray-500 mb-6">Ask me anything about STEM, circuits, or coding!</p>

                {/* Quick Questions */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                  {quickQuestions.map((q, index) => {
                    const Icon = q.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setInput(q.text)}
                        className={`p-4 bg-gray-800 border border-${q.color}-500/20 hover:border-${q.color}-500/50 rounded-lg text-left transition-all group`}
                      >
                        <Icon className={`h-5 w-5 text-${q.color}-400 mb-2`} />
                        <p className="text-sm text-gray-300 group-hover:text-white">{q.text}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 border border-gray-700 text-gray-200'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-400">Bob</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 p-4 bg-gray-900">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about STEM..."
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center space-x-2"
              >
                <span>Send</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI responses may occasionally be inaccurate. Always verify critical information.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <Lightbulb className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Concept Explanations</h3>
            <p className="text-sm text-gray-400">Get clear explanations of complex topics</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <Code className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Code Help</h3>
            <p className="text-sm text-gray-400">Debug and improve your code</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
            <Cpu className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Circuit Guidance</h3>
            <p className="text-sm text-gray-400">Design and troubleshoot circuits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
