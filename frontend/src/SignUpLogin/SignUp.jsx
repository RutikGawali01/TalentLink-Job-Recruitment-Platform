import {
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Checkbox,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Radio, Group } from "@mantine/core";
import { useState } from "react";
import {registerUser} from "../Services/UserService"

const form={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  accountType:"APPLICANT",

}

const SignUp = () => {
  const [data, setData] = useState(form);
  

  const handleChange = (event)=>{
    if(typeof(event)=="string")setData({...data, accountType:event});
    else setData({...data, [event.target.name]:event.target.value});
  }

  const handleSubmit=()=>{
    registerUser(data).then((res)=>{
      console.log(res);
    }).catch((err)=>console.log(err));
  }

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className=" text-2xl font-semibold">Create Account</div>
      <TextInput value={data.name} onChange={handleChange} name="name"
      withAsterisk label="Full Name" placeholder="Your name" />
      <TextInput value={data.email}
        withAsterisk onChange={handleChange} name="email"
        leftSection={<IconAt size={16} />}
        label=" Email"
        placeholder="Your email"
      />
      <PasswordInput value={data.password} name="password"
        withAsterisk onChange={handleChange}
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Password"
        placeholder="Password"
      />
      <PasswordInput name="confirmPassword"
        value={data.confirmPassword}
        withAsterisk onChange={handleChange}
        leftSection={<IconLock size={18} stroke={1.5} />}
        label=" Confirm Password"
        placeholder=" Confirm Password"
      />

      <Radio.Group  
        value={data.accountType}
        onChange={handleChange}
        label="You are?"
        withAsterisk
      >
        <Group mt="xs">
            <Radio className="py-4 px-6 hover:bg-mine-shaft-900 border border-mine-shaft-800 rounded-lg
            has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5" autoContrast value="APPLICANT" label="Applicant" />
            <Radio className="py-4 px-6 hover:bg-mine-shaft-900 border border-mine-shaft-800 rounded-lg
            has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5" autoContrast value="EMPLOYER" label="Employer" />
        </Group>
        
      </Radio.Group>

      <Checkbox
        autoContrast
        label={
          <>
            I accept <Anchor>terms & conditions </Anchor>{" "}
          </>
        }
      />
      <Button onClick={handleSubmit}
       autoContrast variant="filled">
        Sign up
      </Button>
      <div className="mx-auto">
        Have an account?{" "}
        <Link to="/login" className="text-bright-sun-400 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
