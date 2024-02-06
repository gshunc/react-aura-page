"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const getProfileInfoById = async (id) => {
  try {
    let res = await fetch(`http://localhost:3000/api/analytics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching information from user.");
    }
    return res.json();
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

const formatDate = (raw_date) => {
  const str_date = String(raw_date);
  const formattedDate = new Date(str_date).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hour12: false,
  });
  return formattedDate;
};

const formatDataForChart = async (info) => {
  var activity_history = info?.response?.activity;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Step Activity Levels",
        data: intervals,
        backgroundColor: colors,
      },
    ],
  };
  return data;
};

function StepBar() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getProfileInfoById("debug1");
        const formattedData = await formatDataForChart(info);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (!data) {
    return <div className="text-bold font-large">{"Loading..."}</div>;
  }
  var options = {
    scales: {},
  };
  return data && <Bar data={data} options={options} />;
}
export default StepBar;
