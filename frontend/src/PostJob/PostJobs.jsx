import SelectInput from "./SelectInput";
import {TagsInput, Button, useMantineTheme,Textarea, NumberInput} from "@mantine/core";
import {fields, content} from "../assets/Data/PostJob";
import TextEditor from './TextEditor';
import {useForm, isNotEmpty} from "@mantine/form"
import {postJob} from "../Services/JobService";
import {successNotification, errorNotification} from "../Services/NotificationService";
import {useNavigate} from "react-router-dom"

const PostJobs = () => {
    const select = fields;
    const navigate = useNavigate();

    const form  =useForm({
      mode:'controlled',
      validateInputOnChange:true,
      initialValues:{
        jobTitle:'',
        company:'',
        experience:'',
        jobType:'',
        location:'',
        packageOffered:'',
        skillsRequired:[],
        about:'',
        description:content,

      },
      validate:{
        jobTitle: isNotEmpty('Title is required'),
        company: isNotEmpty('Company is required'),
        experience: isNotEmpty('Experience is required'),
        jobType: isNotEmpty('Job Type is required'),
        location: isNotEmpty('Location is required'),
        packageOffered: isNotEmpty('package is required'),
        skillsRequired: isNotEmpty('skillsRequired is required'),
        about: isNotEmpty('about is required'),
        description: isNotEmpty('description is required'),
        
      }


    })

    const handlePost=()=>{
      form.validate();
      if(!form.isValid())return;
      postJob(form.getValues())
        .then((res)=>{
          console.log(res)
          successNotification("Success", "Job Posted  successfully");
          navigate("/posted-job")

        }).catch((err)=>{
          console.log(err)
          const errorMsg = err?.response?.data?.errorMessage || "Something went wrong";
          errorNotification(" Error",errorMsg)
      })

    }
     const theme = useMantineTheme();



  return (
    <div className='w-4/5 mx-auto '>
      <div className='text-2xl font-semibold '>
        Post a Job
      </div>
      <div className=" flex flex-col gap-5">
        <div className=" flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0] } />
          <SelectInput form={form} name="company" {...select[1] } />
        </div>
        <div className=" flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2] } />
          <SelectInput form={form} name="jobType" {...select[3] } />
        </div>
        <div className=" flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4] } />
          <NumberInput {...form.getInputProps('packageOffered')} clampBehavior="strict" min={1} max={100} label="Salary" withAsterisk placeholder="Enter salary" hideControls />
        </div>
        <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk splitChars={[',',' ','|']} acceptValueOnBlur clearable label ="Skills" placeholder="Enter Skill" />

        <Textarea {...form.getInputProps('about')} withAsterisk
                label="about Job"  autosize  minRows={3}  placeholder="Enter About Job "/>
        
      </div>

      <div className="flex flex-col gap-5
            [&_button[data-active='true']]:!text-bright-sun-400  
            [&_button[data-active='true']]:!bg-bright-sun-400/20">
        <div className="pt-5 text-sm font-medium">Job Description: <span className="text-red-500">*</span> </div>
        <TextEditor form = {form} />

      </div>
      <div className=" flex gap-4 items-start pt-5">
          <Button  color={theme.colors.brightSun[4]} onClick={handlePost} variant='light' >Publish Job </Button>
          <Button  color={theme.colors.brightSun[4]}  variant='outline' >Save as Draft </Button>
      </div>
    </div>
  )
}

export default PostJobs
