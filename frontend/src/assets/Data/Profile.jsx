import { IconBriefcase,  IconMapPin } from "@tabler/icons-react";

const fields=[
    {label:"Headline",placeholder:"Enter Short headline", options:['Full Stack Dev', 'Java Backend Dev', 'React Intern', 'AI Eng.', 'Data Scientist', 'Data Analyst', 'Devops Eng.', 'ML Eng.'],value:"Full Stack Dev.", leftSection:IconBriefcase},
    {label:"Location",placeholder:"Enter Your Location", options:['Delhi', 'Pune', 'Hydrabad', 'London', 'Mumbai', 'Tokyo', 'New York', ], value:"New York, United States",leftSection:IconMapPin}
]
export default fields;