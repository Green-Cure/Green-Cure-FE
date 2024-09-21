"use client";

import toast from "react-hot-toast";
import DeleteModal from "../DeleteModal";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import request from "@/app/utils/request";
import { ReportDatasContext } from "./layout";

export default function DashboardReportPosts() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const { reportDatas, setReportDatas } = useContext(ReportDatasContext);

  useEffect(() => {
    setIsLoading(true);
    const reportDatas = getReportDatas();

    reportDatas
      .then(
        (response) => {
          if (response) {
            setReportDatas(response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          } else {
            setReportDatas(null);
          }
        },
        () => null
      )
      .finally(() => {
        setIsLoading(false);
      });
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
        } else if (response.data?.statusCode === 500) {
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

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gcNeutrals-baseWhite uppercase bg-gcPrimary-1000">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Reported By
              </th>
              <th scope="col" className="px-6 py-3">
                Reason
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                type
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              reportDatas ? (
                reportDatas.length > 0 ? (
                  reportDatas.map((data) => {
                    const reportedData = data.forum ? data.forum : data.replies;
                    return (
                      <tr key={data.reportedBy.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label htmlFor="checkbox-table-search-1" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                          <img className="w-10 h-10 rounded-full" src={data.reportedBy.avatar ? `${hostNoPrefix}uploads/${data.reportedBy.avatar}` : "/avatars/default-avatar.svg"} alt="User Profile" />
                          <div className="ps-3">
                            <div className="text-base font-semibold">{data.reportedBy.name}</div>
                            <div className="font-normal text-gray-500">{data.reportedBy.email}</div>
                          </div>
                        </th>
                        <td className="px-6 py-4 break-all text-wrap whitespace-nowrap truncate">
                          <p className="text-wrap line-clamp-1">{data.reason}</p>
                        </td>
                        <td className="px-6 py-4 break-all text-wrap">
                          <p className="text-wrap line-clamp-1">{reportedData.content}</p>
                        </td>
                        <td className="px-6 py-4">{data.type}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3 items-center justify-start">
                            <button
                              type="button"
                              className="text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
                              onClick={() => {
                                router.push(`/dashboard/report-posts/detailReport/${data.id}`);
                              }}
                            >
                              Detail & Action
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="p-4 text-nowrap">No data</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="p-4 text-nowrap">No data</td>
                </tr>
              )
            ) : (
              <tr>
                <td className="p-4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
