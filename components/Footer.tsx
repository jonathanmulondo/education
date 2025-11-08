import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-bold mb-4">Practicum</h3>
            <p className="text-sm mb-4">
              Bridging the gap between theory and practice. Learn by doing with
              guided STEM projects and AI-powered mentorship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="hover:text-primary-400 transition-colors">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/tracks" className="hover:text-primary-400 transition-colors">
                  Learning Tracks
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-primary-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-primary-400 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Practicum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
