import { useEffect, useMemo, useState } from 'react';
import {
  CircleSlash,
  Edit2,
  Info,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
  UserX,
  X,
} from 'lucide-react';

interface LeaveApiItem {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: 'Annual' | 'Sick' | 'Casual' | 'Maternity' | 'Paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

type CandidateStatus = 'New' | 'Joined' | 'Dropped';
type RoundStatus = 'Completed' | 'In Progress';

type Candidate = {
  id: string;
  name: string;
  technology: string;
  round1: RoundStatus;
  round2: RoundStatus;
  vendor: string;
  offer: boolean;
  salary: number;
  joiningDate: string;
  status: CandidateStatus;
};

const techMap: Record<string, string> = {
  Annual: 'Manual Testing',
  Sick: 'React',
  Casual: 'Data Analytics',
  Maternity: 'Operations',
  Paternity: 'Support',
};

const statusStyles: Record<CandidateStatus, string> = {
  New: 'border border-blue-500/30 bg-blue-500/10 text-blue-300',
  Joined: 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  Dropped: 'border border-rose-500/30 bg-rose-500/10 text-rose-300',
};

const roundStyles: Record<RoundStatus, string> = {
  Completed: 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  'In Progress': 'border border-amber-500/30 bg-amber-500/10 text-amber-300',
};

const cardStyles = [
  'bg-blue-500/15 text-blue-300',
  'bg-sky-500/15 text-sky-300',
  'bg-emerald-500/15 text-emerald-300',
  'bg-rose-500/15 text-rose-300',
];

const roundOptions = ['New', 'Completed', 'In Progress'] as const;
const statusOptions: CandidateStatus[] = ['New', 'Joined', 'Dropped'];
const offerOptions = ['No', 'Yes'] as const;

const inputClass =
  'h-10 w-full rounded-lg border border-[#1d283a] bg-[#0f172a]/70 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30';

type CandidateForm = {
  name: string;
  technology: string;
  round1: string;
  round2: string;
  vendor: string;
  status: CandidateStatus;
  onboardingDate: string;
  joiningDate: string;
  offer: string;
  salary: string;
  remarks: string;
};

const emptyForm: CandidateForm = {
  name: '',
  technology: '',
  round1: 'New',
  round2: 'New',
  vendor: '',
  status: 'New',
  onboardingDate: '',
  joiningDate: '',
  offer: 'No',
  salary: '',
  remarks: '',
};

export default function Leaves() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | CandidateStatus>('All');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<CandidateForm>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/leaves');
        const data = await res.json();
        const items: LeaveApiItem[] = data.items ?? [];
        setCandidates(items.map((leave, index) => ({
          id: `C-${String(index + 1).padStart(3, '0')}`,
          name: leave.employeeName,
          technology: techMap[leave.leaveType] ?? 'General',
          round1: leave.status === 'Rejected' ? 'In Progress' : 'Completed',
          round2: leave.status === 'Pending' ? 'In Progress' : 'Completed',
          vendor: leave.department,
          offer: leave.status === 'Approved',
          salary: 6 + leave.days,
          joiningDate: leave.endDate,
          status:
            leave.status === 'Approved' ? 'Joined' : leave.status === 'Rejected' ? 'Dropped' : ('New' as CandidateStatus),
        })));
      } catch (error) {
        console.error('Failed to load leaves', error);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaves();
  }, []);

  const filtered = useMemo(
    () =>
      candidates.filter(candidate => {
        const q = search.toLowerCase();
        const bySearch =
          !q ||
          candidate.name.toLowerCase().includes(q) ||
          candidate.technology.toLowerCase().includes(q) ||
          candidate.vendor.toLowerCase().includes(q);
        const byStatus = statusFilter === 'All' || candidate.status === statusFilter;
        return bySearch && byStatus;
      }),
    [candidates, search, statusFilter],
  );

  const totals = useMemo(
    () => ({
      total: candidates.length,
      newCount: candidates.filter(c => c.status === 'New').length,
      joined: candidates.filter(c => c.status === 'Joined').length,
      dropped: candidates.filter(c => c.status === 'Dropped').length,
    }),
    [candidates],
  );

  const removeCandidate = (id: string) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== id));
  };

  const addCandidate = () => {
    if (!form.name.trim()) return;
    const newCandidate: Candidate = {
      id: `C-${String(candidates.length + 1).padStart(3, '0')}`,
      name: form.name.trim(),
      technology: form.technology.trim() || 'General',
      round1: (form.round1 === 'New' ? 'In Progress' : form.round1) as RoundStatus,
      round2: (form.round2 === 'New' ? 'In Progress' : form.round2) as RoundStatus,
      vendor: form.vendor.trim() || '—',
      offer: form.offer === 'Yes',
      salary: form.salary ? Number(form.salary) / 100000 : 0,
      joiningDate: form.joiningDate || '—',
      status: form.status,
    };
    setCandidates(prev => [newCandidate, ...prev]);
    setForm(emptyForm);
    setShowAdd(false);
  };

  if (loading) {
    return <div className="text-slate-300">Loading leave tracker...</div>;
  }

  return (
    <div className="space-y-8 animate-fadeIn text-slate-200">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[30px] leading-9 font-bold tracking-tight text-slate-50">Candidate Tracker</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track interview pipeline and onboarding status
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#3b82f6] px-4 text-sm font-medium text-white shadow-[0_0_18px_rgba(59,130,246,0.35)] hover:bg-[#2563eb]"
        >
          <Plus className="h-4 w-4" />
          Add Candidate
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total', value: totals.total, icon: Users },
          { label: 'New', value: totals.newCount, icon: Info },
          { label: 'Joined', value: totals.joined, icon: UserCheck },
          { label: 'Dropped', value: totals.dropped, icon: UserX },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-50">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                </div>
                <div className={`rounded-xl p-3 ${cardStyles[index]}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-3">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-9 w-full rounded-md border border-[#1d283a] bg-transparent pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Search by name, technology, vendor..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as 'All' | CandidateStatus)}
            className="h-9 w-full rounded-md border border-[#1d283a] bg-transparent px-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 md:w-48"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Joined">Joined</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1d283a] bg-[#111827]/95 shadow-sm">
        <div className="border-b border-[#1d283a] px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-50">Pipeline</h3>
          <p className="mt-1 text-sm text-slate-400">{filtered.length} candidates</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1320px]">
            <thead>
              <tr className="border-b border-[#1d283a] bg-[rgba(15,23,42,0.45)]">
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Name</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Technology</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Round 1</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Round 2</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Vendor</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Offer</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Salary (LPA)</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Joining Date</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Status</th>
                <th className="px-3 py-2 text-right text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1d283a]">
              {filtered.map(candidate => (
                <tr key={candidate.id} className="hover:bg-[#0f1b31]/60 transition-colors">
                  <td className="px-3 py-3 text-sm font-semibold text-slate-50">{candidate.name}</td>
                  <td className="px-3 py-3 text-sm text-slate-200">{candidate.technology}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roundStyles[candidate.round1]}`}>
                      {candidate.round1}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roundStyles[candidate.round2]}`}>
                      {candidate.round2}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-300">{candidate.vendor}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        candidate.offer
                          ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                          : 'border border-slate-500/30 bg-slate-500/10 text-slate-300'
                      }`}
                    >
                      {candidate.offer ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm font-medium text-slate-100">{candidate.salary.toFixed(1)}</td>
                  <td className="px-3 py-3 text-sm text-slate-200">{candidate.joiningDate}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[candidate.status]}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-md p-1.5 text-slate-400 hover:bg-blue-500/10 hover:text-blue-300">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeCandidate(candidate.id)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-6 py-14 text-center text-lg text-slate-500">
                    <div className="inline-flex items-center gap-2">
                      <CircleSlash className="h-5 w-5" />
                      No candidates found for the selected filters
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Candidate Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-[#1d283a] bg-[#111827] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1d283a] px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-50">Add Candidate</h2>
                <p className="mt-0.5 text-sm text-slate-400">Enter the new candidate details</p>
              </div>
              <button
                onClick={() => { setShowAdd(false); setForm(emptyForm); }}
                className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Candidate Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full name"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Technology</label>
                  <input
                    value={form.technology}
                    onChange={e => setForm(prev => ({ ...prev, technology: e.target.value }))}
                    placeholder="e.g. React, Python"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Round 1 Status</label>
                  <select
                    value={form.round1}
                    onChange={e => setForm(prev => ({ ...prev, round1: e.target.value }))}
                    className={inputClass}
                  >
                    {roundOptions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Round 2 Status</label>
                  <select
                    value={form.round2}
                    onChange={e => setForm(prev => ({ ...prev, round2: e.target.value }))}
                    className={inputClass}
                  >
                    {roundOptions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Vendor Name</label>
                  <input
                    value={form.vendor}
                    onChange={e => setForm(prev => ({ ...prev, vendor: e.target.value }))}
                    placeholder="Optional"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Overall Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(prev => ({ ...prev, status: e.target.value as CandidateStatus }))}
                    className={inputClass}
                  >
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Onboarding Date</label>
                  <input
                    type="date"
                    value={form.onboardingDate}
                    onChange={e => setForm(prev => ({ ...prev, onboardingDate: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Joining Date</label>
                  <input
                    type="date"
                    value={form.joiningDate}
                    onChange={e => setForm(prev => ({ ...prev, joiningDate: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Offer Released</label>
                  <select
                    value={form.offer}
                    onChange={e => setForm(prev => ({ ...prev, offer: e.target.value }))}
                    className={inputClass}
                  >
                    {offerOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-200">Salary Offering (₹)</label>
                  <input
                    type="number"
                    value={form.salary}
                    onChange={e => setForm(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="e.g. 40000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">Remarks</label>
                <textarea
                  value={form.remarks}
                  onChange={e => setForm(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="Any notes..."
                  rows={3}
                  className="w-full rounded-lg border border-[#1d283a] bg-[#0f172a]/70 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-y"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#1d283a] px-6 py-4">
              <button
                onClick={() => { setShowAdd(false); setForm(emptyForm); }}
                className="h-10 rounded-lg border border-[#1d283a] px-4 text-sm text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={addCandidate}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#3b82f6] px-4 text-sm font-semibold text-white hover:bg-[#2563eb]"
              >
                Add Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}