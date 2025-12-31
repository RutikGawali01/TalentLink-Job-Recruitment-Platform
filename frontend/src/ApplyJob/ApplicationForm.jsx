import {Divider, FileInput,  TextInput,  NumberInput,  Textarea, Notification} from "@mantine/core";
import { IconPaperclip, IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { Button, useMantineTheme, rem, LoadingOverlay } from "@mantine/core";
import {useState} from 'react'
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom"
import {useForm, isNotEmpty} from "@mantine/form";
import {getBase64} from "../Services/Utilities";
import {applyJob} from "../Services/JobService";
import {successNotification , errorNotification}  from "../Services/NotificationService";

const ApplicationForm = () => {
  const {id} = useParams();
  const user = useSelector((state)=> state.user);
    const theme = useMantineTheme();
     const [preview, setPreiew] = useState(false);
     const [submit, setSubmit] = useState(false);
     const [sec, setSec] = useState(5);
     const navigate = useNavigate();

    const handlePreview = ()=>{
        form.validate();
        setPreiew(!preview);
        window.scrollTo({top:0, behavior: 'smooth'}) // this will go to top of page if we are at bottom
        if(!form.isValid()) return
        //console.log(form.getValues());
    }

    const  handleSubmit = async () => {
        setSubmit(true);
        let resume = await getBase64(form.getValues().resume);
        let applicant={...form.getValues(), applicantId: user.id, resume: resume.split(',')[1]};
        applyJob(id, applicant).then((res)=>{
          setSubmit(false);
          //console.log(applicant);
          successNotification("Success", "Application Submitted successfully");
          navigate("/job-history")
        }).catch((err)=>{
          setSubmit(false);
          console.log(err);
          errorNotification("Error", err?.response?.data?.errorMessage );
        })
        

    };

    const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      website:'',
      resume:'null',
      coverLetter:'',

    },
    validate:{
      name: isNotEmpty("name is required"),
      email: isNotEmpty("email is required"),
      phone: isNotEmpty("phone is required"),
      website: isNotEmpty("website is required"),
      resume: isNotEmpty("resume is required"),
    }

  })

  return (
    <div>
        <LoadingOverlay  className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{radius: "sm", blur: 2}}
        loaderProps={{color:`${theme.colors.brightSun[4]}`, type: 'bars'}}
    
    /> 
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput {...form.getInputProps("name")}
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
            label="Fulll Name "
            withAsterisk
            placeholder="Enter Name"
          />
          <TextInput {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
           label="email " withAsterisk placeholder="Enter email" />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput  {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
            hideControls
            label="Phone Number "
            withAsterisk
            placeholder="Enter phone Number"
            min={0}
            max={9999999999}
            clampBehavior="strict"
          />
          <TextInput {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
            label="Personal Website "
            withAsterisk
            placeholder="Enter URL"
          />
        </div>
        <FileInput withAsterisk {...form.getInputProps("resume")}
            readOnly={preview} accept="application/pdf"
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach your CV"
          placeholder="Your CV"
          leftSectionPointerEvents="none"
        />
        <Textarea {...form.getInputProps("coverLetter")}
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} 
          placeholder="Type Something about yourself" label="Cover Letter" autosize minRows={4} />

        {
            !preview && <Button leftSection={<IconArrowLeft size={20} />} color={theme.colors.brightSun[4]} variant="light" onClick={handlePreview} >
          Preview
        </Button>}
        {
            preview && <div className="flex gap-10 [&>*]:w-1/2">
                <Button fullWidth  color={theme.colors.brightSun[4]} variant="outline" onClick={handlePreview} >
          Edit
        </Button>
                <Button fullWidth  color={theme.colors.brightSun[4]} variant="light" onClick={handleSubmit} >
          Submit
        </Button>
            </div>
        }    
      </div>
    </div>
  )
}

export default ApplicationForm
