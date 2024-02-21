import { useContext, useEffect } from "react";
import { ProjectsContext } from "./App";

const Notifications = () => {
  const {
    notifications,
    setNotifications,
    notificationsOpen,
    setNotificationsOpen,
  } = useContext(ProjectsContext);

  const deleteNotification = (id) => {
    console.log(id);
    let newNotifications = notifications.filter((note) => note.id !== id);
    setNotifications(newNotifications);
  };

  return (
    <>
      {notificationsOpen && (
        <div
          className={`fixed z-20 shadow-lg right-2 top-2 w-[300px] h-fit pb-4 bg-white rounded-lg items-center select-none flex flex-col`}
        >
          <svg
            onClick={()=>{setNotificationsOpen(false)}}
            className="h-5 cursor-pointer absolute text-black right-1 top-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"

          >
            <title>Close notifications</title>
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
          <h1 className="text-xl mt-2 py-2 text-black border-b-2 w-[90%] mb-3">
            Notifications
          </h1>
          <div className="w-[90%] h-fit overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                return (
                  <div
                    key={notification.id}
                    className={`w-full flex text-black flex-row justify-between pb-4 items-center`}
                  >
                    <div className="flex flex-row items-center">
                      <svg
                        data-id={notification.id}
                        className="h-4 mr-2 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        onClick={(e) => {
                          deleteNotification(e.target.dataset.id);
                        }}
                      >
                        <title>Delete notification</title>
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                      </svg>
                      <span
                        className={`text-ellipsis w-[160px] text-left whitespace-nowrap overflow-hidden`}
                      >
                        ({notification.project}) {notification.todo}
                      </span>
                    </div>
                    <span
                      className={`${
                        notification.status == "overdue"
                          ? "text-[#ff605c]"
                          : "text-[#ffbd44]"
                      }`}
                    >
                      {notification.status}
                    </span>
                  </div>
                );
              })
            ) : (
              <span className="text-center text-black">
                No To-Dos overdues or due soon!
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Notifications;
