export default function Logo({ className = '' }) {
    return (
        <span
            role="img"
            aria-label="Folio"
            className={`inline-flex items-center gap-3 text-paper-100 ${className}`}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                fill="none"
                className="h-10 w-10 shrink-0"
            >
                <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="12"
                    fill="currentColor"
                    fillOpacity=".07"
                />
                <path
                    d="M20 13.5c-3-2-6.2-2.6-10-1.8v15.1c3.8-.8 7-.2 10 1.8m0-15.1c3-2 6.2-2.6 10-1.8v15.1c-3.8-.8-7-.2-10 1.8m0-15.1v15.1"
                    stroke="#D7A34C"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="font-display text-[1.75rem] leading-none tracking-tight">
                Folio<span className="text-ember-400">.</span>
            </span>
        </span>
    );
}
