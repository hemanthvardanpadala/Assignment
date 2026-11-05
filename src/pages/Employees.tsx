import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Search, UserPlus, Download, Upload,
  Eye, Pencil, Trash2, Users, Check, X,
  Mail, Phone, Building2, Briefcase, Calendar, Filter,
} from 'lucide-react';

interface EmployeeApiResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: string;
  salary: number;
  avatar?: string;
  technology?: string;
  laptop?: { issued: boolean; model?: string };
  desktop?: { issued: boolean; model?: string };
  id_card_issued?: boolean;
  o365_account_created?: boolean;
}

function StatusChip({ issued }: { issued?: boolean }) {
  return issued ? (
    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-[#1d283a] font-medium leading-none min-h-7">
      <Check className="w-2.5 h-2.5" /> Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-[#1d283a] font-medium leading-none min-h-7">
      <X className="w-2.5 h-2.5" /> No
    </span>
  );
}

export default function Employees() {
  const { hasRole } = useAuth();
  const [employees, setEmployees] = useState<EmployeeApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [techFilter, setTechFilter] = useState('all');
  const [laptopFilter, setLaptopFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selected, setSelected] = useState<EmployeeApiResponse | null>(null);
  const [form, setForm] = useState<Partial<EmployeeApiResponse>>({});
  const [importing, setImporting] = useState(false);

  const canEdit = hasRole(['admin', 'hr', 'administrator']);

  const technologies = [...new Set(employees.map(e => e.technology).filter(Boolean))] as string[];

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/employees');
        const data = await res.json();
        setEmployees(data.items ?? []);
      } catch (error) {
        console.error('Failed to load employees', error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  if (loading) {
    return <div className="text-slate-300">Loading employees...</div>;
  }

  const filtered = employees.filter((e: EmployeeApiResponse) => {
    const matchSearch = !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchTech = techFilter === 'all' || e.technology === techFilter;
    const matchLaptop = laptopFilter === 'all' ||
      (laptopFilter === 'yes' ? !!e.laptop?.issued : !e.laptop?.issued);
    const matchStatus = statusFilter === 'all' ||
      (statusFilter === 'active' ? e.status === 'Active' : e.status !== 'Active');
    return matchSearch && matchTech && matchLaptop && matchStatus;
  });

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Designation', 'Status', 'Join Date', 'Technology', 'Laptop', 'Desktop', 'ID Card', 'O365'];
    const rows = filtered.map((e: EmployeeApiResponse) => [
      e.id, e.name, e.email, e.phone, e.department, e.designation,
      e.status, e.joinDate, e.technology ?? '',
      e.laptop?.issued ? 'Yes' : 'No',
      e.desktop?.issued ? 'Yes' : 'No',
      e.id_card_issued ? 'Yes' : 'No',
      e.o365_account_created ? 'Yes' : 'No',
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const [, ...dataRows] = text.split('\n').filter(l => l.trim());
        let created = 0, skipped = 0;
        const newEmps: EmployeeApiResponse[] = [];
        dataRows.forEach(row => {
          const cols = row.split(',').map(c => c.replace(/^"|"$/g, '').trim());
          const [id, name, email, phone, department, designation, status, joinDate] = cols;
          if (!name || !email) { skipped++; return; }
          if (employees.find(emp => emp.id === id)) { skipped++; return; }
          newEmps.push({
            id: id || `E${Date.now()}`,
            name, email, phone: phone || '',
            department: department || 'Engineering',
            designation: designation || '',
            status: (['Active', 'Inactive', 'On Leave'].includes(status) ? status : 'Active') as EmployeeApiResponse['status'],
            joinDate: joinDate || '',
            salary: 0,
          });
          created++;
        });
        if (newEmps.length > 0) setEmployees(prev => [...prev, ...newEmps]);
        alert(`Import done: ${created} created, ${skipped} skipped`);
      } catch {
        alert('Import failed – invalid CSV format');
      } finally {
        setImporting(false);
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setEmployees(prev => prev.filter((e: EmployeeApiResponse) => e.id !== deleteId));
    setDeleteId(null);
  };

  const openAdd = () => {
    setForm({ name: '', email: '', phone: '', department: 'Engineering', designation: '', status: 'Active', joinDate: '', salary: 0 });
    setSelected(null);
    setModalMode('add');
  };

  const openEdit = (emp: EmployeeApiResponse) => { setForm({ ...emp }); setSelected(emp); setModalMode('edit'); };
  const openView = (emp: EmployeeApiResponse) => { setSelected(emp); setModalMode('view'); };
  const closeModal = () => { setModalMode(null); setSelected(null); setForm({}); };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (modalMode === 'add') {
      setEmployees(prev => [{
        id: form.id?.trim() || `E${String(prev.length + 1).padStart(3, '0')}`,
        name: form.name!, email: form.email!, phone: form.phone ?? '',
        department: form.department ?? 'Engineering',
        designation: form.designation ?? '',
        status: (form.status as EmployeeApiResponse['status']) ?? 'Active',
        joinDate: form.joinDate ?? '',
        salary: Number(form.salary) || 0,
        technology: form.technology,
        laptop: form.laptop,
        desktop: form.desktop,
        id_card_issued: form.id_card_issued,
        o365_account_created: form.o365_account_created,
      }, ...prev]);
    } else if (modalMode === 'edit' && selected) {
      setEmployees(prev => prev.map((e: EmployeeApiResponse) => e.id === selected.id ? { ...e, ...form } as EmployeeApiResponse : e));
    }
    closeModal();
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[30px] leading-9 font-bold text-slate-50">Employees</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your workforce ({employees.length} total)</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm border border-[#1d283a] bg-transparent rounded-md text-slate-50 hover:bg-white/5 transition-colors"
          >
            <Download className="w-4 h-4" strokeWidth={1.5} /> Export CSV
          </button>
          {canEdit && (
            <>
              <label
                htmlFor="import-csv"
                className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm border border-[#1d283a] bg-transparent rounded-md text-slate-50 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" strokeWidth={1.5} />
                {importing ? 'Importing...' : 'Import CSV'}
              </label>
              <input id="import-csv" type="file" accept=".csv" className="hidden" onChange={handleImport} />
              <button
                onClick={openAdd}
                className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm rounded-md font-medium bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-[0_0_18px_rgba(59,130,246,0.35)]"
              >
                <UserPlus className="w-4 h-4" strokeWidth={1.5} /> Add Employee
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#111827]/95 border border-[#1d283a] rounded-xl p-3 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              placeholder="Search by name, ID, or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-10 pr-4 border border-[#1d283a] bg-transparent rounded-md text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={techFilter}
              onChange={e => setTechFilter(e.target.value)}
              className="h-9 px-4 border border-[#1d283a] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-transparent text-slate-50"
            >
              <option value="all">All Technologies</option>
              {technologies.map(tech => <option key={tech} value={tech}>{tech}</option>)}
            </select>
            <select
              value={laptopFilter}
              onChange={e => setLaptopFilter(e.target.value)}
              className="h-9 px-4 border border-[#1d283a] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-transparent text-slate-50"
            >
              <option value="all">All Laptops</option>
              <option value="yes">Issued</option>
              <option value="no">Not Issued</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="h-9 px-4 border border-[#1d283a] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-transparent text-slate-50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111827]/95 border border-[#1d283a] rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Users className="w-12 h-12 text-slate-600" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-slate-200 mt-4">No employees found</h3>
            <p className="text-sm text-slate-500 mt-1">
              {search || techFilter !== 'all' || laptopFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Add your first employee to get started'}
            </p>
            {canEdit && !search && techFilter === 'all' && laptopFilter === 'all' && (
              <button
                onClick={openAdd}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-xs rounded-md font-medium bg-[#3b82f6] text-white hover:bg-[#2563eb]"
              >
                <UserPlus className="w-4 h-4" /> Add Employee
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px]">
              <thead>
                <tr className="border-b border-[#1d283a] bg-[rgba(15,23,42,0.45)]">
                  <th className="text-left px-2 py-px text-sm font-medium text-slate-400">Employee</th>
                  <th className="text-left px-2 py-px text-sm font-medium text-slate-400">Technology</th>
                  <th className="text-left px-2 py-px text-sm font-medium text-slate-400">Joining Date</th>
                  <th className="text-center px-2 py-px text-sm font-medium text-slate-400">Status</th>
                  <th className="text-center px-2 py-px text-sm font-medium text-slate-400">Laptop</th>
                  <th className="text-center px-2 py-px text-sm font-medium text-slate-400">Desktop</th>
                  <th className="text-center px-2 py-px text-sm font-medium text-slate-400">ID Card</th>
                  <th className="text-center px-2 py-px text-sm font-medium text-slate-400">O365</th>
                  <th className="text-right px-2 py-px text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1d283a]">
                {filtered.map(emp => (
                  <tr key={emp.id} className="hover:bg-[#0f1b31]/70 transition-colors">
                    <td className="px-2 py-2 text-sm min-h-[57px]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0f2b57] flex items-center justify-center text-[#6aa3ff] text-sm font-semibold shrink-0">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-50 truncate">{emp.name}</p>
                          <p className="text-sm text-slate-500 truncate">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2 align-middle text-sm text-slate-50" style={{fontSize:'14px'}}>
                      <span className="inline-flex items-center text-xs px-3 py-1 rounded-xl bg-[#1d2740] text-slate-100 font-semibold leading-none">
                        {emp.technology || 'N/A'}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-sm text-slate-300" style={{fontSize:'14px'}}>{emp.joinDate || 'Not set'}</td>
                    <td className="px-2 py-2 text-center">
                      {emp.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-[#1d283a] font-medium leading-none min-h-7">
                          <Check className="w-2.5 h-2.5" /> Active
                        </span>
                      ) : emp.status === 'On Leave' ? (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-[#1d283a] font-medium leading-none min-h-7">
                          On Leave
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-[#1d283a] font-medium leading-none min-h-7">
                          <X className="w-2.5 h-2.5" /> Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-center"><StatusChip issued={emp.laptop?.issued} /></td>
                    <td className="px-2 py-2 text-center"><StatusChip issued={emp.desktop?.issued} /></td>
                    <td className="px-2 py-2 text-center"><StatusChip issued={emp.id_card_issued} /></td>
                    <td className="px-2 py-2 text-center"><StatusChip issued={emp.o365_account_created} /></td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openView(emp)}
                          className="p-1.5 text-slate-500 hover:text-blue-300 hover:bg-blue-500/10 rounded-md transition-colors"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {canEdit && (
                          <>
                            <button
                              onClick={() => openEdit(emp)}
                              className="p-1 text-slate-500 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-md transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(emp.id)}
                              className="p-1 text-slate-500 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f182b] border border-[#213354] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#213354]">
              <h2 className="text-lg font-semibold text-slate-100">
                {modalMode === 'add' ? 'Add New Employee' : 'Edit Employee'}
              </h2>
              <button onClick={closeModal}><X className="w-5 h-5 text-slate-500 hover:text-slate-300" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {([
                { label: 'Full Name *', field: 'name', type: 'text', placeholder: 'e.g. Arjun Mehta' },
                { label: 'Email *', field: 'email', type: 'email', placeholder: 'e.g. arjun@gmail.com' },
                { label: 'Phone', field: 'phone', type: 'text', placeholder: '+91 9876543210' },
                { label: 'Employee ID', field: 'id', type: 'text', placeholder: 'e.g. E013' },
                { label: 'Designation', field: 'designation', type: 'text', placeholder: 'e.g. Senior Developer' },
                { label: 'Technology', field: 'technology', type: 'text', placeholder: 'e.g. React, Node.js' },
                { label: 'Join Date', field: 'joinDate', type: 'date', placeholder: '' },
                { label: 'Salary (₹)', field: 'salary', type: 'number', placeholder: '60000' },
              ] as { label: string; field: keyof EmployeeApiResponse; type: string; placeholder: string }[]).map(({ label, field, type, placeholder }) => (
                <div key={String(field)}>
                  <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
                  <input
                    type={type}
                    value={String(form[field] ?? '')}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Department</label>
                <select
                  value={form.department ?? 'Engineering'}
                  onChange={e => setForm(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  {['Engineering', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations'].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                <select
                  value={form.status ?? 'Active'}
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value as EmployeeApiResponse['status'] }))}
                  className="w-full px-3 py-2 border border-[#253b5f] bg-[#0b1427] rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  {['Active', 'Inactive', 'On Leave'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300 mb-2">Asset & Account Status</p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { label: 'Laptop Issued', key: 'laptopIssued' },
                    { label: 'Desktop Issued', key: 'desktopIssued' },
                    { label: 'ID Card Issued', key: 'id_card_issued' },
                    { label: 'O365 Account', key: 'o365_account_created' },
                  ] as { label: string; key: string }[]).map(({ label, key }) => {
                    const checked =
                      key === 'laptopIssued' ? !!form.laptop?.issued :
                      key === 'desktopIssued' ? !!form.desktop?.issued :
                      !!(form[key as keyof EmployeeApiResponse]);
                    return (
                      <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-slate-400">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={e => {
                            if (key === 'laptopIssued') setForm(prev => ({ ...prev, laptop: { ...prev.laptop, issued: e.target.checked } }));
                            else if (key === 'desktopIssued') setForm(prev => ({ ...prev, desktop: { ...prev.desktop, issued: e.target.checked } }));
                            else setForm(prev => ({ ...prev, [key]: e.target.checked }));
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#213354] bg-[#0b1427] rounded-b-2xl">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 border border-[#2a3f62] bg-[#0f1a2f] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                {modalMode === 'add' ? 'Add Employee' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {modalMode === 'view' && selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f182b] border border-[#213354] rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1d283a]">
              <h2 className="text-lg font-semibold text-slate-50">Employee Details</h2>
              <button onClick={closeModal}><X className="w-5 h-5 text-slate-500 hover:text-slate-300" /></button>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold shrink-0 ring-2 ring-blue-500/20">
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-50">{selected.name}</p>
                  <p className="text-sm text-slate-500">{selected.id}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selected.status === 'Active' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/25' :
                    selected.status === 'On Leave' ? 'bg-amber-500/15 text-amber-300 border border-amber-400/25' :
                    'bg-rose-500/15 text-rose-300 border border-rose-400/25'
                  }`}>{selected.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {([
                  { icon: Mail, label: 'Email', value: selected.email },
                  { icon: Phone, label: 'Phone', value: selected.phone },
                  { icon: Building2, label: 'Department', value: selected.department },
                  { icon: Briefcase, label: 'Designation', value: selected.designation },
                  { icon: Calendar, label: 'Join Date', value: selected.joinDate || 'Not set' },
                  { icon: Filter, label: 'Technology', value: selected.technology || 'N/A' },
                ] as { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[]).map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-[#172440] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="text-slate-200 font-medium truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#1d283a] pt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Asset & Account Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Laptop', value: selected.laptop?.issued },
                    { label: 'Desktop', value: selected.desktop?.issued },
                    { label: 'ID Card', value: selected.id_card_issued },
                    { label: 'O365 Account', value: selected.o365_account_created },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{label}</span>
                      <StatusChip issued={value} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#213354] bg-[#0b1427] rounded-b-2xl">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-300 border border-[#2a3f62] bg-[#0f1a2f] rounded-lg"
              >
                Close
              </button>
              {canEdit && (
                <button
                  onClick={() => openEdit(selected)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f182b] border border-[#213354] rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-rose-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-rose-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Are you sure?</h3>
            <p className="text-sm text-slate-400 mb-6">
              This action cannot be undone. This will permanently delete the employee record.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm border border-[#2a3f62] rounded-lg text-slate-300 hover:bg-[#12213a]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
