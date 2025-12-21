import { companyData } from "../assets/Data/Company";

const About = () => {
  const company = companyData;

  return (
    <div className="flex flex-col gap-5">
      {Object.keys(company)
        .filter((key) => key !== "Name")
        .map((key, index) => (
          <div key={index}>
            <div className="text-xl mb-3 font-semibold">{key}</div>

            {/* If value is an array */}
            {Array.isArray(company[key]) ? (
              <ul className="list-disc pl-5 text-sm text-mine-shaft-300">
                {company[key].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : key === "Website" ? (
              /* Website link */
              <a
                href={company[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bright-sun-400"
              >
                {company[key]}
              </a>
            ) : (
              /* Normal text */
              <div className="text-sm text-mine-shaft-300 text-justify">
                {company[key]}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default About;
