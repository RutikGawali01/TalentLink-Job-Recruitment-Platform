import { IconBriefcase, IconBuilding, IconMapPin } from "@tabler/icons-react";

const fields = [
  {
    label: "Headline",
    placeholder: "Enter Short headline",
    options: [
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer"
    ],
    leftSection: IconBriefcase
  },
  {
    label: "Company",
    placeholder: "Enter Company",
    options: [
      "Google",
      "Microsoft",
      "Amazon",
      "Meta",
      "Apple"
    ],
    leftSection: IconBuilding
  },
  {
    label: "Location",
    placeholder: "Enter Your Location",
    options: [
      "Pune",
      "Mumbai",
      "Bangalore",
      "Delhi",
      "Hyderabad"
    ],
    leftSection: IconMapPin
  }
];

export default fields;