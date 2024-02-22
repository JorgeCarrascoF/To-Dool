import { createContext, useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Project from "./components/Project";
import Notifications from "./components/Notifications";
import About from "./components/About";

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
          title: "Welcome to To-Dool (click me!)",
          desc: "To create a To-Do, click on the Add To-Do button. Click on a To-Do to open the description. due date and edit/delete options. To create a new project, open the menu on the top left corner and click on create new project.",
          date: new Date().toLocaleDateString(),
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
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    saveData(); // saving data to local storage on project changes
  }, [projects]);

  useEffect(()=>{
    // set up for notifications
  for (let project of projects) {
    for (let todo of project.toDos) {
      let notification;
      if (Date.parse(todo.date) < Date.now()) {
        // if the date is in the past
        notification = {
          id: randomID(),
          todo: todo.title,
          project: project.name,
          status: "overdue",
        };
      } else if (
        // if the date is within the next week
        Date.parse(todo.date) <
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ) {
        notification = {
          id: randomID(),
          todo: todo.title,
          project: project.name,
          status: "due-soon",
        };
      }
      if (notification) { // prevent notification from being duplicated by react's re-rendering
        let notificationExist = notifications.some(note => note.todo === notification.todo && note.project === notification.project);
        if(!notificationExist) {
          let newNotifications = notifications;
          newNotifications.push(notification);
          setNotifications(newNotifications);
        }
      }
    }
  }
  }, [])


  const saveData = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  return (
    <>
      <ProjectsContext.Provider
        value={{ projects, setProjects, randomID, saveData, notifications, setNotifications, notificationsOpen, setNotificationsOpen, aboutOpen, setAboutOpen}}
      >
        <Menu></Menu>
        <Notifications></Notifications>
        {projects.map((item, index) => (
          <Project project={item} key={index}></Project>
        ))}
        <About></About>
      </ProjectsContext.Provider>
    </>
  );
}

export default App;
