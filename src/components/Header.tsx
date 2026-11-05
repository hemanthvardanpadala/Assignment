import { Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[rgba(15,23,42,0.8)] border-b border-white/5 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-10 backdrop-blur-sm">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-400 hover:text-slate-100 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold text-slate-100">Employee Management System</h1>
      </div>

      <button className="ml-auto flex items-center gap-3 rounded-full bg-[#0b1730] border border-[#1d283a] pl-1.5 pr-3 py-1.5 text-left">
        <div className="w-10 h-10 rounded-full bg-[#0f2b57] flex items-center justify-center text-sm font-semibold text-[#79a7ff]">
          {user?.name?.[0] ?? 'A'}
        </div>
        <div className="hidden sm:block leading-tight">
          <div className="text-[12px] font-semibold text-slate-100">{user?.name}</div>
          <div className="text-[11px] text-slate-400">{user?.role}</div>
        </div>
        <ChevronDown className="hidden sm:block w-4 h-4 text-slate-500" />
      </button>
    </header>
  );
}
