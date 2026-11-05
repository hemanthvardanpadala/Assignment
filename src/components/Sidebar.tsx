import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, CalendarOff,
  DollarSign, LogOut, UserPlus, UserRoundCog,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/employees', icon: Users, label: 'Employees' },
  { to: '/attendance', icon: UserPlus, label: 'Add Employee' },
  { to: '/leaves', icon: CalendarOff, label: 'Candidate Tracker' },
  { to: '/payroll', icon: DollarSign, label: 'Salary Management' },
  { to: '/departments', icon: UserRoundCog, label: 'User Management' },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#111827] text-white z-30 flex flex-col border-r border-[#1d283a]
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-[#1d283a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-[#223455] bg-[#0f1b31] flex items-center justify-center text-[#3b82f6] shadow-[0_0_0_1px_rgba(59,130,246,0.06)]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-[18px] leading-none">EMS</div>
              <div className="text-slate-400 text-sm mt-1">Management System</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 px-4 py-4 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-[#1e3a5f]/70 text-[#60a5fa]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#182233]'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info & logout */}
        <div className="border-t border-[#1d283a] p-4">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center text-sm font-bold text-white shrink-0">
              {user?.name?.[0] ?? 'A'}
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-white truncate">{user?.name}</div>
              <div className="text-[12px] text-slate-400 truncate">{user?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg text-[14px] transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
