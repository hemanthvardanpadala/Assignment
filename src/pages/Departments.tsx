import { useState } from 'react';
import { KeyRound, Trash2, UserPlus, X } from 'lucide-react';

type UserRole = 'Admin' | 'HR' | 'Manager';

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  isYou?: boolean;
};

const initialUsers: UserRecord[] = [
  {
    id: 'U001',
    name: 'Hemanth Vardan Padala',
    email: 'hemanth@gmail.com',
    role: 'Admin',
    createdAt: '17/03/2026',
    isYou: true,
  },
  {
    id: 'U002',
    name: 'testUser1',
    email: 'testUser1@gmail.com',
    role: 'Admin',
    createdAt: '19/03/2026',
  },
  {
    id: 'U003',
    name: 'testUser2',
    email: 'testUser2@gmail.com',
    role: 'Admin',
    createdAt: '20/03/2026',
  },
  {
    id: 'U004',
    name: 'testUser3',
    email: 'testUser3@gmail.com',
    role: 'Admin',
    createdAt: '23/03/2026',
  },
  {
    id: 'U005',
    name: 'testUser4',
    email: 'testUser4@gmail.com',
    role: 'HR',
    createdAt: '24/03/2026',
  },
  {
    id: 'U006',
    name: 'testUser5',
    email: 'testUser5@gmail.com',
    role: 'HR',
    createdAt: '24/03/2026',
  },
];

const inputClass =
  'h-10 w-full rounded-lg border border-[#1d283a] bg-[#0f172a]/70 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30';

export default function Departments() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'HR' as UserRole });

  const updateRole = (id: string, role: UserRole) => {
    setUsers(prev => prev.map(user => (user.id === id ? { ...user, role } : user)));
  };

  const removeUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleCreate = () => {
    if (!form.name.trim() || !form.email.trim()) return;

    const newUser: UserRecord = {
      id: `U${String(users.length + 1).padStart(3, '0')}`,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      createdAt: new Date().toLocaleDateString('en-GB'),
    };

    setUsers(prev => [newUser, ...prev]);
    setShowCreate(false);
    setForm({ name: '', email: '', role: 'HR' });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-200">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[30px] leading-9 font-bold tracking-tight text-slate-50">User Management</h1>
          <p className="mt-1 text-sm text-slate-400">Manage user accounts and permissions ({users.length} total)</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#3b82f6] px-4 text-sm font-medium text-white shadow-[0_0_18px_rgba(59,130,246,0.35)] hover:bg-[#2563eb]"
        >
          <UserPlus className="h-5 w-5" />
          Create User
        </button>
      </div>

      <div className="rounded-xl border border-[#1d283a] bg-[#111827]/95 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-[#1d283a] bg-[rgba(15,23,42,0.45)]">
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">User</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Email</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Role</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Created</th>
                <th className="px-3 py-2 text-right text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1d283a]">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-[#0f1b31]/60 transition-colors">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f2b57] text-sm font-semibold text-[#6aa3ff]">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-50">{user.name}</p>
                        {user.isYou && (
                          <span className="mt-1 inline-flex rounded-md border border-[#1d283a] bg-[#0f172a] px-2 py-0.5 text-xs text-slate-300">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-300">{user.email}</td>
                  <td className="px-3 py-3">
                    {user.isYou ? (
                      <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                        {user.role}
                      </span>
                    ) : (
                      <select
                        value={user.role}
                        onChange={e => updateRole(user.id, e.target.value as UserRole)}
                        className="h-8 rounded-lg border border-[#1d283a] bg-[#0f172a]/70 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      >
                        <option value="Admin">Admin</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                      </select>
                    )}
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-300">{user.createdAt}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-blue-500/10 hover:text-blue-300" title="Reset Password">
                        <KeyRound className="h-5 w-5" />
                      </button>
                      {!user.isYou && (
                        <button
                          onClick={() => removeUser(user.id)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300"
                          title="Delete User"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#1d283a] bg-[#111827] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1d283a] px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-50">Create User</h2>
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Full Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@company.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Role</label>
                <select
                  value={form.role}
                  onChange={e => setForm(prev => ({ ...prev, role: e.target.value as UserRole }))}
                  className={inputClass}
                >
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#1d283a] px-6 py-4">
              <button
                onClick={() => setShowCreate(false)}
                className="h-10 rounded-lg border border-[#1d283a] px-4 text-sm text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#3b82f6] px-4 text-sm font-semibold text-white hover:bg-[#2563eb]"
              >
                <UserPlus className="h-4 w-4" />
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}