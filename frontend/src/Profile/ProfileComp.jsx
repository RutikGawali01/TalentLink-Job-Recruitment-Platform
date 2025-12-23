import { useState } from "react";
import { IconMapPin,IconBriefcase, IconPencil, IconPlus, IconDeviceFloppy,} from "@tabler/icons-react";
import {Divider,Avatar, useMantineTheme, ActionIcon,Textarea, TagsInput} from "@mantine/core";
import ExperienceCard from "./ExperienceCard";
import CertificationCard from "./CertificationCard";
import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";
import ExpInput from "./ExpInput"
import CertiInput from "./CertiInput";

const ProfileComp = (props) => {
  const[skills, setSkills] = useState(["React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS"]);
  const [about, setAbout] = useState(`${props.about}`);
  const select = fields;
  const [addExp , setAddExp]  = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const [edit, setEdit] = useState([
    "false",
    "false",
    "false",
    "false",
    "false",
  ]);
  const handleEdit = (index) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
    //console.log(edit);
  };
  const theme = useMantineTheme();
  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="h-48 w-48 absolute -bottom-1/3 left-3  rounded-full border-mine-shaft-950 border-8 "
          src="/avatar.png"
          alt=""
        />
      </div>

      <div className="px-3 mt-19  ">
        <div className="text-3xl font-semibold flex justify-between ">
          {" "}
          {props.name}
          <ActionIcon
            size="lg"
            variant="subtle"
            color={theme.colors.brightSun[4]}
            onClick={() => handleEdit(0)}
          >
            {edit[0] ? (
              <IconPencil className="h-4/5 w-4/5 " />
            ) : (
              <IconDeviceFloppy className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
        </div>
        {edit[0] ? (
          <>
            {" "}
            <div className="text-xl flex gap-1 items-center ">
              {" "}
              <IconBriefcase className="h-5 w-5" stroke={1.5} />
              {props.role} &bull; {props.company}
            </div>
            <div className="text-lg flex gap-1 items-center text-mine-shaft-300 ">
              <IconMapPin className="h-5 w-5" stroke={1.5} /> {props.location}
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <div className=" flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />{" "}
          </>
        )}
      </div>

      <Divider mx="xs" my="xl" />

      <div className="px-3 ">
        <div className=" text-2xl font-semibold mb-3 flex justify-between ">
          about{" "}
          <ActionIcon
            size="lg"
            variant="subtle"
            color={theme.colors.brightSun[4]}
            onClick={() => handleEdit(1)}
          >
            {edit[1] ? (
              <IconPencil className="h-4/5 w-4/5 " />
            ) : (
              <IconDeviceFloppy className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
        </div>
        {
          !edit[1] ? <Textarea
          value={about} autosize minRows={3} placeholder="Enter about yourself "
          onChange={(event) => setAbout(event.currentTarget.value)}
        /> : <div className="text-sm text-mine-shaft-300 text-justify">
          {props.about}
        </div>
        }
        

        
      </div> 

      <Divider mx="xs" my="xl" />

      <div className="">
        <div className=" text-2xl font-semibold mb-3 flex justify-between ">
          skills{" "}
          <ActionIcon
            size="lg"
            variant="subtle"
            color={theme.colors.brightSun[4]}
            onClick={() => handleEdit(2)}
          >
            {edit[2] ? (
              <IconPencil className="h-4/5 w-4/5 " />
            ) : (
              <IconDeviceFloppy className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
        </div>
        {
          !edit[2] ? <TagsInput value={skills} onChange={setSkills}  placeholder="add skills" splitChars={[',', ' ','|']} /> 
          : <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className=" font-medium bg-mine-shaft-900 text-sm  bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
        }
        

        

        {/* <div className='flex flex-wrap gap-2'>
                <div className=' font-medium bg-mine-shaft-900 text-sm  bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'>
                    React</div>

            </div> */}
      </div>

      <Divider mx="xs" my="xl" />
      <div className="px-3 ">
        <div className=" text-2xl font-semibold mb-5 flex justify-between">
          Experience{" "}
          <div className="flex gap-2 ">
            <ActionIcon  size="lg"  variant="subtle" color={theme.colors.brightSun[4]}  onClick={() => setAddExp(true)}>
              <IconPlus className="h-4/5 w-4/5 " />
            </ActionIcon>
          <ActionIcon  size="lg"  variant="subtle" color={theme.colors.brightSun[4]}  onClick={() => handleEdit(3)}>
            {edit[3] ? (
              <IconPencil className="h-4/5 w-4/5 " />
            ) : (
              <IconDeviceFloppy className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {props.experience.map((exp, index) => (
            <ExperienceCard key={index} {...exp} edit = {edit[3]} />
          ))}
          {addExp &&<ExpInput add   setEdit = {setAddExp}/>}
        </div>
      </div>

      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className=" text-2xl font-semibold mb-4 flex justify-between">
          Certifications{" "}
          <div className="flex gap-2">
          <ActionIcon  size="lg"  variant="subtle" color={theme.colors.brightSun[4]}  onClick={() => setAddCerti(true)}>
              <IconPlus className="h-4/5 w-4/5 " />
            </ActionIcon>
          <ActionIcon  size="lg"  variant="subtle" color={theme.colors.brightSun[4]}  onClick={() => handleEdit(4)}>
            {edit[4] ? (
              <IconPencil className="h-4/5 w-4/5 " />
            ) : (
              <IconDeviceFloppy className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
        </div>
        </div>
        <div className="flex flex-col gap-8">
          {props.certifications.map((certif, index) => (
            <CertificationCard key={index} {...certif} edit ={edit[4]} />
          ))}
          {
            addCerti && <CertiInput  add  setEdit = {setAddCerti}/>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
