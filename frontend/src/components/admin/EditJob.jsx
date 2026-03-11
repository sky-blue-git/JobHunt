import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import api from '@/api/axios'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2, ArrowLeft } from 'lucide-react'

// Shared component for both creating and editing a job.
// Detects mode via the `id` URL param:
//   /admin/jobs/create     → no id → create mode  → POST /api/job/post
//   /admin/jobs/:id/edit   → has id → edit mode   → PUT  /api/job/update/:id
const JobForm = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);

    // Pre-fill form when in edit mode
    useEffect(() => {
        if (!isEditMode) return;
        const fetchJob = async () => {
            try {
                const res = await api.get(`/api/job/get/${id}`);
                if (res.data.success) {
                    const job = res.data.job;
                    setInput({
                        title: job.title || '',
                        description: job.description || '',
                        requirements: Array.isArray(job.requirements)
                            ? job.requirements.join(', ')
                            : job.requirements || '',
                        salary: job.salary?.toString() || '',
                        location: job.location || '',
                        jobType: job.jobType || '',
                        experience: job.experienceLevel?.toString() || '',
                        position: job.position || 0,
                        companyId: job.company?._id || job.company || '',
                    });
                }
            } catch {
                toast.error('Failed to load job details');
            } finally {
                setFetching(false);
            }
        };
        fetchJob();
    }, [id, isEditMode]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(c => c.name.toLowerCase() === value);
        if (selectedCompany) setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = isEditMode
                ? await api.put(`/api/job/update/${id}`, input, { headers: { 'Content-Type': 'application/json' } })
                : await api.post(`/api/job/post`, input, { headers: { 'Content-Type': 'application/json' } });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div>
                <Navbar />
                <div className='flex items-center justify-center h-[60vh]'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md'>

                    {/* Header */}
                    <div className='flex items-center gap-3 mb-6'>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => navigate('/admin/jobs')}
                        >
                            <ArrowLeft className='h-4 w-4' />
                        </Button>
                        <h1 className='text-xl font-bold'>
                            {isEditMode ? 'Edit Job' : 'Post New Job'}
                        </h1>
                    </div>

                    {/* Fields */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Requirements (comma separated)</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Salary (LPA)</Label>
                            <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Experience Level (years)</Label>
                            <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" min="0" />
                        </div>
                        <div>
                            <Label>No. of Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label>Company</Label>
                                <Select
                                    onValueChange={selectChangeHandler}
                                    defaultValue={companies.find(c => c._id === input.companyId)?.name?.toLowerCase() || ''}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Warning if no companies in create mode */}
                    {companies.length === 0 && !isEditMode && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first, before posting a job
                        </p>
                    )}

                    {/* Submit button */}
                    {loading
                        ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
                        : <Button type="submit" className="w-full my-4">
                            {isEditMode ? 'Save Changes' : 'Post New Job'}
                        </Button>
                    }
                </form>
            </div>
        </div>
    );
};

export default JobForm;
