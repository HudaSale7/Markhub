import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
const Intro = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container flex flex-col items-center justify-center py-20">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal leading-normal  ">
          Your Friendly Markdown Playground for Effortless Creativity!
        </h1>
        <p className="mt-6 text-center   text-gray-400"></p>
        <div className="flex">
          <Button
            variant="secondary"
            className=" text-xl  mr-4"
            size="lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            size="lg"
            className="text-xl"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Signup
          </Button>
        </div>
      </div>
    </>
  );
};

export default Intro;
