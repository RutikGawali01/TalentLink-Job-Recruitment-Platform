import { Button, useMantineTheme } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";

const ApplyJobPage = () => {
  const theme = useMantineTheme();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link className="my-5 inline-block" to="/jobs">
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color={theme.colors.brightSun[4]}
          variant="light"
        >
          Back{" "}
        </Button>
      </Link>
      <ApplyJobComp />
    </div>
  );
};

export default ApplyJobPage;
