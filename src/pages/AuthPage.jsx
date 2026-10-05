import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function AuthPage({ onSubmit, onGoogleAuth }) {
    const [mode, setMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const inputClass =
        'w-full bg-ink-950 border border-ink-700 rounded-md px-3 py-2 text-paper-100 text-sm focus:outline-none focus:border-ember-400';

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const changeMode = (nextMode) => {
        setMode(nextMode);
        setMessage('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        if (mode === 'signup' && form.password !== form.confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit?.({ mode, ...form });
        } catch (error) {
            setMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleAuth = () => {
        if (onGoogleAuth) {
            onGoogleAuth(mode);
            return;
        }
        window.location.assign(`${API_URL}/api/v1/auth/google?mode=${mode}`);
    };

    return (
        <main className="auth-shell min-h-screen bg-ink-950 flex items-center justify-center px-4 py-8 font-body">
            <div className="auth-layout w-full max-w-5xl grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-16 items-center">

                {/* Left side - intro text, hidden on small screens */}
                <motion.section
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden lg:block px-4"
                >
                    <p className="eyebrow text-ember-400 mb-6">A quieter place for ideas</p>

                    <h1 className="font-display text-6xl xl:text-7xl leading-[0.95] text-paper-100 max-w-lg">
                        Read deeply.
                        <br />
                        <span className="text-paper-400">Write freely.</span>
                    </h1>

                    <p className="mt-7 max-w-md text-paper-400 leading-relaxed">
                        Join a thoughtful community of writers and curious minds. Your next great idea starts here.
                    </p>

                    <div className="mt-14 flex items-center gap-3 text-xs text-paper-400">
                        <span className="h-px w-10 bg-ember-400" />
                        <span>Stories worth keeping</span>
                    </div>
                </motion.section>

                {/* Right side - auth card */}
                <div className="w-full max-w-md mx-auto">

                    {/* Mobile logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center select-none mb-8 lg:hidden"
                    >
                        <span className="font-display text-4xl text-paper-100 tracking-tight">
                            Folio<span className="text-ember-400">.</span>
                        </span>
                        <span
                            aria-hidden="true"
                            className="font-display text-4xl text-paper-100 tracking-tight scale-y-[-1] opacity-30 -mt-1 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
                        >
                            Folio<span className="text-ember-400">.</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="auth-card bg-ink-900 border border-ink-700 rounded-lg p-6 sm:p-8"
                    >
                        {/* Header */}
                        <div className="mb-7">
                            <p className="eyebrow text-ember-400 mb-2">Welcome to Folio</p>
                            <h2 className="font-display text-3xl text-paper-100">Your desk awaits.</h2>
                            <p className="text-sm text-paper-400 mt-2">Sign in to continue your reading journey.</p>
                        </div>

                        {/* Login / Signup tabs */}
                        <div className="relative flex gap-6 mb-6 border-b border-ink-700">
                            {['login', 'signup'].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => changeMode(item)}
                                    className={`relative pb-3 text-sm transition-colors ${
                                        mode === item ? 'text-paper-100' : 'text-paper-400 hover:text-paper-100'
                                    }`}
                                >
                                    {item === 'login' ? 'Log in' : 'Sign up'}
                                    {mode === item && (
                                        <motion.div
                                            layoutId="tab-underline"
                                            className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-ember-400"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Google auth button */}
                        <motion.button
                            type="button"
                            onClick={handleGoogleAuth}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-3 border border-ink-700 bg-ink-950 text-paper-100 text-sm rounded-md py-2.5 transition-colors hover:border-paper-400"
                        >
                            <span className="google-mark" aria-hidden="true">G</span>
                            Continue with Google
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6 text-[11px] uppercase tracking-[0.16em] text-paper-400">
                            <span className="h-px flex-1 bg-ink-700" />
                            <span>or use email</span>
                            <span className="h-px flex-1 bg-ink-700" />
                        </div>

                        {/* Login / Signup form */}
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={mode}
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, x: mode === 'signup' ? 12 : -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                {mode === 'signup' && (
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className="block text-xs text-paper-400 mb-1.5">First name</label>
                                            <input
                                                required
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-paper-400 mb-1.5">Last name</label>
                                            <input
                                                required
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs text-paper-400 mb-1.5">Email</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs text-paper-400">Password</label>
                                        {mode === 'login' && (
                                            <button type="button" className="text-xs text-ember-400 hover:underline">
                                                Forgot password?
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            required
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className={`${inputClass} pr-16`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-paper-400 hover:text-paper-100"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>

                                {mode === 'signup' && (
                                    <div>
                                        <label className="block text-xs text-paper-400 mb-1.5">Confirm password</label>
                                        <input
                                            required
                                            type="password"
                                            name="confirmPassword"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-ember-400 hover:bg-ember-500 disabled:opacity-60 text-ink-950 font-medium text-sm rounded-md py-2.5 mt-2 transition-colors"
                                >
                                    {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
                                </motion.button>

                                {message && (
                                    <p role="alert" className="text-xs text-red-300 text-center pt-1">
                                        {message}
                                    </p>
                                )}
                            </motion.form>
                        </AnimatePresence>
                    </motion.div>

                    <p className="text-center text-xs text-paper-400 mt-6">
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={() => changeMode(mode === 'login' ? 'signup' : 'login')}
                            className="text-ember-400 hover:underline"
                        >
                            {mode === 'login' ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}