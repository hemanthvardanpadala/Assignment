import { useEffect, useMemo, useState } from 'react';
import { Banknote, CreditCard, DollarSign, Edit2, Plus, Search, Trash2, TrendingUp, X } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Processed' | 'Pending' | 'On Hold';
}

const formatINR = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const creditDates = [
  '25 Mar 2026', '25 Mar 2026', '24 Mar 2026', '24 Mar 2026',
  '23 Mar 2026', '22 Mar 2026', '21 Mar 2026', '20 Mar 2026',
];

export default function Payroll() {
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('2026');
  const [monthFilter, setMonthFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState({
    employeeName: '',
    employeeId: '',
    amount: '',
    paymentMode: 'Bank Transfer',
    reference: '',
    remarks: '',
  });

  useEffect(() => {
    const loadPayroll = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/payroll');
        const data = await res.json();
        setRecords(data.items ?? []);
      } catch (error) {
        console.error('Failed to load payroll', error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    loadPayroll();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return records.filter(record => {
      const matchSearch = !q ||
        record.employeeName.toLowerCase().includes(q) ||
        record.employeeId.toLowerCase().includes(q);
      const matchMonth = monthFilter === 'All' || record.month.startsWith(monthFilter);
      return matchSearch && matchMonth;
    });
  }, [records, search, monthFilter]);

  const totals = useMemo(() => {
    const totalDisbursed = records.reduce((sum, record) => sum + record.netSalary, 0);
    const avgPerRecord = records.length ? Math.round(totalDisbursed / records.length) : 0;
    return {
      totalDisbursed,
      totalRecords: records.length,
      avgPerRecord,
    };
  }, [records]);

  const monthlyData = useMemo(() => {
    const grouped = new Map<string, number>();
    records.forEach(record => {
      grouped.set(record.month, (grouped.get(record.month) ?? 0) + record.netSalary);
    });

    return [...grouped.entries()].map(([month, total]) => ({
      month: month.split(' ')[0],
      total,
    }));
  }, [records]);

  const removeRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const handleAddRecord = () => {
    if (!addForm.employeeName.trim() || !addForm.amount.trim()) return;
    const newRecord: PayrollRecord = {
      id: `P${String(records.length + 1).padStart(3, '0')}`,
      employeeId: addForm.employeeId.trim() || `VK-${String(records.length + 1).padStart(4, '0')}`,
      employeeName: addForm.employeeName.trim(),
      department: '',
      month: 'March 2026',
      basicSalary: Number(addForm.amount) || 0,
      allowances: 0,
      deductions: 0,
      netSalary: Number(addForm.amount) || 0,
      status: 'Processed',
    };
    setRecords(prev => [newRecord, ...prev]);
    setShowAddModal(false);
    setAddForm({ employeeName: '', employeeId: '', amount: '', paymentMode: 'Bank Transfer', reference: '', remarks: '' });
  };

  if (loading) {
    return <div className="text-slate-300">Loading payroll data...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[30px] leading-9 font-bold tracking-tight text-slate-50">Salary Management</h1>
          <p className="mt-1 text-sm text-slate-400">Track and manage salary disbursements</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#3b82f6] px-4 text-sm font-medium text-white shadow-[0_0_18px_rgba(59,130,246,0.35)] hover:bg-[#2563eb]"
        >
          <Plus className="h-4 w-4" />
          Add Salary Record
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            label: 'Total Disbursed',
            value: formatINR(totals.totalDisbursed),
            subtitle: 'Year 2026',
            icon: DollarSign,
            color: 'bg-emerald-500/15 text-emerald-400',
          },
          {
            label: 'Total Records',
            value: String(totals.totalRecords),
            subtitle: 'Salary entries',
            icon: CreditCard,
            color: 'bg-blue-500/15 text-blue-400',
          },
          {
            label: 'Avg. per Record',
            value: formatINR(totals.avgPerRecord),
            subtitle: 'Average salary',
            icon: TrendingUp,
            color: 'bg-amber-500/15 text-amber-400',
          },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{item.label}</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-50">{item.value}</h3>
                  <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                </div>
                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Banknote className="h-5 w-5 text-blue-400" />
          Monthly Disbursement (2026)
        </h2>
        <div className="mt-6 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ left: 10, right: 10, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1d283a" />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={{ stroke: '#1d283a' }} />
              <YAxis
                stroke="#94a3b8"
                tickLine={false}
                axisLine={{ stroke: '#1d283a' }}
                tickFormatter={value => `₹${Math.round(value / 1000)}k`}
              />
              <Tooltip
                formatter={value => [formatINR(Number(value ?? 0)), 'Disbursed']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1d283a',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                }}
                itemStyle={{ color: '#e2e8f0' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#111827]/95 border border-[#1d283a] rounded-xl p-3">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, ID, amount, reference..."
              className="h-9 w-full pl-10 pr-4 border border-[#1d283a] bg-transparent rounded-md text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="h-9 px-4 border border-[#1d283a] bg-transparent rounded-md text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
          <select
            value={monthFilter}
            onChange={e => setMonthFilter(e.target.value)}
            className="h-9 px-4 border border-[#1d283a] bg-transparent rounded-md text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="All">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1d283a] bg-[#111827]/95 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-[#1d283a] bg-[rgba(15,23,42,0.45)]">
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Employee</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Credit Date</th>
                <th className="px-3 py-2 text-right text-sm font-medium text-slate-400">Amount</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Payment Mode</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Reference</th>
                <th className="px-3 py-2 text-left text-sm font-medium text-slate-400">Remarks</th>
                <th className="px-3 py-2 text-right text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1d283a]">
              {filtered.map((record, idx) => (
                <tr key={record.id} className="hover:bg-[#0f1b31]/60 transition-colors">
                  <td className="px-3 py-3">
                    <p className="text-sm font-semibold text-slate-50">{record.employeeName}</p>
                    <p className="text-sm text-slate-500">{record.employeeId}</p>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-300">{creditDates[idx % creditDates.length]}</td>
                  <td className="px-3 py-3 text-right text-sm font-semibold text-slate-50">{formatINR(record.netSalary)}</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                      Bank Transfer
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-400">—</td>
                  <td className="px-3 py-3 text-sm text-slate-300">{record.month.split(' ')[0]}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-md p-1.5 text-slate-400 hover:bg-blue-500/10 hover:text-blue-300" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeRecord(record.id)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-sm text-slate-500">
                    No salary records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#213354] bg-[#0f182b] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#213354] px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-50">Add Salary Record</h2>
              <button onClick={() => setShowAddModal(false)} className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Employee Name *</label>
                <input
                  value={addForm.employeeName}
                  onChange={e => setAddForm(prev => ({ ...prev, employeeName: e.target.value }))}
                  placeholder="e.g. Arjun Mehta"
                  className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Employee ID</label>
                <input
                  value={addForm.employeeId}
                  onChange={e => setAddForm(prev => ({ ...prev, employeeId: e.target.value }))}
                  placeholder="e.g. VK-0001"
                  className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Amount (₹) *</label>
                <input
                  type="number"
                  value={addForm.amount}
                  onChange={e => setAddForm(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="e.g. 17887"
                  className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Payment Mode</label>
                <select
                  value={addForm.paymentMode}
                  onChange={e => setAddForm(prev => ({ ...prev, paymentMode: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Remarks</label>
                <input
                  value={addForm.remarks}
                  onChange={e => setAddForm(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="e.g. Feb salary"
                  className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-[#213354] px-6 py-4 bg-[#0b1427] rounded-b-2xl">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 border border-[#2a3f62] bg-[#0f1a2f] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRecord}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}