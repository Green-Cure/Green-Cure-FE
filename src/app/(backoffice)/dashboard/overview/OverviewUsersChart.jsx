"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function OverviewUsersChart({ users }) {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Users Graph",
      },
    },
  };

  const totalAccountsByMonth = calculateTotalAccounts(users, 6);
  const recentMonthsArray = generateRecentMonths(6);
  const chartData = {
    labels: recentMonthsArray,
    datasets: [
      {
        label: "Total Users",
        data: totalAccountsByMonth,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <>
      <div className="chart bg-gcNeutrals-baseWhite rounded-md h-full w-full">
        <Line options={options} data={chartData} className="h-full" />
      </div>
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
    const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(currentYear, currentMonth, 1));

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
