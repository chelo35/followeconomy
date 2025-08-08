'use client'
import { useTheme } from '@/contexts/ThemeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="theme-surface theme-shadow rounded-xl p-2 backdrop-blur-lg">
        <div className="flex gap-1">
          <button
            onClick={() => toggleTheme()}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${theme === 'light' 
                ? 'theme-primary-bg text-white' 
                : 'hover:bg-white/5 theme-text-secondary'
              }
            `}
          >
            <SunIcon className="w-4 h-4" />
            Light
          </button>
          
          <button
            onClick={() => toggleTheme()}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${theme === 'dark' 
                ? 'theme-primary-bg text-white' 
                : 'hover:bg-black/5 theme-text-secondary'
              }
            `}
          >
            <MoonIcon className="w-4 h-4" />
            Dark
          </button>
        </div>
      </div>
    </div>
  )
}