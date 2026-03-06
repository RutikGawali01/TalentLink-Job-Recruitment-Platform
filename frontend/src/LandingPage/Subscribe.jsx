import { TextInput, Button } from "@mantine/core";

const Subscribe = () => {
  return (
    <div
      className="
        my-5 py-10
        flex justify-around items-center
        max-[1000px]:flex-col
        max-[1000px]:gap-6
        bg-mine-shaft-900
        mx-20
        rounded-xl
      "
    >
      {/* Text Section */}
      <div
        className="
          text-2xl sm:text-3xl lg:text-4xl
          w-2/5 max-[1000px]:w-full
          text-center font-semibold text-mine-shaft-100
        "
      >
        Never wants to Miss Any{" "}
        <span className="text-[var(--blue-600)]">Job News?</span>
      </div>

      {/* Input Section */}
      <div
        className="
          flex gap-4 items-center
          bg-mine-shaft-700 px-3 py-3
          rounded-xl
          
          max-[1000px]:w-full
          max-[1000px]:justify-center
          
          flex-col sm:flex-row
        "
      >
        <TextInput
          styles={{
            input: {
              border: "1px solid #CBD5E1",
              borderRadius: "12px",
            },
          }}
          className="
    [&_input]:text-mine-shaft-100
    font-semibold
    w-full sm:w-auto
    lg:w-[420px]
    [&_input]:h-10
    lg:[&_input]:!h-17 
     min-[640px]:[&_input]:!h-13 
    [&_input]:!px-2
    lg:[&_input]:!px-2
    min-[640px]:[&_input]:!px-2
    lg:[&_input]:text-lg
  "
          variant="unstyled"
          placeholder="Your@email.com"
        />

        <Button
          className="
    rounded-lg
    w-full sm:w-auto
    h-12 lg:!h-16
    text-base lg:text-xl
    px-6 lg:!px-12
    font-semibold
    min-[640px]:!h-12 
  "
          color="brand"
          variant="filled"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
