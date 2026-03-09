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
import { setLoading } from '@/redux/authSlice'
import { Loader2, UserPlus, Mail, KeyRound, Phone, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '../ui/page-transition'
import LottieAnimation from '../ui/lottie-animation'
import BackgroundPattern from '../ui/background-pattern'
import authAnimation from '../../assets/lottie/authentication.json'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await api.post(`/api/user/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
            });
            if (res.data.success) {
                navigate("/login");
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
                                <h1 className="text-3xl font-bold mb-4 text-center md:text-left">Create Your Account</h1>
                                <p className="text-muted-foreground text-center md:text-left mb-6">
                                    Join our platform to discover exciting job opportunities and advance your career.
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
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                                                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                                                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Build Your Professional Profile</h3>
                                            <p className="text-sm text-muted-foreground">Create a comprehensive profile to showcase your skills and experience to potential employers.</p>
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
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="9" cy="7" r="4"></circle>
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Connect with Employers</h3>
                                            <p className="text-sm text-muted-foreground">Directly interact with top companies and recruiters looking for talent like you.</p>
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
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Personalized Job Matches</h3>
                                            <p className="text-sm text-muted-foreground">Get tailored job recommendations based on your skills, experience, and preferences.</p>
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
                                        <UserPlus className="mr-2 h-5 w-5 text-primary" />
                                        Sign Up
                                    </h2>

                                    <form onSubmit={submitHandler}>
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="text-sm font-medium">Full Name</Label>
                                                <div className="mt-1 relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        value={input.fullname}
                                                        name="fullname"
                                                        onChange={changeEventHandler}
                                                        placeholder="John Doe"
                                                        className="pl-10"
                                                        required
                                                    />
                                                </div>
                                            </div>

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
                                                <Label className="text-sm font-medium">Phone Number</Label>
                                                <div className="mt-1 relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        value={input.phoneNumber}
                                                        name="phoneNumber"
                                                        onChange={changeEventHandler}
                                                        placeholder="8080808080"
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

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                                <div>
                                                    <Label className="text-sm font-medium">Profile Photo</Label>
                                                    <div className="mt-1 relative">
                                                        <div className="flex items-center">
                                                            <div className="relative">
                                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                                                </div>
                                                                <Input
                                                                    accept="image/*"
                                                                    type="file"
                                                                    onChange={changeFileHandler}
                                                                    className="cursor-pointer pl-10"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    Create Account
                                                </Button>
                                            )}
                                        </div>
                                    </form>

                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Already have an account?{' '}
                                            <Link to="/login" className="font-medium text-primary hover:text-primary/90 transition-colors">
                                                Sign in
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

export default Signup