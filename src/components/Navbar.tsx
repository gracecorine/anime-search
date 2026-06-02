import { Sun, Moon, Menu, X, Sparkles, Search, Home } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()

    const isSearchPage = location.pathname === '/search'

    const [isDark, setIsDark] = useState(
        () => localStorage.getItem('theme') === 'dark'
    )
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleDark = () => {
        const dark = document.documentElement.classList.toggle('dark')
        localStorage.setItem('theme', dark ? 'dark' : 'light')
        setIsDark(dark)
    }

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 text-sm font-semibold transition-colors p-2.5 ${
            isActive
                ? 'text-[#c2608a] dark:text-violet-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#c2608a] dark:hover:text-violet-400'
        }`

    return (
        <nav className="sticky top-0 z-50 border-b border-pink-100 dark:border-purple-900/40 bg-[#fff5f8]/90 dark:bg-[#1a1025]/90 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-1 text-xl font-bold flex-shrink-0"
                >
                    <span className="bg-gradient-to-r from-[#c2608a] to-[#e8a0bf] dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                        AnimeSearch
                    </span>

                    <Sparkles
                        size={18}
                        className="text-pink-400 dark:text-purple-400"
                    />
                </NavLink>

               
                {/* Actions */}
                <div className="flex items-center gap-2">
                     {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink to="/" end className={linkClass}>
                            <Home size={20} />
                        </NavLink>
                    </div>

                    {/* Search */}
                    <NavLink
                        to={isSearchPage ? '#' : '/search'}
                        className={linkClass}
                        onClick={(e) => {
                            if (location.pathname === '/search') {
                                e.preventDefault()
                            }
                        }}
                        aria-label="Search"
                    >
                        <Search size={20} />
                    </NavLink>

                    {/* Theme */}
                    <button
                        onClick={toggleDark}
                        className="p-2.5 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/40 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <Sun
                                size={20}
                                className="text-yellow-400"
                            />
                        ) : (
                            <Moon
                                size={20}
                                className="text-gray-600"
                            />
                        )}
                    </button>

                    {/* Mobile Menu */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2.5 rounded-full hover:bg-pink-100 dark:hover:bg-purple-900/40 transition-colors"
                        aria-label="Menu"
                    >
                        {menuOpen ? (
                            <X
                                size={20}
                                className="text-gray-600 dark:text-gray-200"
                            />
                        ) : (
                            <Menu
                                size={20}
                                className="text-gray-600 dark:text-gray-200"
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-pink-100 dark:border-purple-900/40 px-4 py-3 bg-[#fff5f8] dark:bg-[#1a1025]">
                    <NavLink
                        to="/"
                        end
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        <Home size={16} />
                        Home
                    </NavLink>
                </div>
            )}
        </nav>
    )
}