import { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CreditCard,
  GraduationCap,
  IdCard,
  Laptop,
  Mail,
  Monitor,
  Settings2,
  ShieldCheck,
  User,
  UserPlus,
  Wallet,
} from 'lucide-react';

type AddEmployeeForm = {
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  dob: string;
  technology: string;
  aadhaar: string;
  pan: string;
  uan: string;
  idCardIssued: boolean;
  o365Created: boolean;
  department: string;
  designation: string;
  joiningDate: string;
  onboardingDate: string;
  trainingStart: string;
  trainingEnd: string;
  laptopIssued: boolean;
  desktopIssued: boolean;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  salaryYear: string;
  salaryMonth: string;
  salaryDay: string;
  stipendAmount: string;
  stipendYear: string;
  stipendMonth: string;
  stipendDay: string;
  status: boolean;
};

const initialForm: AddEmployeeForm = {
  name: '',
  employeeId: '',
  email: '',
  phone: '',
  dob: '',
  technology: '',
  aadhaar: '',
  pan: '',
  uan: '',
  idCardIssued: false,
  o365Created: false,
  department: '',
  designation: '',
  joiningDate: '',
  onboardingDate: '',
  trainingStart: '',
  trainingEnd: '',
  laptopIssued: false,
  desktopIssued: false,
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  branch: '',
  salaryYear: '',
  salaryMonth: '',
  salaryDay: '',
  stipendAmount: '',
  stipendYear: '',
  stipendMonth: '',
  stipendDay: '',
  status: true,
};

