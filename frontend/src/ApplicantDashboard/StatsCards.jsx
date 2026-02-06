import { Card } from "@mantine/core";
import {
  IconFileText,
  IconEye,
  IconHeart,
  IconCalendar,
} from "@tabler/icons-react";

const stats = [
  { label: "Applications", value: 1, icon: IconFileText },
  { label: "Profile Views", value: 45, icon: IconEye },
  { label: "Saved Jobs", value: 2, icon: IconHeart },
  { label: "Interviews", value: 2, icon: IconCalendar },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} withBorder padding="lg" radius="md">
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

