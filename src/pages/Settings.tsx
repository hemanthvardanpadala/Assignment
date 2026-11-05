import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Bell, Shield, Globe, User } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'Assignment',
    systemEmail: 'admin@gmail.com',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    workHours: '9',
    leaveNotify: true,
    payrollNotify: true,
    attendanceNotify: false,
    emailNotify: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key: keyof typeof settings) =>
    setSettings(p => ({ ...p, [key]: !p[key as keyof typeof settings] }));

  return (
    <div className="max-w-2xl space-y-6">
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <Save className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      {/* Company */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Company Settings</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Company Name', field: 'companyName', type: 'text' },
            { label: 'System Email', field: 'systemEmail', type: 'email' },
            { label: 'Work Hours per Day', field: 'workHours', type: 'number' },
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type={type} value={String(settings[field as keyof typeof settings])}
                onChange={e => setSettings(p => ({ ...p, [field]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select value={settings.timezone} onChange={e => setSettings(p => ({ ...p, timezone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">EST</option>
                <option value="Europe/London">GMT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <select value={settings.dateFormat} onChange={e => setSettings(p => ({ ...p, dateFormat: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Leave Request Notifications', key: 'leaveNotify', desc: 'Get notified when leave requests are submitted' },
            { label: 'Payroll Processing Alerts', key: 'payrollNotify', desc: 'Get notified when payroll is ready to process' },
            { label: 'Attendance Alerts', key: 'attendanceNotify', desc: 'Daily attendance summary notifications' },
            { label: 'Email Notifications', key: 'emailNotify', desc: 'Receive notifications via email' },
          ].map(({ label, key, desc }) => (
            <div key={key} className="flex items-start justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div>
                <div className="text-sm font-medium text-gray-800">{label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
              </div>
              <button
                onClick={() => toggle(key as keyof typeof settings)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ml-4 ${
                  settings[key as keyof typeof settings] ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  settings[key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-gray-900">Profile</h3>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.[0]}
          </div>
          <div>
            <div className="font-medium text-gray-900">{user?.name}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
            <div className="text-xs text-blue-600 font-medium mt-0.5">{user?.role}</div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 text-amber-700 text-xs rounded-lg px-3 py-2 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 shrink-0" />
          Password changes must be made through the admin panel or by contacting IT support.
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
