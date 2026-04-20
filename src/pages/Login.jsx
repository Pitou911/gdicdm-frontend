import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate  = useNavigate();

    const [email,    setEmail]    = useState('');
    const [password, setPassword] = useState('');
    const [error,    setError]    = useState('');
    const [loading,  setLoading]  = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/cms-dashboard', { replace: true });
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* brand */}
                <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center shadow-[0_2px_8px_rgba(0,109,110,0.3)]">
                        <img src="/mef_logo.png" alt="GDICDM" />
                    </div>
                    <div>
                        <div className="font-display text-[16px] font-bold text-text tracking-[-0.2px]">GDICDM</div>
                        <div className="text-[10px] text-text-3 font-normal">Ministry of Economy &amp; Finance</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-light-2 shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-8">
                    <h1 className="text-[18px] font-bold text-text mb-1">Admin Login</h1>
                    <p className="text-[13px] text-text-3 mb-6">Sign in to access the CMS dashboard.</p>

                    {error && (
                        <div className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-semibold text-text-3 uppercase tracking-[0.5px]">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoFocus
                                placeholder="admin@gdicdm.gov.kh"
                                className="w-full px-3.5 py-2.5 rounded-lg border border-light-2 text-[14px] text-text bg-white outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-semibold text-text-3 uppercase tracking-[0.5px]">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2.5 rounded-lg border border-light-2 text-[14px] text-text bg-white outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full py-2.5 rounded-lg bg-teal text-white text-[14px] font-semibold cursor-pointer hover:bg-teal/90 transition-colors disabled:opacity-60"
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
