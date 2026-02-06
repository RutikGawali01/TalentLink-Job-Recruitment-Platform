import { Button, Avatar } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const TopBar = () => {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Employer</p>
      </div>

      <div className="flex items-center gap-4">
        <Button leftSection={<IconPlus size={16} />}>
          Post a Job
        </Button>
        <Avatar color="blue" radius="xl">EM</Avatar>
      </div>
    </header>
  );
};

export default TopBar;
