import SelectInput from "./SelectInput";
import {TagsInput, Button, useMantineTheme} from "@mantine/core";
import {fields} from "../assets/Data/PostJob";
import TextEditor from './TextEditor';

const PostJobs = () => {
    const select = fields;
     const theme = useMantineTheme();

  return (
    <div className='w-4/5 mx-auto '>
      <div className='text-2xl font-semibold '>
        Post a Job
      </div>
      <div className=" flex flex-col gap-5">
        <div className=" flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[0] } />
          <SelectInput {...select[1] } />
        </div>
        <div className=" flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[2] } />
          <SelectInput {...select[3] } />
        </div>
        <div className=" flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[4] } />
          <SelectInput {...select[5] } />
        </div>
        <TagsInput withAsterisk splitChars={[',',' ','|']} acceptValueOnBlur clearable label ="Skills" placeholder="Enter Skill" />
        
      </div>

      <div className="flex flex-col gap-5
            [&_button[data-active='true']]:!text-bright-sun-400  
            [&_button[data-active='true']]:!bg-bright-sun-400/20">
        <div className="pt-5 text-sm font-medium">Job Description: </div>
        <TextEditor />
      </div>
      <div className=" flex gap-4 items-start pt-5">
          <Button  color={theme.colors.brightSun[4]}  variant='light' >Publish Job </Button>
          <Button  color={theme.colors.brightSun[4]}  variant='outline' >Save as Draft </Button>
      </div>
    </div>
  )
}

export default PostJobs
