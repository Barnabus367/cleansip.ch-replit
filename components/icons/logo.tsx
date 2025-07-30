import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 24 24"
      {...props}
      className={clsx('h-4 w-4', props.className)}
    >
      {/* CleanSip Straw Logo - Modern, clean design */}
      <defs>
        <linearGradient id="strawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#00BFA6', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#003B46', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* Main straw body */}
      <rect x="10" y="2" width="4" height="20" rx="2" fill="url(#strawGradient)" />
      
      {/* Bendable section - upper */}
      <path d="M10 6 L14 6 L16 4 L12 4 Z" fill="url(#strawGradient)" />
      
      {/* Bendable section - ridges */}
      <line x1="10" y1="7" x2="14" y2="7" stroke="#FFD54F" strokeWidth="0.5" />
      <line x1="10" y1="8" x2="14" y2="8" stroke="#FFD54F" strokeWidth="0.5" />
      <line x1="10" y1="9" x2="14" y2="9" stroke="#FFD54F" strokeWidth="0.5" />
      
      {/* Straw tip highlight */}
      <ellipse cx="12" cy="3" rx="1.5" ry="0.5" fill="#FFD54F" opacity="0.7" />
    </svg>
  );
}
