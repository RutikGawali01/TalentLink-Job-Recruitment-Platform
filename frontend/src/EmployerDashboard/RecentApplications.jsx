import { Card, Avatar, Badge, Button } from "@mantine/core";

const RecentApplications = () => {
  return (
    <Card withBorder radius="md" padding="lg">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Recent Applications</h2>
          <p className="text-sm text-gray-500">
            Latest candidates for your jobs
          </p>
        </div>
        <Button variant="outline">View All</Button>
      </div>

      <div className="flex items-center justify-between border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Avatar color="blue">JD</Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">
              Applied for Senior Frontend Developer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge color="yellow">Reviewing</Badge>
          <Button size="xs" variant="outline">
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecentApplications;
