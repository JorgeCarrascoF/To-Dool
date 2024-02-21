import { createContext, useEffect, useState } from "react";
import "./App.css";
import Menu from "./Menu";
import Project from "./Project";

const randomID = () => {
  let id = Math.random().toString(36).substring(2);
  return id;
};

let projectsArray = localStorage.getItem("projects");
if (!projectsArray) {
  projectsArray = [
    {
      name: "Default",
      id: randomID(),
      toDos: [
        {
          title: "Default To-Do",
          desc: "This is a default To-Do",
          date: Date.now().toLocaleString(),
          priority: "low",
          ToDoID: randomID(),
        },
      ],
    },
  ];
  localStorage.setItem("projects", JSON.stringify(projectsArray));
}

projectsArray = JSON.parse(localStorage.getItem("projects"));

export const ProjectsContext = createContext();


function App() {
  const [projects, setProjects] = useState(projectsArray);

  useEffect(() => {
    saveData(); // saving data to local storage on project changes
  }, [projects]);

  const saveData = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log("Data saved: " + projects);
  }

  return (
    <>
      <ProjectsContext.Provider
        value={{ projects, setProjects, randomID, saveData }}
      >
        <Menu></Menu>
        {projects.map((item, index) => (
          <Project project={item} key={index}></Project>
        ))}
      </ProjectsContext.Provider>
    </>
  );
}

export default App;
