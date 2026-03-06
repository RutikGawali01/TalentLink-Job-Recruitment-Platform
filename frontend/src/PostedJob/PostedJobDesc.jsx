import { Badge, useMantineTheme, Tabs } from "@mantine/core";
import JobDescr from "../JobDesc/JobDescr";
import TalentCards from "../FindTalent/TalentCards";
import { useState, useEffect } from "react";

// in props  job is coming from posted jobs page
const PostedJobDesc = (props) => {
  const theme = useMantineTheme();
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState([]); // arr contains all applicants of this particular job

  // console.log(props);

  const handleTabChange = (value) => {
    setTab(value);

    if (!props.applicants) return;

    if (value === "overview") {
      setArr(props.applicants); // show all
    } else if (value === "applicants") {
      setArr(props.applicants.filter((x) => x.applicationStatus === "APPLIED"));
    } else if (value === "invited") {
      setArr(
        props.applicants.filter((x) => x.applicationStatus === "INTERVIEWING"),
      );
    } else if (value === "offered") {
      setArr(props.applicants.filter((x) => x.applicationStatus === "OFFERED"));
    } else if (value === "rejected") {
      setArr(
        props.applicants.filter((x) => x.applicationStatus === "REJECTED"),
      );
    }
  };
  useEffect(() => {
    if (props.applicants) {
      handleTabChange("overview");
    }
  }, [props.applicants]);
  return (
    <div className="mt-5 w-full lg:w-3/4 px-3 sm:px-5">
      {props.jobTitle ? (
        <>
          {/* ================= HEADER ================= */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xl sm:text-2xl font-semibold">
              {props.jobTitle}
            </div>

            <Badge size="sm" variant="light" color={"brand.4"}>
              {props.jobStatus}
            </Badge>
          </div>

          <div className="font-medium text-mine-shaft-300 text-sm sm:text-base mt-1">
            {props.location}
          </div>

          {/* ================= TABS ================= */}
          <div className="mt-6">
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="outline"
              radius="lg"
            >
              <Tabs.List
                className="
                overflow-x-auto
                whitespace-nowrap
                [&_button]:!text-sm sm:[&_button]:!text-lg
                font-semibold
                [&_button[data-active='true']]:!text-bright-sun-400
                mb-5
              "
              >
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="Offered">Offered</Tabs.Tab>
                <Tabs.Tab value="Rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              {/* ================= OVERVIEW ================= */}
              <Tabs.Panel value="overview" className="[&>div]:w-full">
                <JobDescr
                  edit={true}
                  {...props}
                  closed={props.jobStatus == "CLOSED"}
                />
              </Tabs.Panel>

              {/* ================= APPLICANTS ================= */}
              <Tabs.Panel value="applicants">
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {arr?.length ? (
                    arr.map(
                      (talent, index) =>
                        index < 6 && (
                          <TalentCards key={index} {...talent} posted={true} />
                        ),
                    )
                  ) : (
                    <div className="text-lg sm:text-2xl font-semibold col-span-full text-center">
                      No Applicants
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              {/* ================= INVITED ================= */}
              <Tabs.Panel value="invited">
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {arr?.length ? (
                    arr.map(
                      (talent, index) =>
                        index < 6 && (
                          <TalentCards key={index} {...talent} invited={true} />
                        ),
                    )
                  ) : (
                    <div className="text-lg sm:text-2xl font-semibold col-span-full text-center">
                      No Invited Candidates
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              {/* ================= OFFERED ================= */}
              <Tabs.Panel value="Offered">
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {arr?.length ? (
                    arr.map(
                      (talent, index) =>
                        index < 6 && (
                          <TalentCards key={index} {...talent} offered={true} />
                        ),
                    )
                  ) : (
                    <div className="text-lg sm:text-2xl font-semibold col-span-full text-center">
                      No Offered Candidates
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              {/* ================= REJECTED ================= */}
              <Tabs.Panel value="Rejected">
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {arr?.length ? (
                    arr.map(
                      (talent, index) =>
                        index < 6 && (
                          <TalentCards
                            key={index}
                            {...talent}
                            rejected={true}
                          />
                        ),
                    )
                  ) : (
                    <div className="text-lg sm:text-2xl font-semibold col-span-full text-center">
                      No Rejected Candidates
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-xl sm:text-2xl min-h-[60vh] font-semibold flex justify-center items-center text-center px-4">
          No Job Selected
        </div>
      )}
    </div>
  );
};

export default PostedJobDesc;
