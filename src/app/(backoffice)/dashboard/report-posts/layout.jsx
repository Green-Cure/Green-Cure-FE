"use client";

import { createContext, useState } from "react";

export const ReportDatasContext = createContext();

export const ReportDatasProvider = ({ children }) => {
  const [reportDatas, setReportDatas] = useState(null);
  const [loading, setLoading] = useState(true);

  return <ReportDatasContext.Provider value={{ setReportDatas, loading, reportDatas, setLoading }}>{children}</ReportDatasContext.Provider>;
};

export default function ReportPostsLayout({ children }) {
  return <ReportDatasProvider>{children}</ReportDatasProvider>;
}
