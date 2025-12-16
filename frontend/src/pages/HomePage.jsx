
import DreamJob from "../LandingPage/DreamJob.jsx";
import Companies from "../LandingPage/CompaniesPage.jsx";
import JobCategory from "../LandingPage/JobCategory.jsx";
import Working from "../LandingPage/Working.jsx";
import Testimonials from "../LandingPage/Testimonials.jsx";
import Subscribe from "../LandingPage/Subscribe.jsx";


const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      
      <DreamJob />
      <Companies />
      <JobCategory />
      <Working />
      <Testimonials />
      <Subscribe />
      
    </div>
    
    
  )
}

export default HomePage
