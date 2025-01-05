import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <GraduationCap className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            OnlyVels Advanced Learning Academy
          </h1>
        </div>
      </div>
    </header>
  );
}