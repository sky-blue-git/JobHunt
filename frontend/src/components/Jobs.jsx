import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  useGetAllJobs();
  useGetAppliedJobs(); // Fetch user's applied jobs so Job cards can show correct state
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const searchLower = searchedQuery.toLowerCase();
        const titleLower = job?.title?.toLowerCase() || "";
        const descLower = job?.description?.toLowerCase() || "";
        const locLower = job?.location?.toLowerCase() || "";

        // Salary Filter numerical matching logic
        const salaryMatch = searchLower.match(/^(\d+)-(\d+)$/);
        if (salaryMatch) {
          const min = parseInt(salaryMatch[1], 10);
          const max = parseInt(salaryMatch[2], 10);
          const jobSalary = Number(job?.salary);

          if (!isNaN(jobSalary)) {
            const meetsMin = min === 0 ? jobSalary >= 0 : jobSalary > min;
            const meetsMax = jobSalary <= max;

            if (meetsMin && meetsMax) {
              return true;
            }
          }
          return false;
        }

        // Industry Filter strict matching logic requested by user
        if (["frontend", "backend", "fullstack"].includes(searchLower)) {
          const isFullStack =
            titleLower.includes("fullstack") ||
            titleLower.includes("full stack") ||
            descLower.includes("fullstack") ||
            descLower.includes("full stack");
          const isBackend =
            titleLower.includes("backend") ||
            titleLower.includes("back end") ||
            descLower.includes("backend") ||
            descLower.includes("back end");
          const isFrontend =
            titleLower.includes("frontend") ||
            titleLower.includes("front end") ||
            descLower.includes("frontend") ||
            descLower.includes("front end");

          if (isFullStack && searchLower === "fullstack") return true;
          if (isFullStack && searchLower !== "fullstack") return false;

          if (isBackend && searchLower === "backend") return true;
          if (isBackend && searchLower !== "backend") return false;

          if (isFrontend && searchLower === "frontend") return true;

          return false;
        }

        const searchWords = searchLower
          .split(/\s+/)
          .filter((word) => word.length > 0);
        const matchesAllWords = searchWords.every((word) => {
          const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regex = new RegExp(safeWord, "i");

          return (
            regex.test(titleLower) ||
            regex.test(descLower) ||
            regex.test(locLower)
          );
        });

        return matchesAllWords;
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <FilterCard />
          </div>

          {/* Mobile Filter Toggle - Only shown on mobile */}
          <div className="lg:hidden mb-4">
            <FilterCard />
          </div>

          {/* Jobs Grid */}
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground">
                  No jobs found
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search criteria
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-[70vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                    className="w-full"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
