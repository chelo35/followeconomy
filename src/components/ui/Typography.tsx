interface HeadingProps {
  children: React.ReactNode
  className?: string
}

export function Heading1({ children, className = '' }: HeadingProps) {
  return (
    <h1 className={`text-4xl md:text-5xl font-bold theme-text-primary leading-tight ${className}`}>
      {children}
    </h1>
  )
}

export function Heading2({ children, className = '' }: HeadingProps) {
  return (
    <h2 className={`text-2xl md:text-3xl font-semibold theme-text-primary ${className}`}>
      {children}
    </h2>
  )
}

export function Heading3({ children, className = '' }: HeadingProps) {
  return (
    <h3 className={`text-xl font-semibold theme-text-primary ${className}`}>
      {children}
    </h3>
  )
}

export function BodyText({ children, className = '' }: HeadingProps) {
  return (
    <p className={`theme-text-secondary leading-relaxed ${className}`}>
      {children}
    </p>
  )
}