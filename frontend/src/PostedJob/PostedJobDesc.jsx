import { Badge, useMantineTheme, Tabs } from "@mantine/core";
import JobDescr from "../JobDesc/JobDescr";
import TalentCards from "../FindTalent/TalentCards";
import {talents} from "../assets/Data/TalentData";


const PostedJobDesc = () => {
  const theme = useMantineTheme();
  return (
    <div className="mt-5 w-3/4 px-5 ">
      <div className="text-2xl font-semibold flex items-center ">
        {" "}
        Software Eng.
        <Badge size="sm" variant="light" color={theme.colors.brightSun[4]}>
          Badge{" "}
        </Badge>
      </div>

      <div className="font-medium text-mine-shaft-300">Pune, India</div>
      <div>
        <Tabs defaultValue="overview" variant="outline" radius="lg">
          <Tabs.List
            className="[&_button]:!text-lg font-semibold 
                    [&_button[data-active='true']]:!text-bright-sun-400 mb-5"
          >
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="applicants"> Applicants</Tabs.Tab>
            <Tabs.Tab value="invited"> Invited</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" className="[&>div]:w-full">
            <JobDescr edit />
          </Tabs.Panel>
          <Tabs.Panel value="applicants">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {talents.map(
                (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} posted />
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="invited">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {talents.map(
                (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} invited />
              )}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default PostedJobDesc;
