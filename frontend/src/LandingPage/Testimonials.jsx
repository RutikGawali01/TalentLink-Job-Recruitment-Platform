import React from "react";

/* Star Icon */
const StarIcon = ({ filled = true }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill={filled ? "#F59E0B" : "none"}
    stroke="#F59E0B"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* Avatar */
const Avatar = ({ name, colorClass, size = 40 }) => (
  <div
    className={`${colorClass} rounded-full flex items-center justify-center font-bold text-white`}
    style={{ width: size, height: size, fontSize: size * 0.35 }}
  >
    {name?.[0]?.toUpperCase()}
  </div>
);

/* Testimonials Data */
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer at Figma",
    text: "Found my dream role in 9 days. The quality of listings here is unmatched — no spam, just real opportunities.",
    rating: 5,
    colorClass: "bg-violet-600",
  },
  {
    name: "Marcus Johnson",
    role: "SWE at Google",
    text: "Applied to 4 jobs, got 3 interviews. The filters are incredibly precise. This is how job searching should feel.",
    rating: 5,
    colorClass: "bg-blue-600",
  },
  {
    name: "Priya Sharma",
    role: "Data Lead at Stripe",
    text: "The salary transparency alone made this worth it. Saved me so much time in negotiations.",
    rating: 5,
    colorClass: "bg-emerald-600",
  },
  {
    name: "Tom Erikson",
    role: "Head of Marketing, Linear",
    text: "Genuinely the best talent platform I've used in 10 years of hiring. High signal, zero noise.",
    rating: 4,
    colorClass: "bg-amber-600",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-10 bg-slate-50">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-4 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
            Social Proof
          </span>

          <h2
            className="serif text-3xl sm:text-4xl lg:text-5xl text-slate-900"
            style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Real stories from
            <br />
            <em className="text-blue-600">real people</em>
          </h2>

        </div>


        {/* Testimonials Grid */}
        <div className="grid gap-6
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4">

          {testimonials.map((t, i) => (

            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <StarIcon key={j} filled={j < t.rating} />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex gap-3 items-center border-t border-slate-100 pt-4">

                <Avatar
                  name={t.name}
                  colorClass={t.colorClass}
                  size={40}
                />

                <div>
                  <div className="font-bold text-sm text-slate-900">
                    {t.name}
                  </div>

                  <div className="text-xs text-slate-400">
                    {t.role}
                  </div>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;