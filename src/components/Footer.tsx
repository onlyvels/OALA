import { MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>© {new Date().getFullYear()} OnlyVels</div>
          <a
            href="https://t.me/oalaAdmin_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Add Content</span>
          </a>
        </div>
      </div>
    </footer>
  );
}