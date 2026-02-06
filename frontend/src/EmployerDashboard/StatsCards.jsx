import { Card } from "@mantine/core";
import {
  IconBriefcase,
  IconFileText,
  IconEye,
  IconUsers,
} from "@tabler/icons-react";

const stats = [
  { label: "Active Jobs", value: 1, icon: IconBriefcase },
  { label: "Total Applications", value: 1, icon: IconFileText },
  { label: "Views This Week", value: 342, icon: IconEye },
  { label: "Interviews Scheduled", value: 5, icon: IconUsers },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} padding="lg" radius="md" withBorder>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
            <stat.icon className="text-blue-600" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
