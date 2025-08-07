import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="glass-dark border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gradient mb-4">Follow Economy</h3>
            <p className="text-gray-400 text-sm">
              Your trusted platform for real-time financial intelligence and market insights.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/crypto" className="text-gray-400 hover:text-primary transition-colors">Cryptocurrency</Link></li>
              <li><Link href="/tools" className="text-gray-400 hover:text-primary transition-colors">Trading Tools</Link></li>
              <li><Link href="/calendar" className="text-gray-400 hover:text-primary transition-colors">Economic Calendar</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-primary transition-colors">Market News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/api" className="text-gray-400 hover:text-primary transition-colors">API Documentation</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:info@followeconomy.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Follow Economy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}