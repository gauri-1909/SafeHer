import { ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <header className="flex items-center justify-between bg-gradient-to-br from-navbar-start to-navbar-end text-navbar-text px-7 py-4">
      <div className="flex items-center gap-2.5 text-xl font-bold">
        <ShieldCheck size={22} strokeWidth={2.4} />
        SafeHer
      </div>
      <div className="flex items-center gap-3.5">
        {firstName && (
          <span className="text-sm font-medium opacity-90">Hi, {firstName}</span>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-full bg-white/85 hover:bg-white text-navbar-end px-4 py-2 text-[13px] font-semibold transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}