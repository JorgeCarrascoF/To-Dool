import { useContext } from "react";
import { ProjectsContext } from "../App";

const About = () => {
  const { aboutOpen, setAboutOpen } = useContext(ProjectsContext);
  return (
    aboutOpen && (
      <div className="fixed z-20 shadow-xl right-2 py-2 bottom-2 text-black rounded-xl w-[300px] h-[160px] bg-white flex flex-col">
        <button className="absolute right-2 top-2">
        <svg
            onClick={() => {
              setAboutOpen(false);
            }}
            className="h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>Cancel new project</title>
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
        <span className="w-[80%] pl-4 font-semibold text-left">About</span>
        <p className="text-[0.8rem] p-4 text-justify">
          To-Dool is a small, minimalistic To-Do app made by Jorge Carrasco
          using React and Vite, paired with Web Storage API for persistence. For
          more info, contact me via{" "}
          <a
            href="https://github.com/JorgeCarrascoF"
            target="_blank"
            className="text-blue-600"
          >
            GitHub
          </a>
          . Hope you like the app!
        </p>
      </div>
    )
  );
};

export default About;
