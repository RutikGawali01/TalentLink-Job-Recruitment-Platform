import { Badge, useMantineTheme, Tabs } from "@mantine/core";
import JobDescr from "../JobDesc/JobDescr";
import TalentCards from "../FindTalent/TalentCards";
import { talents } from "../assets/Data/TalentData";

const PostedJobDesc = (props) => {
  const theme = useMantineTheme();
  return (

    <div className="mt-5 w-3/4 px-5 ">
      {props.jobTitle? <>
        <div className="text-2xl font-semibold flex items-center ">
        {props.jobTitle}
        <Badge size="sm" variant="light" color={theme.colors.brightSun[4]}>
          {props.jobStatus}
        </Badge>
      </div>

      <div className="font-medium text-mine-shaft-300">{props.location}</div>
      <div>
        <Tabs defaultValue="overview" variant="outline" radius="lg">
          <Tabs.List
            className="[&_button]:!text-lg font-semibold 
                    [&_button[data-active='true']]:!text-bright-sun-400 mb-5"
          >
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="applicants"> Applicants</Tabs.Tab>
            <Tabs.Tab value="invited"> Invited</Tabs.Tab>
            <Tabs.Tab value="Offered"> Offered</Tabs.Tab>
            <Tabs.Tab value="Rejected"> Rejected</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" className="[&>div]:w-full">
            <JobDescr edit {...props} />
          </Tabs.Panel>
          <Tabs.Panel value="applicants">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {props.applicants
                ?.filter((x) => x.applicationStatus == "APPLIED")
                .map(
                  (talent, index) =>
                    index < 6 && <TalentCards key={index} {...talent} posted={true}/>
                )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="invited">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {props.applicants
                ?.filter((x) => x.applicationStatus == "INTERVIEWING")
                .map(
                  (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} invited={true} />
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Offered">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {props.applicants
                ?.filter((x) => x.applicationStatus == "OFFERED")
                .map(
                  (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} offered={true} />
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Rejected">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {props.applicants
                ?.filter((x) => x.applicationStatus == "REJECTED")
                .map(
                  (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} rejected ={true} />
              )}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
      </>
      : <div className="text-2xl min-h-[70vh] font-semibold flex justify-center items-center"> No Job Selected </div>
      }
    </div>
  );
};

export default PostedJobDesc;
