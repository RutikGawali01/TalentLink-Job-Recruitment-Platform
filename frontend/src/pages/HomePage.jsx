import DreamJob from "../LandingPage/DreamJob.jsx";
import Companies from "../LandingPage/CompaniesPage.jsx";
import JobCategory from "../LandingPage/JobCategory.jsx";
import Working from "../LandingPage/Working.jsx";
import Testimonials from "../LandingPage/Testimonials.jsx";
import Subscribe from "../LandingPage/Subscribe.jsx";
import { Divider } from "@mantine/core";
import FeaturedJobs from "../LandingPage/FeaturedJobs.jsx";
const HomePage = () => {
  return (
    
    <div className="min-h-screen font-['Poppins'] overflow-x-hidden">
      <section className="w-full">
        <DreamJob />
      </section>

      <section className="w-full">
        <Companies />
      </section>
      <Divider className="text-primary" />

      <section className="w-full ">
        <JobCategory />
      </section>
    <section className="w-full ">
        <FeaturedJobs />
      </section>


      <Divider className="text-primary" />

      <section className="w-full px-1 sm:px-8 lg:px-20 py-6">
        <Working />
      </section>
      <Divider className="text-primary" />
      

      <section className="w-full ">
        <Testimonials />
      </section>

      


      <section className="w-full ">
        <Subscribe />
      </section>
    </div>
  );
};

export default HomePage;
