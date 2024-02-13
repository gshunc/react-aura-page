"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
//import fakeData from "@/app/data/fakerdata";
import { pullData, formatDate } from "@/app/data/dataProcessing";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = async (info) => {
  var activity_history = info;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }
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
        const info = await pullData("debug1", selectedDate.selectedDate);
        const formattedData = await formatDataForChart(info, selectedDate);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedDate.selectedDate]);
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
    scales: {
      y: {
        min: 0,
        max: 1000,
      },
    },
  };

  return data && <Line data={data} options={options} />;
}
export default StepChart;
