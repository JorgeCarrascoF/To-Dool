import { useContext, useEffect, useState } from "react";

import { ProjectsContext } from "./App";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const {
    projects,
    setProjects,
    randomID,
    notifications,
    setNotificationsOpen,
  } = useContext(ProjectsContext);

  const [newProjectName, setNewProjectName] = useState("");

  const createNewProject = () => {
    let newProject = { name: newProjectName, id: randomID(), toDos: [] };
    setProjects([...projects, newProject]);
    setNewProjectName("");
    setCreatingProject(false);
  };

  return (
    <div
      className={`bg-white text-black z-30 shadow-md rounded-2xl fixed left-5 top-5 ${
        !open
          ? "h-[50px] w-[50px]"
          : creatingProject
          ? "h-[250px] w-[200px]"
          : "h-[200px] w-[200px]"
      } transition-all duration-500 items-start cursor-pointer flex flex-col overflow-hidden`}
    >
      <div className="absolute left-[8px] top-[8px]  flex flex-row justify-evenly items-center overflow-hidden">
        <div
          onClick={() => {
            setCreatingProject(false);
            setOpen(!open);
          }}
          className="flex flex-col justify-evenly items-center w-[34px] h-[34px] border-[2px] border-[#5d5d5d] rounded-full"
        >
          <div className="bg-[#ff605c] h-[6px] w-[6px] rounded-full"></div>
          <div className="bg-[#ffbd44] h-[6px] w-[6px] rounded-full"></div>
          <div className="bg-[#00ca4e] h-[6px] w-[6px] rounded-full"></div>
        </div>
        <span className="ml-3 text-xl select-none font-semibold overflow-hidden min-w-[180px] text-left">
          To-Dool
        </span>
      </div>
      <div
        onClick={() => {
          setCreatingProject(true);
        }}
        className="mt-14 min-w-[200px] hover:bg-[#d3d3d37c] h-4 py-6 pl-[14px] flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 mr-4"
          viewBox="0 0 24 24"
        >
          <title>Create new project</title>
          <path d="M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M11,18H13V15.87C14.73,15.43 16,13.86 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12C8,13.86 9.27,15.43 11,15.87V18Z" />
        </svg>
        <span className="select-none  flex items-center  border-[#b6b5b5] rounded-3xl">
          Create new project
        </span>
      </div>
      {creatingProject && (
        <div className="min-w-[140px] my-2 ml-3 hover:bg-[#d3d3d37c] border-2 rounded-3xl pr-3  h-4 py-4 pl-[14px] flex items-center">
          <input
            onChange={(e) => {
              setNewProjectName(e.target.value);
            }}
            className="text-sm  w-[120px] border-none outline-none bg-transparent"
            placeholder="Enter name"
          ></input>
          <svg
            onClick={() => {
              createNewProject();
            }}
            className="h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>New project</title>
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
          <svg
            onClick={() => {
              setCreatingProject(false);
              setNewProjectName("");
            }}
            className="h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>Cancel new project</title>
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </div>
      )}
      <div
        onClick={() => {
          setNotificationsOpen(true);
          setOpen(false);
        }}
        className="min-w-[200px] select-none hover:bg-[#d3d3d37c] h-4 py-6 pl-[14px] flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 mr-4"
          viewBox="0 0 24 24"
        >
          <title>Notifications</title>
          <path d="M10 21H14C14 22.1 13.1 23 12 23S10 22.1 10 21M21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19M17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z" />
        </svg>
        Notifications{" "}
        {notifications.length > 0 ? `(${notifications.length})` : ""}
      </div>

      <div className="min-w-[200px] select-none hover:bg-[#d3d3d37c] h-4 py-6 pl-[14px] flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 mr-4"
          viewBox="0 0 24 24"
        >
          <title>About To-Dool</title>
          <path d="M20 2H4C3.47 2 2.96 2.21 2.59 2.59C2.21 2.96 2 3.47 2 4V16C2 16.53 2.21 17.04 2.59 17.41C2.96 17.79 3.47 18 4 18H8L12 22L16 18H20C20.53 18 21.04 17.79 21.41 17.41S22 16.53 22 16V4C22 3.47 21.79 2.96 21.41 2.59C21.04 2.21 20.53 2 20 2M4 16V4H20V16H15.17L12 19.17L8.83 16M10.05 6.04C10.59 5.68 11.3 5.5 12.19 5.5C13.13 5.5 13.88 5.71 14.42 6.12C14.96 6.54 15.23 7.1 15.23 7.8C15.23 8.24 15.08 8.63 14.79 9C14.5 9.36 14.12 9.64 13.66 9.85C13.4 10 13.23 10.15 13.14 10.32C13.05 10.5 13 10.72 13 11H11C11 10.5 11.1 10.16 11.29 9.92C11.5 9.68 11.84 9.4 12.36 9.08C12.62 8.94 12.83 8.76 13 8.54C13.14 8.33 13.22 8.08 13.22 7.8C13.22 7.5 13.13 7.28 12.95 7.11C12.77 6.93 12.5 6.85 12.19 6.85C11.92 6.85 11.7 6.92 11.5 7.06C11.34 7.2 11.24 7.41 11.24 7.69H9.27C9.22 7 9.5 6.4 10.05 6.04M11 14V12H13V14Z" />
        </svg>{" "}
        About To-Dool
      </div>
    </div>
  );
};

export default Menu;
