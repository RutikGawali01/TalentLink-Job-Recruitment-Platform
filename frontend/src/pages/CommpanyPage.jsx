import { Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { Button, useMantineTheme } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies"

const CommpanyPage = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      {/* <Link className="my-5 inline-block" to= "/find-talent">
          <Button leftSection={<IconArrowLeft size={20}  />} color={theme.colors.brightSun[4]}  variant='light' >Back </Button>
        </Link> */}
      {/* // navigate(-1) previews page, -2 prev previews page  */}
      
      <Button
        my="md"
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        color={theme.colors.brightSun[4]}
        variant="light"
      >
        Back{" "}
      </Button>

      <div className="flex gap-5 justify-between">
            <Company />
            <SimilarCompanies />
      </div>
    </div>
  );
};

export default CommpanyPage;
