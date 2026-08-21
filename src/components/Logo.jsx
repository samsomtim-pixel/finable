export function LogoMark({ className = "w-10 h-10", color = "#1E4536" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="18" r="14" stroke={color} strokeWidth="8"/>
      <circle cx="20" cy="42" r="12" stroke={color} strokeWidth="8"/>
      <circle cx="46" cy="46" r="14" stroke={color} strokeWidth="8"/>
    </svg>
  )
}

export function Logo({ className = "", color = "#1E4536" }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-9 h-9 sm:w-10 sm:h-10" color={color} />
      <span
        className="text-xl sm:text-2xl font-bold tracking-tight"
        style={{ color }}
      >
        Finable
      </span>
    </a>
  )
}
