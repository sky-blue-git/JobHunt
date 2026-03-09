import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import FeaturesSection from "./FeaturesSection";
import LatestJobs from "./LatestJobs";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "./ui/page-transition";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  console.log("user : ", user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <PageTransition>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <FeaturesSection />
      <LatestJobs />
      <TestimonialsSection />
      <Footer />
    </PageTransition>
  );
};

export default Home;
