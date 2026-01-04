import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";
import { Textarea,   } from "@mantine/core";
import { useState, useEffect } from "react";
import {MonthPickerInput} from "@mantine/dates"
import { useMantineTheme, PasswordInput,Button, Anchor, Checkbox } from "@mantine/core";
import {useSelector, useDispatch} from "react-redux"
import {useForm, isNotEmpty} from "@mantine/form";
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";


const ExpInput = (props) => {
  const profile  = useSelector((state)=> state.profile);
  const theme = useMantineTheme();
  const select = fields;
 const dispatch = useDispatch();
  useEffect(() => {
      if(!props.add)form.setValues({title: props.title, company: props.company, location: props.location, 
        description: props.description, startDate: new Date(props.startDate), 
        endDate: new Date(props.endDate), working: props.working
      })
  }, [])
  

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      title: '',
      company: '',
      location: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      working: false
    },
    validate:{
      title: isNotEmpty("title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    }

  })

  const handleSave = ()=> {
    form.validate();
    if(!form.isValid())return;
    let exp =[...profile?.experiences];
    if(props.add){
      exp.push(form.getValues());
      //exp[exp.length-1] = startDate=exp[exp.length-1].startDate.toISOString();
      //exp[exp.length-1] = endDate=exp[exp.length-1].endDate.toISOString();
    }
    else {
      exp[props.index]= form.getValues();

    }
    let updatedProfile = {...profile, experiences: exp};
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", `Profile ${props.add ? "Added":"updated"}  successfully`);
    
  }

  return (

    <div className="flex flex-col gap-3 ">
      <div className="text-lg font-semibold">{props?.add ? "Add" :"Edit" } Experience</div>
      <div className=" flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />{" "}
      <Textarea {...form.getInputProps('description')} withAsterisk
        label="Summary"  autosize  minRows={3}  placeholder="Enter Summary "/>
      <div className=" flex gap-10 [&>*]:w-1/2">
            {/* <MonthPickerInput {...form.getInputProps('startDate')} withAsterisk maxDate={form.getValues().endDate || undefined}  label="Start Date" placeholder="Pick date"  onChange={setStartDate} />
            <MonthPickerInput {...form.getInputProps('endDate')} disabled={form.getValues().working} withAsterisk minDate={form.getValues()startDate ||  undefined} maxDate={new Date()}   label="end Date" placeholder="Pick date"  onChange={setEndDate} /> */}
            
      </div>
        <Checkbox checked= {form.getValues().working} 
        onChange={(event)=> form.setFieldValue("working", event.currentTarget.checked)}  autoContrast label= "cuurently working here"/>
        <div className="flex gap-5 " >
            <Button onClick={handleSave} color="green.8" variant="light">Save </Button>
            <Button onClick={() => props.setEdit(false)} color="red.8" variant="outline">Cancel  </Button>
        </div> 
    </div>
  );
};

export default ExpInput;
