import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { isAxiosError } from 'axios';
import Logo from '../components/Logo';
import { useAuthMutation } from '../features/auth/useAuthMutation';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function AuthPage({ onSubmit, onGoogleAuth }) {
    const [mode, setMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const authMutation = useAuthMutation(onSubmit);
    const isSubmitting = authMutation.isPending;
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const inputClass =
        'auth-input w-full rounded-xl border border-ink-700/80 bg-ink-950/70 px-4 py-3 text-sm text-paper-100 placeholder:text-paper-400/55 focus:outline-none';

    const handleChange = (event) => {
        setForm((currentForm) => ({
            ...currentForm,
            [event.target.name]: event.target.value,
        }));
    };

    const changeMode = (nextMode) => {
        setMode(nextMode);
        setFeedback(null);
        authMutation.reset();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedback(null);

        if (mode === 'signup' && form.password !== form.confirmPassword) {
            setFeedback({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        try {
            const result = await authMutation.mutateAsync({
                mode,
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email.trim(),
                password: form.password,
            });
            setFeedback({
                type: 'success',
                text: result?.message || (mode === 'login' ? 'You are signed in.' : 'Your account has been created.'),
            });
        } catch (error) {
            const errorMessage = isAxiosError(error)
                ? error.response?.data?.message
                : error instanceof Error
                  ? error.message
                  : null;
            setFeedback({
                type: 'error',
                text: errorMessage || 'Unable to connect. Please try again.',
            });
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
        <MotionConfig reducedMotion="user">
        <main className="min-h-screen px-4 py-8 font-body text-paper-100 sm:px-6 lg:px-10">
            <div className="auth-layout mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-20">
                <motion.section
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden lg:sticky lg:top-8 lg:flex lg:min-h-155 lg:self-start lg:flex-col lg:justify-between lg:py-5"
                >
                    <div>
                        <Logo />

                        <div className="mt-24 max-w-xl">
                            <p className="eyebrow mb-5 flex items-center gap-3 text-ember-400">
                                <span className="h-px w-7 bg-ember-400/70" />
                                A quieter place for ideas
                            </p>
                            <h1 className="font-display text-6xl leading-[1.04] tracking-[-0.045em] text-paper-100 xl:text-7xl">
                                Read deeply.
                                <br />
                                <span className="text-paper-400">Write freely.</span>
                            </h1>
                            <p className="mt-7 max-w-md text-base leading-7 text-paper-400">
                                A thoughtful corner of the internet for stories, fresh perspectives, and the people who love them.
                            </p>
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="editorial-note max-w-md rounded-2xl border border-white/[0.07] p-6"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <span className="eyebrow text-paper-400">
                                {mode === 'login' ? 'The reading life' : 'A new chapter'}
                            </span>
                            <motion.span
                                animate={{ rotate: mode === 'signup' ? 45 : 0 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                                className="text-ember-400"
                                aria-hidden="true"
                            >
                                ✳
                            </motion.span>
                        </div>
                        <div className="editorial-quote">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.p
                                    key={mode}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.22 }}
                                    className="font-display text-2xl leading-snug text-paper-100"
                                >
                                    {mode === 'login'
                                        ? '“Every page is a place to begin again.”'
                                        : '“The best stories start with a first line.”'}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                        <div className="mt-6 flex items-center gap-3 text-xs text-paper-400">
                            <span className="h-px w-8 bg-ember-400/70" />
                            {mode === 'login' ? 'Stories worth keeping' : 'Make room for your voice'}
                        </div>
                    </motion.div>
                </motion.section>

                <motion.div layout className="mx-auto w-full max-w-110 lg:self-start">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8 flex justify-center lg:hidden"
                    >
                        <Logo />
                    </motion.div>

                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            layout: { type: 'spring', stiffness: 150, damping: 24 },
                            opacity: { duration: 0.45, delay: 0.08 },
                            y: { duration: 0.45, delay: 0.08 },
                        }}
                        className="auth-card rounded-2xl border border-white/9 p-6 sm:p-9"
                    >
                        <div className="mb-8">
                            <p className="eyebrow mb-3 text-ember-400">
                                {mode === 'login' ? 'Welcome back' : 'Your next chapter'}
                            </p>
                            <h2 className="font-display text-3xl leading-tight tracking-tight text-paper-100 sm:text-[2.1rem]">
                                {mode === 'login' ? 'Your desk awaits.' : 'Make yourself at home.'}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-paper-400">
                                {mode === 'login'
                                    ? 'Sign in and pick up right where you left off.'
                                    : 'Create an account and make room for new ideas.'}
                            </p>
                        </div>

                        <div
                            role="group"
                            aria-label="Account access"
                            className="mb-6 grid grid-cols-2 rounded-xl border border-white/[0.07] bg-ink-950/60 p-1"
                        >
                            {['login', 'signup'].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    aria-pressed={mode === item}
                                    onClick={() => changeMode(item)}
                                    className={`relative rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                        mode === item ? 'text-paper-100' : 'text-paper-400 hover:text-paper-100'
                                    }`}
                                >
                                    {mode === item && (
                                        <motion.span
                                            layoutId="auth-mode-indicator"
                                            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                                            className="absolute inset-0 rounded-lg bg-ink-700/70 shadow-sm"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className="relative z-10">
                                        {item === 'login' ? 'Log in' : 'Create account'}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <motion.button
                            type="button"
                            onClick={handleGoogleAuth}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.99 }}
                            className="auth-secondary-button flex w-full items-center justify-center gap-3 rounded-xl border border-ink-700/80 bg-white/2.5 py-3 text-sm font-medium text-paper-100 transition-colors hover:bg-white/6"
                        >
                            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4.5 w-4.5">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 37.93 46.98 31.88 46.98 24.55Z" transform="translate(0 -1)" />
                                <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.97 23.97 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 3)" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -3)" />
                            </svg>
                            Continue with Google
                        </motion.button>

                        <div className="my-6 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-paper-400/75">
                            <span className="h-px flex-1 bg-white/9" />
                            <span>or continue with email</span>
                            <span className="h-px flex-1 bg-white/9" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.form
                                id="auth-form-panel"
                                key={mode}
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, x: mode === 'signup' ? 10 : -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: mode === 'signup' ? -10 : 10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                {mode === 'signup' && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="firstName" className="mb-2 block text-xs font-medium text-paper-400">
                                                First name
                                            </label>
                                            <input
                                                id="firstName"
                                                required
                                                autoComplete="given-name"
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                placeholder="Jane"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="mb-2 block text-xs font-medium text-paper-400">
                                                Last name
                                            </label>
                                            <input
                                                id="lastName"
                                                required
                                                autoComplete="family-name"
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-xs font-medium text-paper-400">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        required
                                        type="email"
                                        autoComplete="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label htmlFor="password" className="block text-xs font-medium text-paper-400">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            aria-pressed={showPassword}
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-xs text-paper-400 transition-colors hover:text-ember-400"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    <input
                                        id="password"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        minLength={mode === 'signup' ? 8 : undefined}
                                        maxLength={128}
                                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className={inputClass}
                                    />
                                </div>

                                {mode === 'signup' && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="mb-2 block text-xs font-medium text-paper-400">
                                            Confirm password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            required
                                            type="password"
                                            autoComplete="new-password"
                                            name="confirmPassword"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Enter your password again"
                                            className={inputClass}
                                        />
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="auth-primary-button mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-ink-950 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting
                                        ? 'Please wait...'
                                        : mode === 'login'
                                          ? 'Log in to Folio'
                                          : 'Create your account'}
                                    {!isSubmitting && <span aria-hidden="true">→</span>}
                                </motion.button>

                                {feedback && (
                                    <p
                                        role={feedback.type === 'error' ? 'alert' : 'status'}
                                        className={`rounded-lg border px-3 py-2 text-center text-xs ${
                                            feedback.type === 'error'
                                                ? 'border-red-400/20 bg-red-400/[0.07] text-red-200'
                                                : 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-200'
                                        }`}
                                    >
                                        {feedback.text}
                                    </p>
                                )}
                            </motion.form>
                        </AnimatePresence>

                        <p className="mt-6 text-center text-xs leading-5 text-paper-400">
                            A welcoming space for thoughtful readers and writers.
                        </p>
                    </motion.div>

                    <p className="mt-6 text-center text-sm text-paper-400">
                        {mode === 'login' ? "New to Folio? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={() => changeMode(mode === 'login' ? 'signup' : 'login')}
                            className="font-medium text-ember-400 transition-colors hover:text-ember-500"
                        >
                            {mode === 'login' ? 'Create an account' : 'Log in'}
                        </button>
                    </p>
                </motion.div>
            </div>
        </main>
        </MotionConfig>
    );
}
