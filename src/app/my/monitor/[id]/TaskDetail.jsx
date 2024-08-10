"use client";

import LoggedInNavbar from "@/app/my/LoggedInNavbar";
import { formatDateToIndonesian } from "@/app/utils/formatTimestamp";
import { useState } from "react";
import TaskEdit from "./TaskEdit";

export default function TaskDetail({ showTaskDetail, setShowTaskDetail }) {
  const [taskItemData, setTaskItemData] = useState(showTaskDetail.dataMonitor.monitor_task.find((data) => data.id === showTaskDetail.taskId));
  const [showEditTask, setShowEditTask] = useState(false);

  if (showEditTask) return <TaskEdit taskItemData={taskItemData} setTaskItemData={setTaskItemData} setShowEditTask={setShowEditTask} />;

  return (
    <>
      <LoggedInNavbar />
      <section className="sm:ml-12 md:ml-16 lg:ml-20 sm:px-10 pb-20">
        <div className="flex justify-between items-center sm:px-0 lg:py-4 md:py-3 py-2 sm:mx-0 mx-4">
          <button
            type="button"
            onClick={() => {
              setShowTaskDetail({
                isShow: false,
                taskId: null,
                dataMonitor: null,
              });
            }}
            className="flex justify-center items-center lg:gap-6 gap-3"
          >
            <svg className="xl:w-9 lg:w-8 md:w-7 w-5" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.02303 21.9982H36.5175C36.9824 21.9982 37.4514 22.0022 37.9163 21.9982H37.977C38.4945 21.9982 39.0403 21.7744 39.4082 21.4147C39.7599 21.0671 40.0227 20.4996 39.9984 20C39.9742 19.4845 39.8044 18.9489 39.4082 18.5853C39.012 18.2256 38.5268 18.0018 37.977 18.0018H3.48253C3.01759 18.0018 2.54861 17.9978 2.08367 18.0018H2.02303C1.50553 18.0018 0.959732 18.2256 0.591823 18.5853C0.240087 18.9329 -0.022705 19.5004 0.00155274 20C0.0258104 20.5155 0.195614 21.0511 0.591823 21.4147C0.992075 21.7704 1.47723 21.9982 2.02303 21.9982Z"
                fill="#205072"
              />
              <path
                d="M21.4053 36.5528L19.6099 34.7565L15.325 30.4696L10.1202 25.2625L5.64562 20.7859C4.91937 20.0593 4.20521 19.3246 3.46686 18.6061L3.43458 18.5738V21.4277L5.23004 19.6314L9.51494 15.3446L14.7198 10.1374L19.1943 5.66083C19.9206 4.93425 20.6549 4.21574 21.3731 3.48108L21.4053 3.44879C21.7725 3.08146 21.9944 2.54056 21.9944 2.01984C21.9944 1.52334 21.7765 0.934 21.4053 0.590891C21.022 0.239708 20.5177 -0.0226692 19.977 0.00155029C19.4404 0.0257698 18.9361 0.207416 18.5487 0.590891L16.7533 2.38717L12.4684 6.67401L7.26355 11.8812L2.78902 16.3578C2.06276 17.0843 1.32844 17.8029 0.610256 18.5375L0.577978 18.5698C-0.192659 19.3408 -0.192659 20.6527 0.577978 21.4237C1.17915 22.0292 1.78033 22.6266 2.37747 23.228L6.66238 27.5149L11.8672 32.722L16.3417 37.1986C17.068 37.9252 17.7862 38.6599 18.5205 39.3784L18.5528 39.4107C18.9199 39.778 19.4606 40 19.9811 40C20.4774 40 21.0664 39.782 21.4094 39.4107C21.7604 39.0272 22.0227 38.5226 21.9984 37.9817C21.9702 37.4448 21.7927 36.9403 21.4053 36.5528Z"
                fill="#205072"
              />
            </svg>
          </button>

          <button
            type="button"
            className="bg-gcPrimary-600 hover:bg-gcPrimary-700 transition lg:py-2.5 lg:px-10 sm:py-2 sm:px-8 py-2 px-6 text-gcNeutrals-baseWhite gcContentAccent1p rounded-3xl"
            onClick={(e) => {
              e.preventDefault();
              setShowEditTask(true);
            }}
          >
            Edit
          </button>
        </div>

        <div className="xl:px-20 lg:px-16 md:px-14 sm:px-12 px-10">
          <div>
            <h1 className="text-gcPrimary-1000 gcHeading1p">{showTaskDetail.dataMonitor.name}</h1>
            <h3 className="text-gcPrimary-1000 gcHeading3p mt-1">{taskItemData.task}</h3>
            <h4 className="text-gcSecondary-600 gcContentBody4p mt-0.5">{formatDateToIndonesian(taskItemData.createdAt)}</h4>
          </div>
          <p className="text-gcPrimary-1000 xl:mt-9 lg:mt-7 md:mt-6 sm:mt-5 mt-4 gcBody1p text-justify">{taskItemData.description}</p>
        </div>
      </section>
    </>
  );
}
