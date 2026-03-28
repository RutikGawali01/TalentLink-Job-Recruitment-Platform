import {
  IconWorld,
  IconBrandLinkedin,
  IconBrandGithub,
  IconLink,
} from "@tabler/icons-react";


/* ─────────────── PortfolioLinks ─────────────── */
const LinkCard = ({ Icon, label, url }) => {
  const formattedUrl =
    url?.startsWith("http://") || url?.startsWith("https://")
      ? url
      : `https://${url}`;

  return (
    <a
      href={formattedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/40 to-white hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
    >
      <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors duration-200">
        <Icon className="text-blue-600" size={18} />
      </div>

      <div className="min-w-0">
        <div className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
          {label}
        </div>
        <div className="text-sm font-medium text-slate-800 truncate">
          {url}
        </div>
      </div>
    </a>
  );
};


const PortfolioLinksView = ({ portfolio }) => {
  if (!portfolio?.website && !portfolio?.linkedin && !portfolio?.github && !portfolio?.other) {
    return <p className="text-sm text-slate-400 italic">No portfolio links added yet</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {portfolio?.website && <LinkCard Icon={IconWorld} label="WEBSITE" url={portfolio.website} />}
      {portfolio?.linkedin && <LinkCard Icon={IconBrandLinkedin} label="LINKEDIN" url={portfolio.linkedin} />}
      {portfolio?.github && <LinkCard Icon={IconBrandGithub} label="GITHUB" url={portfolio.github} />}
      {portfolio?.other && <LinkCard Icon={IconLink} label="OTHER" url={portfolio.other} />}
    </div>
  );
};
export { PortfolioLinksView };