const technologies = ['React', 'Vue.js', 'Node.js', 'Python', 'DevOps', 'Salesforce', 'Excel'];
const years = ['2024', '2025', '2026'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

const labelClass = 'mb-1 block text-sm font-semibold text-slate-200';
const inputClass =
  'h-10 w-full rounded-lg border border-[#1d283a] bg-[#0f172a]/70 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30';

function ToggleSwitch({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#1d283a] bg-[#0f172a]/40 p-4">
      <div>
        <p className="text-sm font-medium text-slate-200">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${checked ? 'bg-blue-600' : 'bg-[#1d283a]'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

export default function Attendance() {
  const [form, setForm] = useState<AddEmployeeForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof AddEmployeeForm>(key: K, value: AddEmployeeForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setForm(initialForm);
    }, 350);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn text-slate-200">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          type="button"
          className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#1d283a] bg-[#111827]/95 text-slate-300 hover:text-slate-100"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-[30px] leading-9 font-bold tracking-tight text-slate-50">Add New Employee</h1>
          <p className="mt-1 text-sm text-slate-400">Fill in the employee details</p>
        </div>
      </div>

      {/* Basic Information */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <User className="h-5 w-5 text-blue-400" />
          Basic Information
        </h2>
        <p className="mt-1 text-sm text-slate-400">Employee&apos;s personal details</p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
          <div>
            <label className={labelClass}>Employee Name *</label>
            <input value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="John Doe" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Employee ID *</label>
            <div className="relative">
              <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input value={form.employeeId} onChange={e => updateField('employeeId', e.target.value)} placeholder="EMP001" className={`${inputClass} pl-10`} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} placeholder="john@company.com" className={`${inputClass} pl-10`} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>Technology</label>
            <select value={form.technology} onChange={e => updateField('technology', e.target.value)} className={inputClass}>
              <option value="">Select technology</option>
              {technologies.map(tech => <option key={tech} value={tech}>{tech}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Identity & Compliance */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <ShieldCheck className="h-5 w-5 text-blue-400" />
          Identity &amp; Compliance
        </h2>
        <p className="mt-1 text-sm text-slate-400">Government-issued identity and compliance numbers</p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
          <div>
            <label className={labelClass}>Date of Birth</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="date" value={form.dob} onChange={e => updateField('dob', e.target.value)} className={`${inputClass} pl-10`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Aadhaar Number</label>
            <input value={form.aadhaar} onChange={e => updateField('aadhaar', e.target.value)} placeholder="XXXX XXXX XXXX" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>PAN Number</label>
            <input value={form.pan} onChange={e => updateField('pan', e.target.value)} placeholder="ABCDE1234F" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>UAN Number</label>
            <input value={form.uan} onChange={e => updateField('uan', e.target.value)} placeholder="100XXXXXXXXX" className={inputClass} />
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Calendar className="h-5 w-5 text-blue-400" />
          Important Dates
        </h2>
        <p className="mt-1 text-sm text-slate-400">Track employee milestones</p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
          <div>
            <label className={labelClass}>Joining Date</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="date" value={form.joiningDate} onChange={e => updateField('joiningDate', e.target.value)} className={`${inputClass} pl-10`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Onboarding Date</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="date" value={form.onboardingDate} onChange={e => updateField('onboardingDate', e.target.value)} className={`${inputClass} pl-10`} />
            </div>
          </div>
        </div>
      </section>

      {/* Training Details */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <GraduationCap className="h-5 w-5 text-blue-400" />
          Training Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">Training period information</p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
          <div>
            <label className={labelClass}>Training Start Date</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="date" value={form.trainingStart} onChange={e => updateField('trainingStart', e.target.value)} className={`${inputClass} pl-10`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Training End Date</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input type="date" value={form.trainingEnd} onChange={e => updateField('trainingEnd', e.target.value)} className={`${inputClass} pl-10`} />
            </div>
          </div>
        </div>
      </section>

      {/* Laptop Details */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Laptop className="h-5 w-5 text-blue-400" />
          Laptop Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">Company asset assignment</p>
        <div className="mt-6">
          <ToggleSwitch checked={form.laptopIssued} onChange={v => updateField('laptopIssued', v)} label="Laptop Issued" description="Has the employee been issued a laptop?" />
        </div>
      </section>

      {/* Desktop Details */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Monitor className="h-5 w-5 text-blue-400" />
          Desktop Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">Company asset assignment</p>
        <div className="mt-6">
          <ToggleSwitch checked={form.desktopIssued} onChange={v => updateField('desktopIssued', v)} label="Desktop Issued" description="Has the employee been issued a desktop?" />
        </div>
      </section>

      {/* Bank Details */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <CreditCard className="h-5 w-5 text-blue-400" />
          Bank Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">Salary payment information</p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
          <div>
            <label className={labelClass}>Bank Name</label>
            <input value={form.bankName} onChange={e => updateField('bankName', e.target.value)} placeholder="State Bank of India" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Account Number</label>
            <input value={form.accountNumber} onChange={e => updateField('accountNumber', e.target.value)} placeholder="1234567890" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>IFSC Code</label>
            <input value={form.ifscCode} onChange={e => updateField('ifscCode', e.target.value)} placeholder="SBIN0001234" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Branch</label>
            <input value={form.branch} onChange={e => updateField('branch', e.target.value)} placeholder="Main Branch" className={inputClass} />
          </div>
        </div>
      </section>

      {/* Salary Details */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Wallet className="h-5 w-5 text-blue-400" />
          Salary Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">Last salary credit date</p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-3">
          <div>
            <label className={labelClass}>Year</label>
            <select value={form.salaryYear} onChange={e => updateField('salaryYear', e.target.value)} className={inputClass}>
              <option value="">Select year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Month</label>
            <select value={form.salaryMonth} onChange={e => updateField('salaryMonth', e.target.value)} className={inputClass}>
              <option value="">Select month</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Day</label>
            <select value={form.salaryDay} onChange={e => updateField('salaryDay', e.target.value)} className={inputClass}>
              <option value="">Select day</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Stipend Details */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Briefcase className="h-5 w-5 text-blue-400" />
          Stipend Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">Last stipend credit date and amount</p>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className={labelClass}>Stipend Amount (₹)</label>
            <input type="number" value={form.stipendAmount} onChange={e => updateField('stipendAmount', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Year</label>
            <select value={form.stipendYear} onChange={e => updateField('stipendYear', e.target.value)} className={inputClass}>
              <option value="">Select year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Month</label>
            <select value={form.stipendMonth} onChange={e => updateField('stipendMonth', e.target.value)} className={inputClass}>
              <option value="">Select month</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Day</label>
            <select value={form.stipendDay} onChange={e => updateField('stipendDay', e.target.value)} className={inputClass}>
              <option value="">Select day</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Other Details */}
      <section className="rounded-xl border border-[#1d283a] bg-[#111827]/95 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Settings2 className="h-5 w-5 text-blue-400" />
          Other Details
        </h2>
        <p className="mt-1 text-sm text-slate-400">Additional employee settings</p>
        <div className="mt-6 space-y-3">
          <ToggleSwitch checked={form.idCardIssued} onChange={v => updateField('idCardIssued', v)} label="ID Card Issued" description="Has the employee been issued an ID card?" />
          <ToggleSwitch checked={form.o365Created} onChange={v => updateField('o365Created', v)} label="O365 Account Created" description="Has the employee's Microsoft 365 account been created?" />
          <ToggleSwitch checked={form.status} onChange={v => updateField('status', v)} label="Employee Status" description="Active employees are shown by default. Disable to mark as inactive." />
        </div>
      </section>

      {/* Footer Buttons */}
      <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#1d283a] pt-6 sm:flex-row">
        <button
          type="button"
          onClick={() => setForm(initialForm)}
          className="h-9 rounded-lg border border-[#1d283a] px-4 text-sm font-medium text-slate-300 hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#3b82f6] px-4 text-sm font-medium text-white shadow-[0_0_18px_rgba(59,130,246,0.35)] hover:bg-[#2563eb]"
          disabled={submitting}
        >
          <UserPlus className="h-4 w-4" />
          {submitting ? 'Saving...' : 'Create Employee'}
        </button>
      </div>
    </form>
  );
}