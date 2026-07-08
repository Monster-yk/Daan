import { useState } from 'react'
import { Avatar, Navbar } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
import { Menu, X, User, LogOut } from 'lucide-react'

export default function NavbarComponent() {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout', { credentials: 'include' })
            dispatch(signoutSuccess())
            navigate('/')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const navLinks = [
        { to: '/home', label: 'Home' },
        { to: '/donate', label: 'Donate' },
        { to: '/volunteer', label: 'Volunteer' },
        { to: '/profile', label: 'Profile' }
    ]

    return (
        <div className="sticky top-0 z-50">
            <Navbar className='bg-white shadow-lg border-b border-gray-100'>
                <div className='flex justify-between items-center w-full max-w-7xl mx-auto px-4'>
                    {/* Logo */}
                    <div className='flex'>
                        <Link to="/" className="flex items-center space-x-2">
                            <div className='flex items-center'>
                                <div className='self-center whitespace-nowrap text-2xl font-bold font-serif text-gray-800'>
                                    Daan
                                </div>
                                <div className='text-green-600 font-bold text-2xl'>.</div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex space-x-8'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className='text-gray-700 hover:text-green-600 font-medium transition-colors duration-200'
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className='flex items-center space-x-4'>
                        {currentUser ? (
                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <Avatar 
                                        alt='user' 
                                        img={currentUser.profilePicture} 
                                        className='cursor-pointer border-2 border-green-200 hover:border-green-400 transition-colors' 
                                        rounded 
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="py-2">
                                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                                <p className="font-medium">{currentUser.username}</p>
                                                <p className="text-gray-500">{currentUser.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <User className="w-4 h-4 mr-2" />
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='hidden md:flex space-x-4'>
                                <Link
                                    to='/signin'
                                    className='px-6 py-2 border-2 border-green-600 text-green-600 rounded-full font-medium hover:bg-green-600 hover:text-white transition-all duration-200'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/signup'
                                    className='px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all duration-200'
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='md:hidden border-t border-gray-100 bg-white'>
                        <div className='px-4 py-4 space-y-3'>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className='block text-gray-700 hover:text-green-600 font-medium transition-colors duration-200'
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {!currentUser && (
                                <div className='pt-4 space-y-3 border-t border-gray-100'>
                                    <Link
                                        to='/signin'
                                        className='block px-6 py-2 border-2 border-green-600 text-green-600 rounded-full font-medium hover:bg-green-600 hover:text-white transition-all duration-200 text-center'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to='/signup'
                                        className='block px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all duration-200 text-center'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Navbar>
        </div>
    )
}
