import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import api from '@/api/axios'

import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { ThemeToggle } from '../ThemeToggle'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await api.get(`/api/user/logout`);
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
                setIsMobileMenuOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    return (
        <div className='bg-background border-b sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                {/* Logo */}
                <div className='flex-shrink-0'>
                    <h1 className='text-xl sm:text-2xl font-bold'>Job<span className='text-primary'>Hunt</span></h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-primary transition-colors">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-primary transition-colors">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-primary transition-colors">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    <div className='flex items-center gap-3'>
                        <ThemeToggle />
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-primary hover:bg-primary/90" size="sm">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer h-8 w-8">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=''>
                                            <div className='flex gap-2 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className='md:hidden flex items-center gap-2'>
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMobileMenu}
                        className="p-2"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className='md:hidden bg-background border-t'>
                    <div className='px-4 py-4 space-y-4'>
                        {/* Mobile Navigation Links */}
                        <ul className='space-y-3'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link
                                                to="/admin/companies"
                                                className="block py-2 text-base font-medium hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/admin/jobs"
                                                className="block py-2 text-base font-medium hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/"
                                                className="block py-2 text-base font-medium hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/jobs"
                                                className="block py-2 text-base font-medium hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/browse"
                                                className="block py-2 text-base font-medium hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>

                        {/* Mobile Auth Section */}
                        <div className='pt-4 border-t'>
                            {
                                !user ? (
                                    <div className='flex flex-col gap-3'>
                                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="outline" className="w-full">Login</Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="bg-primary hover:bg-primary/90 w-full">Signup</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className='space-y-3'>
                                        <div className='flex items-center gap-3 p-3 bg-muted rounded-lg'>
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link
                                                        to="/profile"
                                                        className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <User2 className="h-4 w-4" />
                                                        <span>View Profile</span>
                                                    </Link>
                                                )
                                            }
                                            <button
                                                onClick={logoutHandler}
                                                className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors w-full text-left"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar