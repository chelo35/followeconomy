interface ProfessionalCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export default function ProfessionalCard({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md' 
}: ProfessionalCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8'
  }

  return (
    <div 
      className={`
        theme-surface theme-shadow rounded-2xl backdrop-blur-sm
        transition-all duration-300 ease-out
        ${hover ? 'hover:theme-shadow-hover hover:-translate-y-1 cursor-pointer' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}