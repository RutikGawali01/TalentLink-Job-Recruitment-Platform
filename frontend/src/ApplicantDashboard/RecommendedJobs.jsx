import { Card, Avatar, Badge, Button } from "@mantine/core";
import { IconMapPin, IconClock } from "@tabler/icons-react";

const RecommendedJobs = () => {
  return (
    <Card withBorder radius="md" padding="lg">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Recommended for You</h2>
          <p className="text-sm text-gray-500">
            Jobs matching your profile
          </p>
        </div>
        <Button variant="outline" size="xs">See More</Button>
      </div>

      {jobs.map((job, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 flex justify-between">
          <div className="flex gap-4">
            <Avatar color={job.color}>{job.initials}</Avatar>
            <div>
              <p className="font-semibold">{job.title}</p>
              <p className="text-sm text-gray-500">{job.company}</p>

              <div className="flex gap-4 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <IconMapPin size={14} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <IconClock size={14} /> about 2 years ago
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                {job.skills.map(skill => (
                  <Badge key={skill} variant="light">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button size="xs">Quick Apply</Button>
        </div>
      ))}
    </Card>
  );
};

const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    initials: "TC",
    color: "blue",
  },
  {
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    skills: ["Node.js", "React", "PostgreSQL"],
    initials: "SX",
    color: "green",
  },
];

export default RecommendedJobs;
