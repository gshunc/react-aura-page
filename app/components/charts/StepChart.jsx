"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import fakeData from "@/app/data/fakerdata";

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
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hour12: false,
  });
  return formattedDate;
};

const formatDataForChart = async (info, selectedDate) => {
  //var activity_history = info?.response?.activity;
  var activity_history = info.activity;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  var current_date = selectedDate.selectedDate;
  if (current_date.getDate() != new Date(Date.now()).getDate()) {
    current_date.setHours(23, 59, 59, 999);
  }

  var midnight = new Date(current_date);
  midnight.setHours(0, 0, 0, 0);

  var difference = Math.floor((Date.now() - current_date) / 10000);
  var offset =
    activity_history.length -
    Math.floor((current_date - midnight.getTime()) / 10000);

  activity_history = activity_history.slice(
    offset - difference,
    activity_history.length - difference
  );

  var step_data = [];
  var times = [];
  var step_count = 0;
  for (let i = 0; i < activity_history?.length; i++) {
    var probabilities = activity_history[i]["probabilities"];
    var numbers = probabilities.map((value) => +value);
    var max = Math.max(...numbers);

    if (Number(activity_history[i]["probabilities"][1]) === max) {
      step_count += 8;
      step_data.push(step_count);
    } else if (Number(activity_history[i]["probabilities"][2] === max)) {
      step_count += 12;
      step_data.push(step_count);
    } else {
      step_data.push(step_count);
    }
    times.push(formatDate(activity_history[i]["time"]));
  }
  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Step Count",
        data: step_data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return data;
};

function StepChart(selectedDate) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const info = await getProfileInfoById("debug1");
        const info = fakeData;
        const formattedData = await formatDataForChart(info, selectedDate);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedDate]);
  if (!data) {
    return <div className="text-bold font-large">{"Loading..."}</div>;
  }
  var options = {
    spanGaps: true,
    datasets: {
      line: {
        pointRadius: 0,
      },
    },
  };

  return data && <Line data={data} options={options} />;
}
export default StepChart;
