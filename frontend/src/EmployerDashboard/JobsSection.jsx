import { Card, Badge, Button } from "@mantine/core";

const JobsSection = () => {
  return (
    <Card withBorder radius="md" padding="lg">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Your Jobs</h2>
          <p className="text-sm text-gray-500">Manage your job postings</p>
        </div>
        <Button variant="outline">View All</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Badge color="blue">Active (1)</Badge>
        <Badge color="gray">Drafts (1)</Badge>
        <Badge color="gray">Closed (0)</Badge>
      </div>

      <div className="border rounded-lg p-4 flex justify-between">
        <div>
          <h3 className="font-semibold">Senior Frontend Developer</h3>
          <p className="text-sm text-gray-500">
            24 applicants • Posted 15/01/2024
          </p>
        </div>
        <Badge color="green">Active</Badge>
      </div>
    </Card>
  );
};

export default JobsSection;
