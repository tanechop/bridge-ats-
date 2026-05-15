import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Lock, ShieldCheck,
  GraduationCap, Briefcase, Building2, ChevronRight
} from 'lucide-react';

type RoleType = "Admin" | "Seeker" | "Recruiter";

const InputField = ({ label, name, type = "text", placeholder, icon: Icon, value, onChange, error }: any) => (
  <div className="space-y-1.5">
    <label className="text-[11px] uppercase tracking-wider text-outline font-bold flex justify-between">
      {label}
      {error && <span className="text-red-500 normal-case tracking-normal">{error}</span>}
    </label>
    <div className="relative group">
      <input
        className={`w-full px-4 py-3 bg-surface-container-low rounded-lg border ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/5' : 'border-outline-variant/20 focus:border-surface-tint focus:ring-surface-tint/5'} focus:outline-none focus:ring-4 transition-all text-sm placeholder:text-outline-variant text-on-surface`}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {Icon && <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-surface-tint" size={18} />}
    </div>
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleType>("Seeker");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.includes('@')) newErrors.email = "Invalid email address";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);

      // Simulate authentication
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', role);

      // Simulate redirection based on role
      setTimeout(() => {
        switch (role) {
          case "Admin":
            navigate('/admin/dashboard');
            break;
          case "Recruiter":
            navigate('/recruiter/dashboard');
            break;
          case "Seeker":
          default:
            navigate('/seeker/dashboard');
            break;
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 bg-surface">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl editorial-shadow border border-outline-variant/10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Welcome Back</h1>
            <p className="text-secondary text-sm">Select your role and sign in to your dashboard</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Role Selector */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Admin', icon: User },
                { id: 'Seeker', icon: Briefcase },
                { id: 'Recruiter', icon: Building2 }
              ].map((r) => {
                const isSelected = role === r.id;
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id as RoleType)}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                      ? 'border-surface-tint bg-surface-tint/5 text-surface-tint'
                      : 'border-outline-variant/20 hover:border-outline-variant/50 text-secondary bg-surface-container-low'
                      }`}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="text-xs font-bold">{r.id}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-5">
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="alex@example.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-surface-tint hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 hero-gradient text-white rounded-full font-bold text-sm tracking-wide shadow-lg flex justify-center items-center gap-2 group transition-all active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110'}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In as {role}
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-secondary text-xs">
                Don't have an account?
                <Link to="/register" className="text-surface-tint font-bold hover:underline underline-offset-4 ml-1">Sign Up</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
