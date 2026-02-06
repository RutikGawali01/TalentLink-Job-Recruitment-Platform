import {
  IconWorld,
  IconBrandLinkedin,
  IconBrandGithub,
  IconLink,
} from "@tabler/icons-react";

const LinkCard = ({ Icon, label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
  >
    <Icon className="text-slate-700" size={22} />
    <div className="min-w-0">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-medium text-slate-900 truncate">
        {url}
      </div>
    </div>
  </a>
);

const PortfolioLinksView = ({ portfolio }) => {
  if (
    !portfolio?.website &&
    !portfolio?.linkedin &&
    !portfolio?.github &&
    !portfolio?.other
  ) {
    return (
      <p className="text-sm text-slate-400">
        No portfolio links added yet
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {portfolio?.website && (
        <LinkCard
          Icon={IconWorld}
          label="WEBSITE"
          url={portfolio.website}
        />
      )}

      {portfolio?.linkedin && (
        <LinkCard
          Icon={IconBrandLinkedin}
          label="LINKEDIN"
          url={portfolio.linkedin}
        />
      )}

      {portfolio?.github && (
        <LinkCard
          Icon={IconBrandGithub}
          label="GITHUB"
          url={portfolio.github}
        />
      )}

      {portfolio?.other && (
        <LinkCard
          Icon={IconLink}
          label="OTHER"
          url={portfolio.other}
        />
      )}
    </div>
  );
};

export { PortfolioLinksView };
