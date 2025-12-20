import {Divider, FileInput,  TextInput,  NumberInput,  Textarea, Notification} from "@mantine/core";
import { IconPaperclip, IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { Button, useMantineTheme, rem, LoadingOverlay } from "@mantine/core";
import {useState} from 'react'
import {useNavigate} from "react-router-dom"

const ApplyJobComp = () => {
     const theme = useMantineTheme();
     const [preview, setPreiew] = useState(false);
     const [submit, setSubmit] = useState(false);
     const [sec, setSec] = useState(5);
     const navigate = useNavigate();

    const handlePreview = ()=>{
        setPreiew(!preview);
        window.scrollTo({top:0, behavior: 'smooth'}) // this will go to top of page if we are at bottom
    }

    const handleSubmit = () => {
        setSubmit(true);
        let x = 5;
        setInterval(()=>{
            x--;
            setSec(x);
            if(x == 0) navigate('/find-jobs');
            
        }, 1000)
    }

  return (
    <>
    <LoadingOverlay  className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{radius: "sm", blur: 2}}
        loaderProps={{color:`${theme.colors.brightSun[4]}`, type: 'bars'}}
    
    /> 


    <div className="w-2/3 mx-auto ">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center ">
          <div className="p-3 rounded-lg  bg-mine-shaft-800 ">
            <img className="h-14  " src={`/Icons/Google.png`} alt="" />
          </div>

          <div className="flex flex-col gap-1 ">
            <div className="font-semibold text-2xl ">software Engineer</div>
            <div className="text-lg text-mine-shaft-300">
              Google &#x2022; 3 days ago &#x2022; 48 Applicants
            </div>
          </div>
        </div>
      </div>
      <Divider my="xl" />
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
            label="Fulll Name "
            withAsterisk
            placeholder="Enter Name"
          />
          <TextInput 
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
           label="email " withAsterisk placeholder="Enter email" />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput 
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
          <TextInput 
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
            label="Personal Website "
            withAsterisk
            placeholder="Enter URL"
          />
        </div>
        <FileInput withAsterisk
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`}
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach your CV"
          placeholder="Your CV"
          leftSectionPointerEvents="none"
        />
        <Textarea 
            readOnly={preview}
            variant={preview?"unstyled":"default"}
            className={`${preview?"text-mine-shaft-300 font-semibold ":""}`} 
         withAsterisk placeholder="Type Something about yourself" label="Cover Letter" autosize minRows={4} />

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
    <Notification withBorder className={`!border-bright-sun-400 -translate-y-20 !fixed 
    top-0 left-[35%] z-[1001] transition duration-200 ease-in-out 
    ${submit?"translate-y-0":"-translate-y-20"}`}
        icon= {<IconCheck style={{width: rem(20), height: rem(20) }} />} 
        color="teal" title = "Application Submitted!" mt="md" withCloseButton={false}>
            Redirecting to find jobs in {sec} seconds...
    </Notification>
    </>
  );
};

export default ApplyJobComp;
