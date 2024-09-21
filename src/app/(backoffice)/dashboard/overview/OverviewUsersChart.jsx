"use client";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function OverviewUsersChart({ users }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const totalAccountsByMonth = calculateTotalAccounts(users, 6);
    const recentMonthsArray = generateRecentMonths(6);
    setChartData({
      options: {
        chart: {
          id: "greencure-users-report",
        },
        xaxis: {
          categories: recentMonthsArray,
        },
      },
      series: [
        {
          name: "Total Users",
          data: totalAccountsByMonth,
        },
      ],
    });
  }, []);

  return (
    <>
      {users && chartData && (
        <div className="chart bg-white rounded-md w-full h-full">
          {chartData && chartData.series && chartData.options && (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={"100%"}
            />
          )}
        </div>
      )}
    </>
  );
}

function generateRecentMonths(monthCount) {
  const today = new Date();
  const result = [];

  for (let i = 0; i < monthCount; i++) {
    let currentMonth = today.getMonth() - i;
    let currentYear = today.getFullYear();

    // Handle cases where we need to wrap around to the previous year
    if (currentMonth < 0) {
      currentMonth += 12;
      currentYear -= 1;
    }

    // Get the full month name (e.g., "January")
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(new Date(currentYear, currentMonth, 1));

    // Combine month name and year
    const formattedDate = `${monthName}, ${currentYear}`;
    result.unshift(formattedDate); // Add to the beginning of the array
  }

  return result;
}

function calculateTotalAccounts(data, monthCount) {
  // Grouping data base on month
  const groupedData = {};
  data.forEach((account) => {
    const createdAt = new Date(account.createdAt);
    const monthYearKey = `${createdAt.getMonth()}-${createdAt.getFullYear()}`;
    if (!groupedData[monthYearKey]) {
      groupedData[monthYearKey] = 0;
    }
    groupedData[monthYearKey]++;
  });

  // Count total account for current month and previous month
  const currentDate = new Date();
  const result = [];
  for (let i = monthCount - 1; i >= 0; i--) {
    const targetDate = new Date(currentDate);
    targetDate.setMonth(targetDate.getMonth() - i);
    const targetMonthYearKey = `${targetDate.getMonth()}-${targetDate.getFullYear()}`;
    const currentMonthAccounts = groupedData[targetMonthYearKey] || 0;

    // Calculate previous month
    const prevMonthDate = new Date(targetDate);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthYearKey = `${prevMonthDate.getMonth()}-${prevMonthDate.getFullYear()}`;
    const prevMonthAccounts = groupedData[prevMonthYearKey] || 0;

    // Combine current and previous month accounts
    const totalAccounts = currentMonthAccounts + prevMonthAccounts;
    result.push(totalAccounts);
  }

  return result;
}
