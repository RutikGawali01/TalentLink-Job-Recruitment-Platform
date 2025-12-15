import Header from "../Header/HeaderComp.jsx";
import DreamJob from "../LandingPage/DreamJob.jsx";
import Companies from "../LandingPage/CompaniesPage.jsx";
import JobCategory from "../LandingPage/JobCategory.jsx";
import Working from "../LandingPage/Working.jsx";
import Testimonials from "../LandingPage/Testimonials.jsx";
import Subscribe from "../LandingPage/Subscribe.jsx";
import FooterComp from "../Footer/FooterComp.jsx";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      <Header />
      <DreamJob />
      <Companies />
      <JobCategory />
      <Working />
      <Testimonials />
      <Subscribe />
      <FooterComp />
    </div>
    
    
  )
}

export default HomePage
