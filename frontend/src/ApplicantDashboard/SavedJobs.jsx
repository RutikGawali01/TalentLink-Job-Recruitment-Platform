import { Card, Avatar, Button } from "@mantine/core";

const SavedJobs = () => {
  return (
    <Card withBorder radius="md" padding="lg">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Saved Jobs</h2>
          <p className="text-sm text-gray-500">
            Jobs you've bookmarked
          </p>
        </div>
        <Button variant="outline" size="xs">View All</Button>
      </div>

      {["Senior Frontend Developer", "Full Stack Engineer"].map((job, i) => (
        <div key={i} className="flex justify-between items-center border rounded-lg p-4 mb-3">
          <div className="flex items-center gap-3">
            <Avatar color={i === 0 ? "blue" : "green"}>
              {i === 0 ? "TC" : "SX"}
            </Avatar>
            <div>
              <p className="font-medium">{job}</p>
              <p className="text-sm text-gray-500">
                {i === 0 ? "TechCorp Solutions" : "StartupXYZ"}
              </p>
            </div>
          </div>
          <Button size="xs">Apply</Button>
        </div>
      ))}
    </Card>
  );
};

export default SavedJobs;
