import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedCard } from "./ui/animated-card";
import api from "@/api/axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import PropTypes from "prop-types";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs } = useSelector((store) => store.job);

  // Derive isApplied from allAppliedJobs in Redux.
  // allAppliedJobs is fetched via useGetAppliedJobs and contains
  // Application documents with a populated `job` field.
  // This is the reliable source of truth regardless of which page we're on.
  const isApplied =
    allAppliedJobs?.some(
      (application) => application.job?._id === job?._id
    ) ?? false;

  const applyJobHandler = async (e) => {
    e.stopPropagation(); // Prevent card click navigation
    try {
      const res = await api.get(`/api/application/apply/${job._id}`);

      if (res.data.success) {
        // Optimistically add a new application entry to Redux so isApplied
        // updates instantly without a full page reload.
        dispatch(setAllAppliedJobs([...allAppliedJobs, { job: { _id: job._id } }]));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply for job");
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <AnimatedCard
      onClick={() => navigate(`/description/${job?._id}`)}
      className="cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className={
            "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
          }
          variant="outline"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className={
            "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-medium"
          }
          variant="outline"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className={
            "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium"
          }
          variant="outline"
        >
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={applyJobHandler}
          className={`w-full ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
    </AnimatedCard>
  );
};

Job.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.string,
    jobType: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    createdAt: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
    }),
    applications: PropTypes.arrayOf(
      PropTypes.shape({
        applicant: PropTypes.string,
      }),
    ),
  }),
};

export default Job;
