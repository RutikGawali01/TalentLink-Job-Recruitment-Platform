import React from "react";

const companies = [
  "Google",
  "Apple",
  "Stripe",
  "Figma",
  "Notion",
  "Linear",
  "Vercel",
  "Shopify",
  "Airbnb",
  "Spotify"
];

const companyEmojis = [
  "🔵",
  "⚫",
  "🟣",
  "🎨",
  "📋",
  "🔷",
  "▲",
  "🛍️",
  "🏡",
  "🎵"
];

const CompaniesPage = () => {
  return (
    <section className="py-14 bg-slate-50 border-t border-slate-200">

      {/* Heading */}

      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-widest mb-8">
        Trusted by world-class teams
      </p>

      {/* Marquee */}

      <div className="overflow-hidden">

        <div className="marquee-track flex w-max gap-4 px-2">

          {[...companies, ...companies].map((company, i) => (

            <div
              key={i}
              className="
              flex items-center gap-2.5
              px-6 py-3
              bg-white
              border border-slate-200
              rounded-xl
              font-bold
              text-slate-500
              text-sm
              cursor-pointer
              hover:border-blue-400
              hover:bg-blue-50
              transition-all
              whitespace-nowrap
              "
            >

              <span className="text-lg">
                {companyEmojis[i % companyEmojis.length]}
              </span>

              {company}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default CompaniesPage;