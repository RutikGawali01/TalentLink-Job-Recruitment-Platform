import {
  IconAnchor,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { footerLinks } from "../assets/Data/Data";
import { useLocation } from "react-router-dom";

const FooterComp = () => {
  const location = useLocation();

  if (location.pathname === "/signup" || location.pathname === "/login")
    return null;

  return (
    <footer className="bg-slate-900 px-4 sm:px-8 lg:px-10 pt-14 pb-8 border-t border-white/5 mt-auto">

      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid gap-12 mb-12
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4">

          {/* Logo + Description */}
          <div>

            <div className="flex items-center gap-2.5 mb-4">

              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white">
                <IconAnchor size={18} />
              </div>

              <span className="text-xl font-extrabold text-white tracking-tight">
                Hire<span className="text-blue-400">Flow</span>
              </span>

            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Job portal with user profiles, skill updates, certifications,
              work experience and admin job postings.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">

              <div className="bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-slate-700 transition">
                <IconBrandFacebook size={18} className="text-white" />
              </div>

              <div className="bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-slate-700 transition">
                <IconBrandInstagram size={18} className="text-white" />
              </div>

              <div className="bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-slate-700 transition">
                <IconBrandX size={18} className="text-white" />
              </div>

            </div>

          </div>

          {/* Footer Links */}
          {footerLinks.map((item, index) => (
            <div key={index}>

              <div className="text-white font-bold text-sm mb-4">
                {item.title}
              </div>

              {item.links.map((link, i) => (
                <div
                  key={i}
                  className="text-slate-500 text-sm mb-2.5 cursor-pointer hover:text-white transition-colors"
                >
                  {link}
                </div>
              ))}

            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <div className="text-slate-600 text-xs text-center sm:text-left">
            © 2026 HireFlow. All rights reserved.
          </div>

          <div className="flex gap-6">

            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <span
                  key={item}
                  className="text-slate-600 text-xs cursor-pointer hover:text-slate-400 transition-colors"
                >
                  {item}
                </span>
              )
            )}

          </div>

        </div>

      </div>

    </footer>
  );
};

export default FooterComp;