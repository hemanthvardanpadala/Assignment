import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#040914] overflow-hidden text-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-8 bg-[#060b17] bg-[linear-gradient(rgba(60,85,130,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(60,85,130,0.12)_1px,transparent_1px)] bg-[size:28px_28px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
