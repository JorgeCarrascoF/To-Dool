import { useState, useContext, useEffect } from "react";
import ToDo from "./ToDo";
import { ProjectsContext } from "./App";

const Project = ({ project }) => {
  const { name, id, toDos } = project;
  const [deleting, setDeleting] = useState(false);
  const [addingToDo, setAddingToDo] = useState(false);
  const { projects, setProjects, randomID } = useContext(ProjectsContext);

  const [newToDoName, setNewToDoName] = useState("");
  const [newToDoDesc, setNewToDoDesc] = useState("");
  const [newToDoDate, setNewToDoDate] = useState(Date.now());
  const [newToDoPriority, setNewToDoPriority] = useState("low");

  const deleteProject = () => {
    let newProjects = [];
    for (let pro of projects) {
      if (pro.id !== id) {
        console.log(pro.id, id)
        newProjects.push(pro);
      }
    }
    setProjects(newProjects);
    setDeleting(false);
  };

  const addNewToDo = () => {
    let newToDo = {
      title: newToDoName,
      desc: newToDoDesc,
      date: newToDoDate,
      priority: newToDoPriority,
      toDoID: randomID(),
    };
    projects.map((pro) => {
      if (pro.id === id) {
        pro.toDos.push(newToDo);
      }
    });
    setProjects([...projects]);
    setAddingToDo(false);
  }


  return (
    <div className="w-[340px] relative shadow-md  h-[420px] bg-white rounded-lg items-center select-none flex flex-col">
      <h1 className="text-xl mt-2 py-2 text-black border-b-2 w-[90%] mb-3">
        {name}
      </h1>
      <div className="absolute right-2 cursor-pointer top-2">
        <svg
          className="h-5 w-5"
          onClick={() => {
            setDeleting(true);
          }}
          fill="#868686"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>Delete project</title>
          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
      </div>
      {deleting ? (
        <div className="text-black w-[100%] p-4 items-center flex flex-col pb-3">
          <span className="font-semibold mb-2">
            Are you sure you want to delete {name} ?
          </span>
          <span className="text-gray-400 text-sm font-semibold">
            Deleting is permanent. You won't be able to recover the To-Do's
            associated with this project.
          </span>
          <div>
            <button
              onClick={() => {
                deleteProject(name);
              }}
              className="m-4 py-2 px-4 rounded-2xl text-white bg-[#ff605c]"
            >
              Yes, delete it
            </button>
            <button
              onClick={() => {
                setDeleting(false);
              }}
              className="py-2 px-4 rounded-2xl text-white bg-[#00ca4e]"
            >
              No, keep it
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[100%] items-center flex flex-col overflow-y-auto pb-3">
          {!addingToDo && toDos.map((item, index) => (
            <ToDo
              projectID={id}
              title={item.title}
              desc={item.desc}
              date={item.date}
              priority={item.priority}
              toDoID={item.toDoID}
              key={index}
            ></ToDo>
          ))}
        </div>
      )}
      {addingToDo && (
        <div className="w-[80%] flex flex-col items-center h-fit text-black mb-4">
          <div className="mt-2 text-black bg-grey w-[100%]">
            <label className="">Title:</label> 
            <input onChange={(e)=>{setNewToDoName(e.target.value)}} type="text" className=" ml-4 px-2 border-2 w-[60%] rounded-xl"></input>
          </div>
          <div className="mt-2 text-black bg-grey w-[100%]">
            <label className="">Desc</label>
            <input onChange={(e)=>{setNewToDoDesc(e.target.value)}} type="text" className=" ml-4 px-2 border-2 w-[60%] rounded-xl"></input>
          </div>
          <div className="mt-2 text-black bg-grey w-[100%]">
            <label className="">Date</label>
            <input onChange={(e)=>{setNewToDoDate(e.target.value)}} type="date" className=" ml-4 pl-4 pr-3 border-2 w-[60%] rounded-xl"></input>
          </div>
          <div className="mt-5 flex flex-col items-start">
            <label>Priority:</label>
            <div className="flex ml-8 justify-center items-center gap-2">
              <label>Low</label>
              <input onClick={()=> {setNewToDoPriority('low')}}
                type="radio"
                className="accent-[#00ca4e] cursor-pointer"
                checked={newToDoPriority == "low"}
              ></input>
              <label>Medium</label>
              <input onClick={()=> {setNewToDoPriority('medium')}}
                type="radio"
                className="accent-[#ffbd44] cursor-pointer"
                checked={newToDoPriority == "medium"}
              ></input>
              <label>High</label>
              <input onClick={()=> {setNewToDoPriority('high')}}
                type="radio"
                className="accent-[#ff605c] cursor-pointer"
                checked={newToDoPriority == "high"}
              ></input>
            </div>
          </div>
          <button onClick={()=>{addNewToDo()}} className="border-2 mt-2 text-black rounded-xl px-2 py-1">Add</button>
        </div>
      )}
      <button
        onClick={() => {
          setAddingToDo(!addingToDo);
        }}
        className="border-2 text-black rounded-xl px-2 my-4 py-1"
      >
        {!addingToDo ? "Add To-Do" : "Cancel"}
      </button>
    </div>
  );
};

export default Project;
