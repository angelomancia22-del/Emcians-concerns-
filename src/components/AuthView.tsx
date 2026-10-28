import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Lock,
  User,
  Mail,
  Key,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  QrCode,
  Shield,
  Smartphone,
} from 'lucide-react';

interface AuthViewProps {
  onOpenTrackTicket?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onOpenTrackTicket }) => {
  const { login, loginAsUser, registerStudent, allUsers, getComplaintByTicketNumber, setSelectedTicketId, setActiveTab } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'register' | 'track'>('signin');
  const [selectedRoleTab, setSelectedRoleTab] = useState<'student' | 'faculty' | 'admin'>('student');

  // Sign in form state
  const [identifier, setIdentifier] = useState('angelomancia22@gmail.com');
  const [password, setPassword] = useState('student123');
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regProgram, setRegProgram] = useState('BS Information Technology');
  const [regYearLevel, setRegYearLevel] = useState('1st Year');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // Quick ticket search state
  const [ticketSearchCode, setTicketSearchCode] = useState('');
  const [trackError, setTrackError] = useState<string | null>(null);

  // When role tab changes, pre-fill sample credentials for easy testing
  const handleRoleTabChange = (role: 'student' | 'faculty' | 'admin') => {
    setSelectedRoleTab(role);
    setSignInError(null);
    if (role === 'student') {
      setIdentifier('angelomancia22@gmail.com');
      setPassword('student123');
    } else if (role === 'faculty') {
      setIdentifier('r.ramos@emc.edu.ph');
      setPassword('faculty123');
    } else if (role === 'admin') {
      setIdentifier('v.tolentino@emc.edu.ph');
      setPassword('admin123');
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);
    if (!identifier.trim() || !password.trim()) {
      setSignInError('Please enter your email/ID and password.');
      return;
    }

    const result = login(identifier.trim(), password.trim());
    if (!result.success) {
      setSignInError(result.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    if (!regName.trim() || !regStudentId.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('All fields are required.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }

    const res = registerStudent({
      name: regName.trim(),
      email: regEmail.trim(),
      studentId: regStudentId.trim(),
      program: regProgram,
      yearLevel: regYearLevel,
      password: regPassword.trim(),
    });

    if (!res.success) {
      setRegError(res.error || 'Registration failed.');
    } else {
      setRegSuccess('Student account successfully registered and signed in!');
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError(null);
    if (!ticketSearchCode.trim()) return;

    const t = getComplaintByTicketNumber(ticketSearchCode.trim());
    if (t) {
      setSelectedTicketId(t.id);
      if (onOpenTrackTicket) {
        onOpenTrackTicket();
      } else {
        setActiveTab('track');
      }
    } else {
      setTrackError(`Ticket reference "${ticketSearchCode.trim().toUpperCase()}" not found in institutional docket.`);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-950 bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('/assets/aistudio/FB_IMG_1793160649042_17e8179c.jpg')`,
      }}
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
        {/* Top College Crest & Header Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 text-center border-b border-slate-800 relative">
          <div className="w-20 h-20 rounded-full bg-white p-1 mx-auto shadow-xl border-2 border-amber-400 mb-3 overflow-hidden transform hover:scale-105 transition-transform">
            <img
              src="/assets/aistudio/FB_IMG_1761024576270_a833f677.jpg"
              alt="Eastern Mindoro College, Inc. Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif uppercase">
            Eastern Mindoro College, Inc.
          </h1>
          <p className="text-xs text-amber-400 font-semibold tracking-wider mt-0.5">
            Bongabong, Oriental Mindoro • Founded 1945
          </p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-medium">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Student Concern &amp; Complaint Management System</span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> RA 10173 Data Privacy Secured
            </span>
            <span>•</span>
            <span>ISO 25010 Evaluated</span>
          </div>
        </div>

        {/* Navigation Mode Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-3 text-center transition-all flex items-center justify-center gap-1.5 border-b-2 ${
              authMode === 'signin'
                ? 'border-amber-500 text-slate-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <LogIn className="w-4 h-4 text-amber-600" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-3 text-center transition-all flex items-center justify-center gap-1.5 border-b-2 ${
              authMode === 'register'
                ? 'border-amber-500 text-slate-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>Register Student</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('track')}
            className={`flex-1 py-3 text-center transition-all flex items-center justify-center gap-1.5 border-b-2 ${
              authMode === 'track'
                ? 'border-amber-500 text-slate-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-600" />
            <span>Track Pass</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {/* 1. SIGN IN MODE */}
          {authMode === 'signin' && (
            <div className="space-y-5">
              {/* Role Select Tabs */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Select User Role / Portal
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleRoleTabChange('student')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      selectedRoleTab === 'student'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleTabChange('faculty')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      selectedRoleTab === 'faculty'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Faculty</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleTabChange('admin')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      selectedRoleTab === 'admin'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {signInError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{signInError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {selectedRoleTab === 'student' ? 'Student ID or College Email' : 'Institutional Email Address'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={
                        selectedRoleTab === 'student'
                          ? 'e.g. 2023-01458 or angelomancia22@gmail.com'
                          : selectedRoleTab === 'faculty'
                          ? 'e.g. r.ramos@emc.edu.ph'
                          : 'e.g. v.tolentino@emc.edu.ph'
                      }
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium text-slate-900"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Account Password</label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (Default: {selectedRoleTab === 'student' ? 'student123' : selectedRoleTab === 'faculty' ? 'faculty123' : 'admin123'})
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900"
                    />
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Authenticate &amp; Enter Portal</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Quick Demo Access Buttons */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
                  One-Click Demo Credentials
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => loginAsUser('user-std-1')}
                    className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-medium text-left flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">
                      AL
                    </div>
                    <div className="truncate">
                      <div className="font-bold truncate">Angelo Lumalang Mancia</div>
                      <div className="text-[10px] text-amber-800">BSIT 3rd Yr (Student)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginAsUser('user-adm-1')}
                    className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-950 font-medium text-left flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      VT
                    </div>
                    <div className="truncate">
                      <div className="font-bold truncate">Dean Victor Tolentino</div>
                      <div className="text-[10px] text-purple-800">OSA Grievance Chair (Admin)</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. REGISTER STUDENT ACCOUNT */}
          {authMode === 'register' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Create EMCI Student Account</h3>
                <p className="text-xs text-slate-500">
                  Register your official student credentials to submit private complaints and track remediation.
                </p>
              </div>

              {regError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{regSuccess}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Student Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juan dela Cruz"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Student ID No.</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2026-00123"
                      value={regStudentId}
                      onChange={(e) => setRegStudentId(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">College Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@emc.edu.ph"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Academic Program</label>
                    <select
                      value={regProgram}
                      onChange={(e) => setRegProgram(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="BS Information Technology">BS Information Technology</option>
                      <option value="BS Computer Science">BS Computer Science</option>
                      <option value="BS Business Administration">BS Business Administration</option>
                      <option value="Bachelor of Secondary Education">Bachelor of Secondary Education</option>
                      <option value="Bachelor of Elementary Education">Bachelor of Elementary Education</option>
                      <option value="BS Hospitality Management">BS Hospitality Management</option>
                      <option value="BS Criminology">BS Criminology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Year Level</label>
                    <select
                      value={regYearLevel}
                      onChange={(e) => setRegYearLevel(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Re-type password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register &amp; Open Portal</span>
                </button>
              </form>
            </div>
          )}

          {/* 3. TRACK PASS MODE (PUBLIC REFERENCE CODE LOOKUP) */}
          {authMode === 'track' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-amber-600" />
                  <span>Direct QR or Reference Ticket Tracking</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check your concern status using your reference code (e.g. EMC-2026-0101). Note: Under Republic Act 10173, complainant identity is redacted for public lookup.
                </p>
              </div>

              {trackError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}

              <form onSubmit={handleTrackSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ticket Reference Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. EMC-2026-0101"
                      value={ticketSearchCode}
                      onChange={(e) => setTicketSearchCode(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Look Up Ticket Status</span>
                </button>
              </form>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy Shield Active:</strong> Complainant personal information is strictly concealed to ensure full confidentiality and anti-retaliation protection.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-500">
          <span>Eastern Mindoro College, Inc. • Office of Student Affairs Grievance Redressal</span>
        </div>
      </div>
    </div>
  );
};
