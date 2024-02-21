import { useState, useContext } from "react";
import { ProjectsContext } from "./App";

const ToDo = ({ projectID, title, desc, date, priority, toDoID }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [toDoTitle, setToDoTitle] = useState(title);
  const [toDoDesc, setToDoDesc] = useState(desc);
  const [toDoDate, setToDoDate] = useState(date);
  const [toDoPriority, setToDoPriority] = useState(priority);
  const { projects, setProjects } = useContext(ProjectsContext);

  let priorityColor = "";
  switch (priority) {
    case "low":
      priorityColor = "00ca4e";
      break;
    case "medium":
      priorityColor = "ffbd44";
      break;
    case "high":
      priorityColor = "ff605c";
      break;
  }

  const saveChanges = () => {
    let editedToDo = {
      title: toDoTitle,
      desc: toDoDesc,
      date: toDoDate,
      priority: toDoPriority,
    };
    let currentProject = projects.filter(
      (project) => project.id === projectID
    )[0];
    let newToDos = currentProject.toDos.map((toDo) => {
      if (toDo.toDoID === toDoID) {
        return { ...toDo, ...editedToDo };
      } else {
        return toDo;
      }
    });
    currentProject.toDos = newToDos;
    setProjects([...projects]);
    setEditing(false);
  };

  const cancelChanges = () => {
    setToDoTitle(title);
    setToDoDesc(desc);
    setToDoDate(date);
    setToDoPriority(priority);
    setEditing(false);
  };

  const deleteToDo = () => {
    let currentProject = projects.filter(
      (project) => project.id === projectID
    )[0];
    let newToDos = currentProject.toDos.filter(
      (toDo) => toDo.toDoID !== toDoID
    );
    currentProject.toDos = newToDos;
    setProjects([...projects]);
    setDeleting(false);
  };

  return (
    <div className="w-[90%] mt-2 text-black bg-grey ">
      <div
        onClick={() => {
          setOpen(editing || deleting || !open); // can only open if not editing or deleting
        }}
        className="flex flex-row items-center cursor-pointer rounded-xl py-2 pl-5 hover:bg-[#d3d3d379]"
      >
        <div
          className={`border-2 rounded-full border-[#${priorityColor}] h-3 w-3 mr-2`}
        ></div>
        {deleting ? (
          <span className="flex items-center">
            Delete this To-Do?{" "}
            <svg
              className="ml-4 h-4"
              onClick={() => {
                deleteToDo();
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Delete</title>
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
            <svg
              className="ml-2 h-4"
              onClick={() => {
                setDeleting(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Cancel</title>
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </span>
        ) : editing ? (
          <input
            className={`border-2  w-[80%] border-opacity-50 px-2 rounded-xl`}
            defaultValue={toDoTitle}
            onChange={(e) => {
              setToDoTitle(e.target.value);
            }}
          ></input>
        ) : (
          <span className="w-[90%] text-lg text-ellipsis text-left whitespace-nowrap overflow-hidden">{toDoTitle}</span>
        )}
      </div>
      {open && (
        <div
          className={`p-3 text-sm bg-white rounded-xl z-10 border-[2px] min-h-[220px] ml-[2px] mt-1 w-[310px] absolute border-[#${priorityColor}] flex flex-col justify-between border-opacity-50 text-justify`}
        >
          <div className="absolute flex w-15 right-2 top-1">
            <svg
              onClick={() => {
                setEditing(true);
              }}
              fill="#868686"
              className="h-5 w-5 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Edit ToDo</title>
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
            <svg
              onClick={() => {
                setDeleting(true);
              }}
              fill="#868686"
              className="h-5 w-5 ml-1 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Delete ToDo</title>
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </div>
          {editing ? (
            <textarea
              className={`border-2 resize-none w-[100%] min-h-32 mt-4 p-2 rounded-xl`}
              defaultValue={toDoDesc}
              onChange={(e) => {
                setToDoDesc(e.target.value);
              }}
            ></textarea>
          ) : (
            <p className="mt-4">{toDoDesc}</p>
          )}
          <div>
            Due date:{" "}
            {editing ? (
              <input
                type="date"
                className="border-2 rounded-lg px-2 mt-3 ml-2"
                defaultValue={toDoDate}
                onChange={(e) => {
                  setToDoDate(e.target.value);
                }}
              ></input>
            ) : (
              <span> {toDoDate}</span>
            )}
          </div>
          {editing && (
            <div className="mt-5 flex">
              Priority:
              <div className="flex w-[85%] justify-center items-center gap-2">
                <label>Low</label>
                <input
                  type="radio"
                  className="accent-[#00ca4e] cursor-pointer"
                  onClick={() => {
                    setToDoPriority("low");
                  }}
                  checked={toDoPriority == "low"}
                ></input>
                <label>Medium</label>
                <input
                  type="radio"
                  className="accent-[#ffbd44] cursor-pointer"
                  onClick={() => {
                    setToDoPriority("medium");
                  }}
                  checked={toDoPriority == "medium"}
                ></input>
                <label>High</label>
                <input
                  type="radio"
                  className="accent-[#ff605c] cursor-pointer"
                  onClick={() => {
                    setToDoPriority("high");
                  }}
                  checked={toDoPriority == "high"}
                ></input>
              </div>
            </div>
          )}
          {editing && (
            <div className="w-[100%] mt-2 flex justify-center gap-5">
              <button
                onClick={() => saveChanges()}
                className="px-2 py-1 rounded-xl font-semibold bg-[#00ca4e]"
              >
                Save changes
              </button>
              <button
                onClick={() => {
                  cancelChanges();
                }}
                className="px-2 py-1 rounded-xl font-semibold bg-[#d3d3d3]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToDo;
