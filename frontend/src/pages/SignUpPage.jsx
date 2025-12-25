import { Button, useMantineTheme } from "@mantine/core";
import {useNavigate} from "react-router-dom";
  import { IconAnchor , IconArrowLeft , IconSettings } from '@tabler/icons-react';
import SignUp from "../SignUpLogin/SignUp"
import Login from "../SignUpLogin/Login"
import {useLocation} from "react-router-dom"
const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
     const theme = useMantineTheme();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden relative">
        <Button size="sm" onClick={() => navigate("/")} leftSection={<IconArrowLeft size={20} />} my="lg" color={theme.colors.brightSun[4]}
         autoContrast variant="light" className="!absolute left-5 z-10 "
         >Home</Button>
      <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-800 flex [&>*]:flex-shrink-0 
                ${location.pathname =='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
        <Login/>
        <div className={`w-1/2 h-full  transition-all ease-in-out duration-1000
                ${location.pathname=="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col `}>
          <div className="flex gap-1 items-center text-bright-sun-400">
            <IconAnchor className="h-16 w-16 " stroke={2.5} />
            <div className="text-6xl font-semibold">Find Job</div>
          </div>
          <div className="text-2xl font-semibold text-mine-shaft-200">Find the made for you</div>
        </div>

        <SignUp />
      </div>
      
    </div>
  );
};

export default SignUpPage;
