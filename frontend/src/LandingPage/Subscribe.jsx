import {TextInput , Button , useMantineTheme} from "@mantine/core";

const Subscribe = () => {
    const theme = useMantineTheme();
  return (
    <div className="my-5 py-10 flex items-center bg-mine-shaft-900 mx-20 py-3 rounded-xl justify-around  ">
      <div className="text-4xl w-2/5  text-center font-semibold text-mine-shaft-100">
        Never wants to Miss Any <span className="text-[var(--blue-600)]">Job News? </span> 
      </div>

        <div className="flex gap-4 bg-mine-shaft-700 px-3 py-2 items-center rounded-xl border-accent">
            <TextInput 
                className="[&_input]:text-mine-shaft-100 font-semibold"
                variant="unstyled"
                placeholder="Your@emai.com"  
                size="xl"          
            />
            <Button className="rounded-lg"
             size="lg" color="brand" variant="filled">Subscribe</Button>

        </div>

    </div>
  )
}

export default Subscribe
