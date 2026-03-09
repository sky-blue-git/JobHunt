import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import api from '@/api/axios'

import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Lock, Mail, KeyRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '../ui/page-transition'
import LottieAnimation from '../ui/lottie-animation'
import BackgroundPattern from '../ui/background-pattern'
import authAnimation from '../../assets/lottie/authentication.json'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await api.post(`/api/user/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])
    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="relative overflow-hidden">
                    <BackgroundPattern
                        variant="diagonal"
                        className="absolute inset-0 opacity-10 z-0"
                    />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <motion.div
                                className="md:w-1/2 flex flex-col items-center md:items-start"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-64 h-64 mb-6">
                                    <LottieAnimation
                                        animationData={authAnimation}
                                        loop={true}
                                    />
                                </div>
                                <h1 className="text-3xl font-bold mb-4 text-center md:text-left">Welcome Back!</h1>
                                <p className="text-muted-foreground text-center md:text-left mb-6">
                                    Sign in to access your account and continue your job search journey.
                                </p>

                                <div className="space-y-6 w-full max-w-md">
                                    <motion.div
                                        className="flex items-start space-x-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                    >
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                                <path d="M20 7h-9"></path>
                                                <path d="M14 17H5"></path>
                                                <circle cx="17" cy="17" r="3"></circle>
                                                <circle cx="7" cy="7" r="3"></circle>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Find Your Dream Job</h3>
                                            <p className="text-sm text-muted-foreground">Access thousands of job listings tailored to your skills and experience.</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-start space-x-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.5 }}
                                    >
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                                <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Fast Application Process</h3>
                                            <p className="text-sm text-muted-foreground">Apply to multiple positions with just a few clicks using your saved profile.</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-start space-x-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.7 }}
                                    >
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                                <path d="M12 8v4"></path>
                                                <path d="M12 16h.01"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Real-time Updates</h3>
                                            <p className="text-sm text-muted-foreground">Get notified instantly when employers respond to your applications.</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="md:w-1/2 w-full max-w-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="bg-card border border-border shadow-sm rounded-lg p-6">
                                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                        <Lock className="mr-2 h-5 w-5 text-primary" />
                                        Login to Your Account
                                    </h2>

                                    <form onSubmit={submitHandler}>
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="text-sm font-medium">Email</Label>
                                                <div className="mt-1 relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <Input
                                                        type="email"
                                                        value={input.email}
                                                        name="email"
                                                        onChange={changeEventHandler}
                                                        placeholder="your.email@example.com"
                                                        className="pl-10"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium">Password</Label>
                                                <div className="mt-1 relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <Input
                                                        type="password"
                                                        value={input.password}
                                                        name="password"
                                                        onChange={changeEventHandler}
                                                        placeholder="••••••••"
                                                        className="pl-10"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium">I am a</Label>
                                                <RadioGroup className="flex items-center gap-4 mt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            type="radio"
                                                            name="role"
                                                            value="student"
                                                            checked={input.role === 'student'}
                                                            onChange={changeEventHandler}
                                                            className="cursor-pointer"
                                                            required
                                                        />
                                                        <Label htmlFor="r1">Student</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            type="radio"
                                                            name="role"
                                                            value="recruiter"
                                                            checked={input.role === 'recruiter'}
                                                            onChange={changeEventHandler}
                                                            className="cursor-pointer"
                                                        />
                                                        <Label htmlFor="r2">Recruiter</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            {loading ? (
                                                <Button className="w-full" disabled>
                                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                    Please wait
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    className="w-full bg-primary hover:bg-primary/90"
                                                >
                                                    Sign In
                                                </Button>
                                            )}
                                        </div>
                                    </form>

                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Don&apos;t have an account?{' '}
                                            <Link to="/signup" className="font-medium text-primary hover:text-primary/90 transition-colors">
                                                Sign up now
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default Login