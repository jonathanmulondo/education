'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BookOpen, User, Trophy, Users, Bot } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-white">
              Practicum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/tracks"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Learning Tracks
            </Link>
            <Link
              href="/community"
              className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Community</span>
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </Link>
            <Link
              href="/mentor"
              className="flex items-center space-x-1 px-3 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
            >
              <Bot className="h-4 w-4" />
              <span>Ask Bob</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-800"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/tracks"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Learning Tracks
            </Link>
            <Link
              href="/community"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/leaderboard"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              href="/mentor"
              className="block px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Ask Bob
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
