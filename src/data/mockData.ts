export interface Employee {
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

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  description: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  hoursWorked: string;
}

export interface LeaveRequest {
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

export interface PayrollRecord {
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

export const departments: Department[] = [
  { id: 'D001', name: 'Engineering', head: 'Rajesh Kumar', employeeCount: 24, description: 'Software development and technical operations' },
  { id: 'D002', name: 'Human Resources', head: 'Priya Sharma', employeeCount: 8, description: 'HR operations, recruitment, and employee welfare' },
  { id: 'D003', name: 'Finance', head: 'Anil Gupta', employeeCount: 10, description: 'Financial planning, accounting, and reporting' },
  { id: 'D004', name: 'Sales', head: 'Meena Nair', employeeCount: 18, description: 'Sales operations, client management, and revenue generation' },
  { id: 'D005', name: 'Marketing', head: 'Vijay Patel', employeeCount: 12, description: 'Marketing campaigns, branding, and market research' },
  { id: 'D006', name: 'Operations', head: 'Sunita Rao', employeeCount: 15, description: 'Day-to-day operations and process management' },
];

export const employees: Employee[] = [
  { id: 'E001', name: 'Arjun Mehta', email: 'arjun.mehta@gmail.com', phone: '+91 9876543210', department: 'Engineering', designation: 'Senior Developer', status: 'Active', joinDate: '2021-03-15', salary: 95000, technology: 'React', laptop: { issued: true, model: 'Dell XPS 15' }, desktop: { issued: false }, id_card_issued: true, o365_account_created: true },
  { id: 'E002', name: 'Pooja Iyer', email: 'pooja.iyer@gmail.com', phone: '+91 9876543211', department: 'Engineering', designation: 'Frontend Developer', status: 'Active', joinDate: '2022-06-01', salary: 72000, technology: 'Vue.js', laptop: { issued: true, model: 'MacBook Pro' }, desktop: { issued: false }, id_card_issued: true, o365_account_created: true },
  { id: 'E003', name: 'Ravi Shankar', email: 'ravi.shankar@gmail.com', phone: '+91 9876543212', department: 'HR', designation: 'HR Manager', status: 'Active', joinDate: '2020-01-10', salary: 68000, technology: 'Excel', laptop: { issued: false }, desktop: { issued: true, model: 'HP EliteDesk' }, id_card_issued: true, o365_account_created: true },
  { id: 'E004', name: 'Deepika Singh', email: 'deepika.singh@gmail.com', phone: '+91 9876543213', department: 'Finance', designation: 'Accountant', status: 'Active', joinDate: '2021-08-20', salary: 58000, technology: 'Excel', laptop: { issued: false }, desktop: { issued: true, model: 'Lenovo ThinkCentre' }, id_card_issued: true, o365_account_created: true },
  { id: 'E005', name: 'Karan Verma', email: 'karan.verma@gmail.com', phone: '+91 9876543214', department: 'Sales', designation: 'Sales Executive', status: 'Inactive', joinDate: '2019-05-12', salary: 55000, technology: 'Salesforce', laptop: { issued: true, model: 'Lenovo IdeaPad' }, desktop: { issued: false }, id_card_issued: false, o365_account_created: false },
  { id: 'E006', name: 'Nisha Reddy', email: 'nisha.reddy@gmail.com', phone: '+91 9876543215', department: 'Marketing', designation: 'Marketing Manager', status: 'Active', joinDate: '2020-11-03', salary: 75000, technology: 'HubSpot', laptop: { issued: true, model: 'MacBook Air' }, desktop: { issued: false }, id_card_issued: true, o365_account_created: true },
  { id: 'E007', name: 'Suresh Babu', email: 'suresh.babu@gmail.com', phone: '+91 9876543216', department: 'Engineering', designation: 'Backend Developer', status: 'On Leave', joinDate: '2021-07-14', salary: 88000, technology: 'Node.js', laptop: { issued: true, model: 'Dell Inspiron' }, desktop: { issued: false }, id_card_issued: true, o365_account_created: true },
  { id: 'E008', name: 'Ananya Krishnan', email: 'ananya.krishnan@gmail.com', phone: '+91 9876543217', department: 'Operations', designation: 'Operations Lead', status: 'Active', joinDate: '2022-02-28', salary: 65000, technology: 'SAP', laptop: { issued: false }, desktop: { issued: true, model: 'HP ProDesk' }, id_card_issued: true, o365_account_created: true },
  { id: 'E009', name: 'Prakash Nair', email: 'prakash.nair@gmail.com', phone: '+91 9876543218', department: 'Finance', designation: 'Financial Analyst', status: 'Active', joinDate: '2021-09-15', salary: 70000, technology: 'Python', laptop: { issued: true, model: 'Dell Latitude' }, desktop: { issued: false }, id_card_issued: true, o365_account_created: true },
  { id: 'E010', name: 'Shalini Dubey', email: 'shalini.dubey@gmail.com', phone: '+91 9876543219', department: 'Sales', designation: 'Sales Manager', status: 'Active', joinDate: '2019-12-01', salary: 82000, technology: 'Salesforce', laptop: { issued: true, model: 'Asus ZenBook' }, desktop: { issued: false }, id_card_issued: true, o365_account_created: true },
  { id: 'E011', name: 'Vikram Joshi', email: 'vikram.joshi@gmail.com', phone: '+91 9876543220', department: 'Engineering', designation: 'DevOps Engineer', status: 'Active', joinDate: '2022-04-05', salary: 90000, technology: 'Docker', laptop: { issued: true, model: 'MacBook Pro' }, desktop: { issued: true, model: 'Mac Mini' }, id_card_issued: true, o365_account_created: true },
  { id: 'E012', name: 'Kavya Menon', email: 'kavya.menon@gmail.com', phone: '+91 9876543221', department: 'HR', designation: 'HR Executive', status: 'Active', joinDate: '2023-01-20', salary: 45000, technology: 'Excel', laptop: { issued: false }, desktop: { issued: true, model: 'HP EliteDesk' }, id_card_issued: false, o365_account_created: true },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'A001', employeeId: 'E001', employeeName: 'Arjun Mehta', date: '2026-03-25', checkIn: '09:05', checkOut: '18:10', status: 'Present', hoursWorked: '9h 5m' },
  { id: 'A002', employeeId: 'E002', employeeName: 'Pooja Iyer', date: '2026-03-25', checkIn: '09:30', checkOut: '18:00', status: 'Late', hoursWorked: '8h 30m' },
  { id: 'A003', employeeId: 'E003', employeeName: 'Ravi Shankar', date: '2026-03-25', checkIn: '08:55', checkOut: '18:00', status: 'Present', hoursWorked: '9h 5m' },
  { id: 'A004', employeeId: 'E004', employeeName: 'Deepika Singh', date: '2026-03-25', checkIn: '', checkOut: '', status: 'Absent', hoursWorked: '0h' },
  { id: 'A005', employeeId: 'E005', employeeName: 'Karan Verma', date: '2026-03-25', checkIn: '09:00', checkOut: '13:00', status: 'Half Day', hoursWorked: '4h' },
  { id: 'A006', employeeId: 'E006', employeeName: 'Nisha Reddy', date: '2026-03-25', checkIn: '09:02', checkOut: '18:05', status: 'Present', hoursWorked: '9h 3m' },
  { id: 'A007', employeeId: 'E007', employeeName: 'Suresh Babu', date: '2026-03-25', checkIn: '', checkOut: '', status: 'Absent', hoursWorked: '0h' },
  { id: 'A008', employeeId: 'E008', employeeName: 'Ananya Krishnan', date: '2026-03-25', checkIn: '08:50', checkOut: '18:00', status: 'Present', hoursWorked: '9h 10m' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'L001', employeeId: 'E001', employeeName: 'Arjun Mehta', department: 'Engineering', leaveType: 'Annual', startDate: '2026-04-01', endDate: '2026-04-05', days: 5, reason: 'Family vacation', status: 'Pending', appliedOn: '2026-03-20' },
  { id: 'L002', employeeId: 'E002', employeeName: 'Pooja Iyer', department: 'Engineering', leaveType: 'Sick', startDate: '2026-03-22', endDate: '2026-03-24', days: 3, reason: 'Medical treatment', status: 'Approved', appliedOn: '2026-03-21' },
  { id: 'L003', employeeId: 'E007', employeeName: 'Suresh Babu', department: 'Engineering', leaveType: 'Casual', startDate: '2026-03-23', endDate: '2026-03-28', days: 6, reason: 'Personal work', status: 'Approved', appliedOn: '2026-03-19' },
  { id: 'L004', employeeId: 'E004', employeeName: 'Deepika Singh', department: 'Finance', leaveType: 'Annual', startDate: '2026-03-25', endDate: '2026-03-26', days: 2, reason: 'Personal reasons', status: 'Rejected', appliedOn: '2026-03-22' },
  { id: 'L005', employeeId: 'E010', employeeName: 'Shalini Dubey', department: 'Sales', leaveType: 'Maternity', startDate: '2026-04-10', endDate: '2026-07-10', days: 90, reason: 'Maternity leave', status: 'Pending', appliedOn: '2026-03-15' },
  { id: 'L006', employeeId: 'E006', employeeName: 'Nisha Reddy', department: 'Marketing', leaveType: 'Casual', startDate: '2026-03-28', endDate: '2026-03-28', days: 1, reason: 'Personal errand', status: 'Pending', appliedOn: '2026-03-24' },
];

export const payrollRecords: PayrollRecord[] = [
  { id: 'P001', employeeId: 'E001', employeeName: 'Arjun Mehta', department: 'Engineering', month: 'March 2026', basicSalary: 95000, allowances: 15000, deductions: 12000, netSalary: 98000, status: 'Pending' },
  { id: 'P002', employeeId: 'E002', employeeName: 'Pooja Iyer', department: 'Engineering', month: 'March 2026', basicSalary: 72000, allowances: 10000, deductions: 9000, netSalary: 73000, status: 'Pending' },
  { id: 'P003', employeeId: 'E003', employeeName: 'Ravi Shankar', department: 'HR', month: 'March 2026', basicSalary: 68000, allowances: 8000, deductions: 8500, netSalary: 67500, status: 'Processed' },
  { id: 'P004', employeeId: 'E004', employeeName: 'Deepika Singh', department: 'Finance', month: 'March 2026', basicSalary: 58000, allowances: 7000, deductions: 7500, netSalary: 57500, status: 'Processed' },
  { id: 'P005', employeeId: 'E006', employeeName: 'Nisha Reddy', department: 'Marketing', month: 'March 2026', basicSalary: 75000, allowances: 12000, deductions: 9500, netSalary: 77500, status: 'Processed' },
  { id: 'P006', employeeId: 'E007', employeeName: 'Suresh Babu', department: 'Engineering', month: 'March 2026', basicSalary: 88000, allowances: 14000, deductions: 11000, netSalary: 91000, status: 'On Hold' },
  { id: 'P007', employeeId: 'E009', employeeName: 'Prakash Nair', department: 'Finance', month: 'March 2026', basicSalary: 70000, allowances: 9000, deductions: 9000, netSalary: 70000, status: 'Pending' },
  { id: 'P008', employeeId: 'E011', employeeName: 'Vikram Joshi', department: 'Engineering', month: 'March 2026', basicSalary: 90000, allowances: 13000, deductions: 11500, netSalary: 91500, status: 'Processed' },
];
