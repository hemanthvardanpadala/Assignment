import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  GraduationCap,
  Laptop,
  CreditCard,
  Cloud,
  ArrowRight,
  TrendingUp,
  Search,
  X,
  Mail,
  Hash,
  Building,
  Check,
  ShieldCheck,
  Calendar as CalendarIcon,
  Loader2,
  DollarSign,
  CheckCircle2,
  XCircle,
  UserSearch,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Employee { 
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

interface Department { id: string; name: string; head: string; employeeCount: number; description: string; }
interface AttendanceRecord { id: string; employeeId: string; employeeName: string; date: string; checkIn: string; checkOut: string; status: string; hoursWorked: string; }
interface LeaveRequest { id: string; employeeId: string; employeeName: string; department: string; leaveType: string; startDate: string; endDate: string; days: number; reason: string; status: string; appliedOn: string; }
interface PayrollRecord { id: string; employeeId: string; employeeName: string; department: string; month: string; basicSalary: number; allowances: number; deductions: number; netSalary: number; status: string; }

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  color: string;
  delay: number;
};

function StatCard({ title, value, subtitle, icon: Icon, color, delay }: StatCardProps) {
  return (
    <div className={`stat-card card-hover animate-fadeIn stagger-${delay} rounded-xl border border-[#1d283a] bg-[#111827]/95`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-50">{value}</h3>
            {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
          </div>
          <div className={`rounded-xl p-3 ${color}`}>
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

type DetailRowProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  label: string;
  value?: string | number | boolean | null;
  isStatus?: boolean;
};

function DetailRow({ icon: Icon, label, value, isStatus }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={1.5} />
      <div className="min-w-0 flex-1">
        <span className="block text-xs text-slate-500">{label}</span>
        {isStatus ? (
          value ? (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <Check className="h-3 w-3" /> Yes
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-medium text-rose-400">
              <X className="h-3 w-3" /> No
            </span>
          )
        ) : (
          <span className="break-words text-sm font-medium text-slate-200">
            {value || <span className="italic text-slate-500">Not set</span>}
          </span>
        )}
      </div>
    </div>
  );
}

type EmployeeDetailDialogProps = {
  employee: Employee | null;
  open: boolean;
  onClose: () => void;
};

function EmployeeDetailDialog({ employee, open, onClose }: EmployeeDetailDialogProps) {
  if (!open || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-[#0f182b] border border-[#1d283a] p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f2b57]">
              <span className="text-lg font-bold text-[#6aa3ff]">{employee.name?.charAt(0)?.toUpperCase()}</span>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-50">{employee.name}</p>
              <p className="text-sm text-slate-400">{employee.id}</p>
            </div>
          </div>
          <button className="rounded-md p-2 text-slate-500 hover:bg-[#182233]" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Basic Information</p>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              <DetailRow icon={Mail} label="Email" value={employee.email} />
              <DetailRow icon={Hash} label="Employee ID" value={employee.id} />
              <DetailRow icon={Building} label="Department" value={employee.department} />
              <DetailRow icon={TrendingUp} label="Designation" value={employee.designation} />
              <DetailRow icon={CalendarIcon} label="Joining Date" value={employee.joinDate} />
            </div>
          </div>

          <hr className="border-[#1d283a]" />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Identity & Compliance</p>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              <DetailRow icon={ShieldCheck} label="Aadhaar Number" value="Not available in mock data" />
              <DetailRow icon={Hash} label="PAN Number" value="Not available in mock data" />
              <DetailRow icon={Hash} label="UAN Number" value="Not available in mock data" />
            </div>
          </div>

          <hr className="border-[#1d283a]" />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Assets & Status</p>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              <DetailRow icon={Laptop} label="Laptop Issued" value={employee.status === 'Active'} isStatus />
              <DetailRow icon={CreditCard} label="ID Card Issued" value={employee.status !== 'Inactive'} isStatus />
              <DetailRow icon={Cloud} label="O365 Account" value={employee.status === 'Active'} isStatus />
              <DetailRow
                icon={DollarSign}
                label="Monthly Salary"
                value={`INR ${employee.salary.toLocaleString('en-IN')}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button className="rounded-md border border-[#1d283a] px-4 py-2 text-sm text-slate-300 hover:bg-[#182233]" onClick={onClose}>
            Close
          </button>
          <Link to="/employees">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700" onClick={onClose}>
              View Employees
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function UniversalSearch({ employees }: { employees: Employee[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Employee[]>([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      setSearching(true);
      const filtered = employees.filter(emp => {
        return (
          emp.name.toLowerCase().includes(q) ||
          emp.id.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.department.toLowerCase().includes(q)
        );
      });
      setResults(filtered);
      setShowDropdown(true);
      setSearching(false);
    }, 300);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          placeholder="Search employees by name, ID, email, department..."
          className="w-full rounded-lg border border-[#1d283a] bg-[#0b1427] py-2.5 pl-10 pr-10 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        />
        {searching ? (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
        ) : query ? (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {showDropdown ? (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-[#1d283a] bg-[#111827] shadow-xl">
          {results.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">No employees found</div>
          ) : (
            <div className="max-h-72 overflow-y-auto divide-y divide-[#1d283a]">
              {results.map(emp => (
                <button
                  key={emp.id}
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setDialogOpen(true);
                    setShowDropdown(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#182233]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f2b57]">
                    <span className="text-sm font-bold text-[#6aa3ff]">{emp.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-50">{emp.name}</p>
                    <p className="truncate text-xs text-slate-500">{emp.email} · {emp.id}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#1d283a] px-2 py-1 text-xs text-slate-300">{emp.department}</span>
                </button>
              ))}
            </div>
          )}
          {results.length > 0 ? (
            <div className="border-t border-[#1d283a] bg-[#0b1427] px-4 py-2 text-xs text-slate-500">
              {results.length} result{results.length !== 1 ? 's' : ''} found · Click to view details
            </div>
          ) : null}
        </div>
      ) : null}

      <EmployeeDetailDialog employee={selectedEmployee} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}

const SALARY_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function SalaryStatusPanel({ employees, payrollRecords }: { employees: Employee[]; payrollRecords: PayrollRecord[] }) {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const years = Array.from({ length: 4 }, (_, i) => now.getFullYear() - i);

  const paidRecords = useMemo(() => {
    const m = SALARY_MONTHS[selectedMonth - 1];
    const key = `${m} ${selectedYear}`;
    return payrollRecords.filter(p => p.month === key && p.status === 'Processed');
  }, [selectedMonth, selectedYear, payrollRecords]);

  const paidIds = useMemo(() => new Set(paidRecords.map(r => r.employeeId)), [paidRecords]);

  const paid = useMemo(() => employees.filter(e => paidIds.has(e.id)), [employees, paidIds]);
  const unpaid = useMemo(() => employees.filter(e => !paidIds.has(e.id)), [employees, paidIds]);

  return (
    <div className="card-hover rounded-xl border border-[#1d283a] bg-[#111827]/95">
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
              <DollarSign className="h-5 w-5 text-blue-400" strokeWidth={1.5} />
              Salary Status
            </h3>
            <p className="text-sm text-slate-400">
              {SALARY_MONTHS[selectedMonth - 1]} {selectedYear} - {paid.length} paid, {unpaid.length} pending
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(Number(e.target.value))}
              className="w-[130px] rounded-md border border-[#1d283a] bg-[#0b1427] px-3 py-2 text-sm text-slate-200"
            >
              {SALARY_MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="w-[90px] rounded-md border border-[#1d283a] bg-[#0b1427] px-3 py-2 text-sm text-slate-200"
            >
              {years.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-500">Salary Paid ({paid.length})</span>
            </div>
            {paid.length === 0 ? (
              <p className="px-2 text-sm italic text-slate-500">No payments recorded yet.</p>
            ) : (
              <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
                {paid.map(emp => (
                  <Link
                    key={emp.id}
                    to="/employees"
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#182233]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                      <span className="text-xs font-bold text-emerald-400">{emp.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-50">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.id}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">Salary Pending ({unpaid.length})</span>
            </div>
            {unpaid.length === 0 ? (
              <p className="px-2 text-sm italic text-slate-500">All employees paid!</p>
            ) : (
              <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
                {unpaid.map(emp => (
                  <Link
                    key={emp.id}
                    to="/employees"
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#182233]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/15">
                      <span className="text-xs font-bold text-rose-400">{emp.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-50">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.id}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [employeesRes, departmentsRes, leavesRes, payrollRes, attendanceRes] = await Promise.all([
          fetch('http://localhost:8080/api/employees'),
          fetch('http://localhost:8080/api/departments'),
          fetch('http://localhost:8080/api/leaves'),
          fetch('http://localhost:8080/api/payroll'),
          fetch('http://localhost:8080/api/attendance'),
        ]);

        const employeesData = await employeesRes.json();
        const departmentsData = await departmentsRes.json();
        const leavesData = await leavesRes.json();
        const payrollData = await payrollRes.json();
        const attendanceData = await attendanceRes.json();

        setEmployees(employeesData.items ?? []);
        setDepartments(departmentsData.items ?? []);
        setLeaveRequests(leavesData.items ?? []);
        setPayrollRecords(payrollData.items ?? []);
        setAttendanceRecords(attendanceData.items ?? []);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
        setEmployees([]);
        setDepartments([]);
        setLeaveRequests([]);
        setPayrollRecords([]);
        setAttendanceRecords([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const recentJoinings = employees.filter(e => {
    const join = new Date(e.joinDate).getTime();
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return join >= thirtyDaysAgo;
  }).length;

  const inTraining = employees.filter(e => e.joinDate >= '2022-01-01').length;
  const idCardsIssued = employees.filter(e => e.status !== 'Inactive').length;
  const idCardsPending = employees.length - idCardsIssued;

  const candidateTotal = Math.max(0, leaveRequests.length + 6);
  const joinedThisMonth = recentJoinings;

  const departmentBreakdown = departments
    .map(d => ({
      name: d.name,
      count: employees.filter(e => e.department === d.name || (d.name === 'Human Resources' && e.department === 'HR')).length,
    }))
    .filter(item => item.count > 0);

  const laptopIssued = employees.filter(e => e.status !== 'Inactive').length;
  const laptopData = [
    { name: 'Issued', value: laptopIssued },
    { name: 'Not Issued', value: employees.length - laptopIssued },
  ];

  const o365Created = employees.filter(e => e.status === 'Active').length;
  const o365Pending = employees.length - o365Created;

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
              <div className="mb-4 h-4 w-24 animate-pulse rounded bg-slate-700" />
              <div className="h-8 w-16 animate-pulse rounded bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-8" data-testid="dashboard">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">Dashboard</h1>
          <p className="mt-1 text-slate-400">Overview of your employee management system</p>
        </div>
        <Link to="/employees">
          <button className="glow-primary rounded-lg px-4 py-2 text-sm font-semibold text-white" data-testid="add-employee-btn">
            <UserPlus className="mr-2 inline h-4 w-4" strokeWidth={1.5} />
            Add Employee
          </button>
        </Link>
      </div>

      <UniversalSearch employees={employees} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Employees"
          value={employees.length}
          subtitle="Active workforce"
          icon={Users}
          color="bg-blue-500/15 text-blue-400"
          delay={1}
        />
        <StatCard
          title="Recent Joinings"
          value={recentJoinings}
          subtitle="Last 30 days"
          icon={UserPlus}
          color="bg-emerald-500/15 text-emerald-400"
          delay={2}
        />
        <StatCard
          title="In Training"
          value={inTraining}
          subtitle="Currently training"
          icon={GraduationCap}
          color="bg-amber-500/15 text-amber-400"
          delay={3}
        />
        <StatCard
          title="ID Cards Issued"
          value={idCardsIssued}
          subtitle={`${idCardsPending} pending`}
          icon={CreditCard}
          color="bg-violet-500/15 text-violet-400"
          delay={4}
        />
        <StatCard
          title="Candidates in Pipeline"
          value={candidateTotal}
          subtitle={`${joinedThisMonth} joined this month`}
          icon={UserSearch}
          color="bg-cyan-500/15 text-cyan-400"
          delay={5}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card-hover rounded-xl border border-[#1d283a] bg-[#111827]/95 lg:col-span-2">
          <div className="p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
              <TrendingUp className="h-5 w-5 text-blue-400" strokeWidth={1.5} />
              Technology Distribution
            </h3>
            <p className="text-sm text-slate-400">Employees by technology stack</p>
          </div>
          <div className="px-6 pb-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentBreakdown} layout="vertical">
                  <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={12} width={110} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #1E293B',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card-hover rounded-xl border border-[#1d283a] bg-[#111827]/95">
          <div className="p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
              <Laptop className="h-5 w-5 text-blue-400" strokeWidth={1.5} />
              Laptop Status
            </h3>
            <p className="text-sm text-slate-400">Issue status overview</p>
          </div>
          <div className="px-6 pb-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={laptopData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                    {laptopData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #1E293B',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-sm text-slate-400">Issued</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-400">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalaryStatusPanel employees={employees} payrollRecords={payrollRecords} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-hover rounded-xl border border-[#1d283a] bg-[#111827]/95">
          <div className="p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
              <Cloud className="h-5 w-5 text-blue-400" strokeWidth={1.5} />
              O365 Account Status
            </h3>
            <p className="text-sm text-slate-400">Microsoft 365 provisioning</p>
          </div>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-2xl font-bold text-emerald-400">{o365Created}</p>
                <p className="text-sm text-slate-400">Accounts Created</p>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-2xl font-bold text-amber-400">{o365Pending}</p>
                <p className="text-sm text-slate-400">Pending Creation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-hover rounded-xl border border-[#1d283a] bg-[#111827]/95">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-50">Recent Employees</h3>
              <p className="text-sm text-slate-400">Latest additions to the team</p>
            </div>
            <Link to="/employees">
              <button className="rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-[#182233] hover:text-slate-200" data-testid="view-all-employees-btn">
                View All
                <ArrowRight className="ml-2 inline h-4 w-4" strokeWidth={1.5} />
              </button>
            </Link>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {recentEmployees.length > 0 ? (
                recentEmployees.map((emp, idx) => (
                  <Link
                    key={emp.id}
                    to="/employees"
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#182233]"
                    data-testid={`recent-employee-${idx}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f2b57]">
                        <span className="text-sm font-medium text-[#6aa3ff]">{emp.name?.charAt(0)?.toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-50">{emp.name}</p>
                        <p className="text-sm text-slate-500">{emp.id}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#1d283a] px-2 py-1 text-xs text-slate-300">{emp.department}</span>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center text-slate-500">No employees yet. Add your first employee!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-5">
        <h3 className="mb-4 text-lg font-semibold text-slate-50">Today Attendance Snapshot</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: 'Present', value: attendanceRecords.filter(a => a.status === 'Present').length, cls: 'bg-green-500/10 text-green-400' },
            { label: 'Absent', value: attendanceRecords.filter(a => a.status === 'Absent').length, cls: 'bg-red-500/10 text-red-400' },
            { label: 'Late', value: attendanceRecords.filter(a => a.status === 'Late').length, cls: 'bg-amber-500/10 text-amber-400' },
            { label: 'Half Day', value: attendanceRecords.filter(a => a.status === 'Half Day').length, cls: 'bg-purple-500/10 text-purple-400' },
          ].map(item => (
            <div key={item.label} className={`rounded-lg p-4 ${item.cls}`}>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-xs font-medium text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
