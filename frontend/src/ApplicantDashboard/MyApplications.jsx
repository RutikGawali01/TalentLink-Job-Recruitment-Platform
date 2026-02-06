import { Card, Badge, Avatar, Button } from "@mantine/core";

const MyApplications = () => {
  return (
    <Card withBorder radius="md" padding="lg">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">My Applications</h2>
          <p className="text-sm text-gray-500">
            Track your job applications
          </p>
        </div>
        <Button variant="outline" size="xs">View All</Button>
      </div>

      <div className="flex items-center justify-between border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Avatar color="blue">TC</Avatar>
          <div>
            <p className="font-medium">Senior Frontend Developer</p>
            <p className="text-sm text-gray-500">TechCorp Solutions</p>
          </div>
        </div>
        <Badge color="yellow">Reviewing</Badge>
      </div>
    </Card>
  );
};

export default MyApplications;
