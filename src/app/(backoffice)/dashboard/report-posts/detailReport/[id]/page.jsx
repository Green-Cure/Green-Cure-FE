"use client";

import request from "@/app/utils/request";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ReportDatasContext } from "../../layout";
import { useRouter } from "next/navigation";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { hostNoPrefix } from "@/app/utils/urlApi";
import DeleteModal from "../../../DeleteModal";

export default function DetailReport({ params }) {
  const router = useRouter();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [labelModal, setLabelModal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { reportDatas, setReportDatas } = useContext(ReportDatasContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!reportDatas) {
      setIsLoading(true);
      const datas = getReportDatas();
      toast.promise(datas, {
        loading: "Getting data",
        success: "Fetch data success",
        error: "Error when fetching",
      });
      datas
        .then(
          (response) => {
            if (response) {
              setReportDatas(response);
              handleNoData(response);
            } else {
              setReportDatas(null);
            }
          },
          () => null
        )
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleNoData(reportDatas);
      setIsLoading(false);
    }
  }, []);

  const getReportDatas = async () => {
    let reportDatas = null;
    await request
      .get("report")
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            reportDatas = response.data.data;
          }
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      })
      .catch((err) => {
        toast.error("An unexpected error occurred");
        console.error(err);
      });
    return reportDatas;
  };

  const handleNoData = (datas) => {
    const data = datas.find((data) => data.id == params.id);
    if (!data) {
      router.push("/dashboard/report-posts");
    } else {
      setData(data);
    }
  };

  const handleToggleDeleteModal = () => {
    setIdDelete("");
    setLabelModal("");
    setToggleDelete(!toggleDelete);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    handleToggleDeleteModal();
    toast.error("This feature is under devlopement");
  };

  return (
    <>
      <div className="mb-20">
        {!isLoading && data && (
          <div className="flex flex-col gap-5">
            <div className="border p-3 rounded-lg">
              <h1 className="gcHeading7p text-gcPrimary-1000">Reported By</h1>
              <div className="grid-cols-8 grid gap-3">
                <div className="mt-3 border rounded-xl lg:p-4 md:p-3 p-2 col-span-8">
                  <form method="POST">
                    <h1 className="gcHeading7p text-gcPrimary-1000">General Information</h1>
                    <div className="grid grid-cols-6 gap-3 mt-3">
                      <div className="md:col-span-3 col-span-6">
                        <label htmlFor="name" className="text-gcPrimary-1000 gcContentAccent1p">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="e.g Name..."
                          required
                          value={data.reportedBy.name}
                          disabled
                          readOnly
                          className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                        />
                      </div>
                      <div className="md:col-span-3 col-span-6">
                        <label htmlFor="username" className="text-gcPrimary-1000 gcContentAccent1p">
                          Username
                        </label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="e.g Username..."
                          required
                          value={data.reportedBy.username}
                          disabled
                          readOnly
                          className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                        />
                      </div>
                      <div className="md:col-span-3 col-span-6">
                        <label htmlFor="email" className="text-gcPrimary-1000 gcContentAccent1p">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="e.g Email..."
                          required
                          value={data.reportedBy.email}
                          disabled
                          readOnly
                          className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                        />
                      </div>
                      <div className="md:col-span-3 col-span-6">
                        <div className="flex items-center justify-between">
                          <label htmlFor="roleId" className="text-gcPrimary-1000 gcContentAccent1p">
                            Role
                          </label>
                        </div>
                        <input
                          id="role"
                          name="role"
                          type="text"
                          required
                          value={data.reportedBy.role == "1" ? "Admin" : data.reportedBy.role == "2" ? "Guest" : data.reportedBy.role == "3" ? "Member" : "None"}
                          disabled
                          readOnly
                          className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="border rounded-xl lg:p-4 md:p-3 p-2 col-span-8">
                  <h1 className="gcContentAccent1p text-gcPrimary-1000 mb-3">Contacts</h1>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-gcPrimary-1000 sm:text-xl" />
                      <h3 className="text-gcSecondary-600 sm:text-sm text-xs">{data.reportedBy.phone}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdEmail className="text-gcPrimary-1000 sm:text-xl" />
                      <h3 className="text-gcSecondary-600 sm:text-sm text-xs">{data.reportedBy.email}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-3 rounded-lg">
              <h1 className="gcHeading7p text-gcPrimary-1000">{data.type}</h1>

              <div className="mt-3">
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex flex-col">
                      <label htmlFor="type" className="text-gcPrimary-1000 gcContentAccent1p">
                        Image
                      </label>
                      <div className="border rounded-xl py-3 px-3 mt-1">
                        {data.image ? (
                          <img src={`${hostNoPrefix}uploads/${data.image}`} alt="Current Thumbnail" className="rounded-xl max-w-96 max-h-60 object-cover object-center mt-1" />
                        ) : (
                          <h1 className="text-gcPrimary-1000 gcContentBody2p mt-1">None</h1>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="content" className="text-gcPrimary-1000 gcContentAccent1p">
                      Content
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      type="text"
                      placeholder="e.g Content..."
                      required
                      value={data.forum ? data.forum.content : data.replies.content}
                      disabled
                      readOnly
                      className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-3 rounded-lg">
              <h1 className="gcHeading7p text-gcPrimary-1000">Action</h1>
              <div className="flex flex-row flex-wrap mt-3 gap-3">
                <button
                  type="button"
                  className="text-gcNeutrals-baseWhite bg-gcPrimary-1000 transition hover:bg-gcPrimary-900 focus:ring-2 focus:outline-none focus:ring-gcPrimary-900 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                  onClick={(e) => {
                    setToggleDelete(!toggleDelete);
                    setLabelModal("report");
                    setIdDelete(data.id);
                  }}
                >
                  Delete Report
                </button>
                <button
                  type="button"
                  className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                  onClick={(e) => {
                    setToggleDelete(!toggleDelete);
                    setLabelModal(data.type.toLowerCase());
                    setIdDelete(data.id);
                  }}
                >
                  Delete {data.type}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeleteModal handleToggleDeleteModal={handleToggleDeleteModal} toggleDelete={toggleDelete} handleDelete={handleDelete} id={idDelete} label={labelModal} />
    </>
  );
}
