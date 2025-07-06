import Link from "next/link"
import { Terminal, Github, Linkedin, Twitter } from "lucide-react"
import { Avatar } from "@/components/avatar"

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-black/80 backdrop-blur-md py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="neon-text text-lg font-bold">TechVerse</span>
            </div>
            <p className="text-sm text-primary/70">
              The official portal for IITM BS Cyber Society - Code. Crack. Create.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-primary/70 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-orbitron text-sm mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/galaxy" className="text-primary/70 hover:text-primary transition-colors">
                  Galaxy
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-primary/70 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-primary/70 hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-primary/70 hover:text-primary transition-colors">
                  Explorer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-sm mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/join" className="text-primary/70 hover:text-primary transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="text-primary/70 hover:text-primary transition-colors">
                  Mentors
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-primary/70 hover:text-primary transition-colors">
                  Explorer
                </Link>
              </li>
              <li>
                <Link href="/chronicles" className="text-primary/70 hover:text-primary transition-colors">
                  Chronicles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-sm mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-primary/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary/70 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="text-primary/70 hover:text-primary transition-colors">
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-primary/50 mb-4 md:mb-0">
            © {new Date().getFullYear()} TechVerse - IITM BS Cyber Society. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="inline-block px-2 py-1 bg-primary/10 rounded text-primary/70 font-mono text-xs">
              v1.0.0-alpha
            </span>
            <div className="flex -space-x-2">
              <Avatar type="hacker" size="sm" animated={false} className="border-2 border-black" />
              <Avatar type="ai" size="sm" animated={false} className="border-2 border-black" />
              <Avatar type="mentor" size="sm" animated={false} className="border-2 border-black" />
              <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-black flex items-center justify-center text-primary/70 text-xs">
                +42
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
