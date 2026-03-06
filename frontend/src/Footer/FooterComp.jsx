import {
  IconAnchor,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import {footerLinks} from "../assets/Data/Data";
import {useLocation} from "react-router-dom";

const FooterComp = () => {
  const location = useLocation();
  return (
    location.pathname != "/signup" && 
    location.pathname != "/login" && 
    <div className="pt-20 pb-5 flex flex-wrap gap-8 justify-around bg-[var(--blue-100)] font-['poppins] ">
      
      <div className="w-1/4 max-[640px]:w-1/3 max-[475px]:w-1/2 max-[350px]:w-full flex flex-col gap-4 ">

        <div className="flex gap-1 items-center text-bright-sun-400">
          <IconAnchor className="h-6 w-6 " stroke={2.25} />
          <div className="text-xl font-semibold">HireFlow</div>
        </div>
        <div className="text-sm text-mine-shaft-300 ">
          Job portal with user profiles, skill updates, certifications, work
          experience and admin job postings.
        </div>
        <div
          className="flex gap-3 text-bright-sun-400 
            [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer
            [&>div]:hover:bg-mine-shaft-800"
        >
          <div>
            <IconBrandFacebook />
          </div>
          <div>
            <IconBrandInstagram />
          </div>
          <div>
            <IconBrandX />
          </div>
        </div>
      </div>

        {
            footerLinks.map((item,index) => 
                <div key={index} className="">
                    <div className="text-lg font-semibold mb-4 text-[var(--blue-500)]">{item.title}</div>
                    {
                        item.links.map((link, index) => 
                        <div key={index} className="text-primary text-sm 
                        hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">
                            {link}
                        </div> )
                    }
                </div>
            )

        }

    </div>
  );
};

export default FooterComp;
