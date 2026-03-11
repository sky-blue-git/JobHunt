import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};
// student k liye
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // Split the search query into individual words
    const keywords = keyword.trim() ? keyword.split(/\s+/) : [""];

    // Build an $and array where EACH word must be found in either title, description, or location
    const andConditions = keywords.map((word) => {
      let regexStr = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Flexibly match variations of industry keywords
      if (regexStr.toLowerCase() === "fullstack") {
        regexStr = "full\\s*stack";
      } else if (regexStr.toLowerCase() === "frontend") {
        regexStr = "front\\s*end";
      } else if (regexStr.toLowerCase() === "backend") {
        regexStr = "back\\s*end";
      }

      return {
        $or: [
          { title: { $regex: regexStr, $options: "i" } },
          { description: { $regex: regexStr, $options: "i" } },
          { location: { $regex: regexStr, $options: "i" } },
        ],
      };
    });

    const query = keyword.trim() ? { $and: andConditions } : {};

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};

// admin can delete a job they created
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }

    // Only the recruiter who created the job can delete it
    if (job.created_by.toString() !== userId) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to delete this job.",
          success: false,
        });
    }

    await Job.findByIdAndDelete(jobId);

    return res
      .status(200)
      .json({ message: "Job deleted successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};

// recruiter can update a job they created
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }

    if (job.created_by.toString() !== userId) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to edit this job.",
          success: false,
        });
    }

    if (title) job.title = title;
    if (description) job.description = description;
    if (requirements)
      job.requirements = requirements.split(",").map((r) => r.trim());
    if (salary) job.salary = Number(salary);
    if (location) job.location = location;
    if (jobType) job.jobType = jobType;
    if (experience) job.experienceLevel = Number(experience);
    if (position) job.position = Number(position);
    if (companyId) job.company = companyId;

    await job.save();

    return res
      .status(200)
      .json({ message: "Job updated successfully.", job, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};
