// Iconos de trazo (1.6px), una sola familia. Decorativos: aria-hidden.

export const ArrowRight = () => (
  <svg className="icon icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
)

export const ArrowLeft = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
)

export const ArrowUpRight = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
)

export const MenuIcon = ({ open }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>
)

export const InstagramGlyph = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const WhatsAppGlyph = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16.02 3.2A12.76 12.76 0 0 0 5.06 22.5L3.6 28.8l6.44-1.38A12.78 12.78 0 1 0 16.02 3.2Zm0 2.28a10.5 10.5 0 1 1-5.34 19.54l-.38-.22-3.6.77.82-3.5-.25-.4A10.5 10.5 0 0 1 16.02 5.48Zm-3.4 5.34c-.23-.55-.48-.56-.7-.57h-.6c-.22 0-.57.08-.87.4-.3.33-1.14 1.12-1.14 2.72 0 1.6 1.17 3.15 1.33 3.37.16.22 2.26 3.62 5.58 4.93 2.76 1.09 3.32.87 3.92.82.6-.06 1.94-.8 2.22-1.56.27-.77.27-1.43.19-1.56-.08-.14-.3-.22-.63-.38l-1.86-.91c-.33-.17-.57-.25-.81.24-.25.5-.93 1.21-1.14 1.46-.21.25-.42.28-.78.12-.36-.17-1.5-.55-2.86-1.76-1.06-.94-1.77-2.1-1.98-2.46-.2-.36-.02-.55.15-.72.16-.16.36-.42.55-.63.18-.21.24-.36.36-.6.12-.25.06-.46-.03-.64l-.9-1.97Z" />
  </svg>
)

// Anillos discontinuos inspirados en el globo del logo (nunca el logo redibujado).
export function Rings({ className = 'rings' }) {
  return (
    <svg className={className} viewBox="0 0 640 640" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="320" cy="320" r="300" strokeWidth="10" strokeOpacity=".22" strokeDasharray="520 90 260 120 400 200" />
        <circle cx="320" cy="320" r="236" strokeWidth="10" strokeOpacity=".3" strokeDasharray="300 70 420 160" />
        <circle cx="320" cy="320" r="172" strokeWidth="10" strokeOpacity=".38" strokeDasharray="220 60 300 90 200" />
        <circle cx="320" cy="320" r="108" strokeWidth="2" strokeOpacity=".5" />
      </g>
    </svg>
  )
}
