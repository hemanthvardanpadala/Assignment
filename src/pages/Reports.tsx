import { BarChart3, Users, TrendingUp, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Employee { id: string; name: string; department: string; status: string; salary: number; }
interface Department { id: string; name: string; employeeCount: number; }
interface AttendanceRecord { id: string; status: string; }
interface LeaveRequest { id: string; status: string; leaveType: string; }
interface PayrollRecord { id: string; netSalary: number; basicSalary: number; status: string; }

export default function Reports() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const [employeesRes, departmentsRes, attendanceRes, leavesRes, payrollRes] = await Promise.all([
          fetch('http://localhost:8080/api/employees'),
          fetch('http://localhost:8080/api/departments'),
          fetch('http://localhost:8080/api/attendance'),
          fetch('http://localhost:8080/api/leaves'),
          fetch('http://localhost:8080/api/payroll'),
        ]);

        const employeesData = await employeesRes.json();
        const departmentsData = await departmentsRes.json();
        const attendanceData = await attendanceRes.json();
        const leaveData = await leavesRes.json();
        const payrollData = await payrollRes.json();

        setEmployees(employeesData.items ?? []);
        setDepartments(departmentsData.items ?? []);
        setAttendanceRecords(attendanceData.items ?? []);
        setLeaveRequests(leaveData.items ?? []);
        setPayrollRecords(payrollData.items ?? []);
      } catch (error) {
        console.error('Failed to load reports', error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) {
    return <div className="text-slate-300">Loading reports...</div>;
  }

  const deptEmployee = departments.map(d => ({
    name: d.name,
    count: employees.filter(e => e.department === d.name || e.department === d.name.split(' ')[0]).length || d.employeeCount,
  }));

  const totalPayroll = payrollRecords.reduce((s, r) => s + r.netSalary, 0);
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / (employees.length || 1));
  const leaveApprovalRate = Math.round((leaveRequests.filter(l => l.status === 'Approved').length / (leaveRequests.length || 1)) * 100);
  const attendanceRate = Math.round((attendanceRecords.filter(a => a.status === 'Present').length / (attendanceRecords.length || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: employees.length, sub: 'Across all departments', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Salary', value: `₹${avgSalary.toLocaleString('en-IN')}`, sub: 'Per month', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Attendance Rate', value: `${attendanceRate}%`, sub: 'Today', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Leave Approval', value: `${leaveApprovalRate}%`, sub: 'Approval rate', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`p-2 w-fit rounded-lg ${k.bg} mb-3`}><Icon className={`w-4 h-4 ${k.color}`} /></div>
              <div className="text-2xl font-bold text-gray-900">{k.value}</div>
              <div className="text-sm font-medium text-gray-600">{k.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Department Headcount Chart (bar using CSS) */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-5">Employees by Department</h3>
        <div className="space-y-3">
          {deptEmployee.sort((a, b) => b.count - a.count).map((d, i) => {
            const pct = Math.round((d.count / Math.max(...deptEmployee.map(x => x.count))) * 100);
            const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-pink-500', 'bg-indigo-500'];
            return (
              <div key={d.name} className="flex items-center gap-4">
                <div className="w-28 text-sm text-gray-600 text-right shrink-0 truncate">{d.name}</div>
                <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
                  <div className={`h-full ${colors[i % colors.length]} rounded-lg flex items-center justify-end pr-2 transition-all`} style={{ width: `${pct}%` }}>
                    <span className="text-xs text-white font-semibold">{d.count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-column reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Employee Status Breakdown</h3>
          <div className="space-y-3">
            {['Active', 'Inactive', 'On Leave'].map(status => {
              const count = employees.filter(e => e.status === status).length;
              const pct = Math.round((count / employees.length) * 100);
              const cfg: Record<string, string> = {
                Active: 'bg-green-500',
                Inactive: 'bg-red-400',
                'On Leave': 'bg-amber-400',
              };
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{status}</span>
                    <span className="font-medium">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${cfg[status]} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leave type distribution */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Leave Type Distribution</h3>
          <div className="space-y-3">
            {(['Annual', 'Sick', 'Casual', 'Maternity', 'Paternity'] as const).map(type => {
              const count = leaveRequests.filter(l => l.leaveType === type).length;
              const pct = leaveRequests.length ? Math.round((count / leaveRequests.length) * 100) : 0;
              const colors: Record<string, string> = {
                Annual: 'bg-blue-500', Sick: 'bg-red-400', Casual: 'bg-green-500',
                Maternity: 'bg-pink-500', Paternity: 'bg-indigo-500'
              };
              return (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{type}</span>
                    <span className="font-medium">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[type]} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly payroll summary */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">March 2026 Payroll Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 font-medium mb-1">Total Basic</div>
            <div className="text-xl font-bold text-gray-900">₹{payrollRecords.reduce((s, r) => s + r.basicSalary, 0).toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-600 font-medium mb-1">Total Net Payout</div>
            <div className="text-xl font-bold text-gray-900">₹{totalPayroll.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-600 font-medium mb-1">Records Processed</div>
            <div className="text-xl font-bold text-gray-900">{payrollRecords.filter(r => r.status === 'Processed').length}/{payrollRecords.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
