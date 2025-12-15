import {TextInput , Button , useMantineTheme} from "@mantine/core";

const Subscribe = () => {
    const theme = useMantineTheme();
  return (
    <div className="mt-20 pb-5 flex items-center bg-mine-shaft-900 mx-20 py-3 rounded-xl justify-around  ">
      <div className="text-4xl w-2/5  text-center font-semibold text-mine-shaft-100">
        Never wants to Miss Any <span className="text-bright-sun-400">Job News? </span> 
      </div>

        <div className="flex gap-4 bg-mine-shaft-700 px-3 py-2 items-center rounded-xl ">
            <TextInput 
                className="[&_input]:text-mine-shaft-100 font-semibold"
                variant="unstyled"
                placeholder="Your@emai.com"  
                size="xl"          
            />
            <Button className="rounded-lg"
             size="lg" color={theme.colors.brightSun[4]} variant="filled">Subscribe</Button>

        </div>

    </div>
  )
}

export default Subscribe
