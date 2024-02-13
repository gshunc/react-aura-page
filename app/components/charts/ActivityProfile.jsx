"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import fakeData from "@/app/data/fakerdata";
import { pullData } from "@/app/data/dataProcessing";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = async (info, selectedDate) => {
  var activity_history = info;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0].probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }
  var current_date = selectedDate?.selectedDate;
  if (current_date?.getDate() != new Date(Date.now()).getDate()) {
    current_date?.setHours(23, 59, 59, 999);
  }
  var midnight = new Date(current_date);
  midnight.setHours(0, 0, 0, 0);
  var difference = Math.floor((Date.now() - current_date) / 3000);
  var offset =
    activity_history.length -
    Math.floor((current_date - midnight.getTime()) / 3000);
  activity_history = activity_history?.slice(
    offset - difference,
    activity_history.length - difference
  );

  var empty_count = 0;
  var walking_count = 0;
  var running_count = 0;
  var jumping_count = 0;
  var sitting_standing_count = 0;
  var arm_count = 0;
  var falling_count = 0;
  for (let i = 0; i < activity_history?.length; i++) {
    var probabilities = activity_history[i]["probabilities"];
    var numbers = probabilities.map((value) => +value);
    var max = Math.max(...numbers);
    if (Number(activity_history[i]["probabilities"][0]) === max) {
      empty_count += 1;
    } else if (Number(activity_history[i]["probabilities"][1]) === max) {
      walking_count += 1;
    } else if (Number(activity_history[i]["probabilities"][2] === max)) {
      running_count += 1;
    } else if (Number(activity_history[i]["probabilities"][3] === max)) {
      jumping_count += 1;
    } else if (Number(activity_history[i]["probabilities"][4] === max)) {
      sitting_standing_count += 1;
    } else if (Number(activity_history[i]["probabilities"][6] === max)) {
      arm_count += 1;
    } else if (Number(activity_history[i]["probabilities"][7] === max)) {
      falling_count += 1;
    }
  }
  const labels = [
    "Walking",
    "Running",
    "Jumping",
    "Sitting/Standing",
    "Arm Exercises",
    "Falling",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Times Detected",
        data: [
          walking_count,
          running_count,
          jumping_count,
          sitting_standing_count,
          arm_count,
          falling_count,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return data;
};

function ActivityProfile(selectedDate) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await pullData("debug1", selectedDate?.selectedDate);
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
    scales: {},
  };
  return (
    data && (
      <div className="h-container">
        <Doughnut data={data} options={options} />
      </div>
    )
  );
}
export default ActivityProfile;
