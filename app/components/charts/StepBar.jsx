"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import fakeData from "@/app/data/fakerdata";
import { pullData, formatDate } from "@/app/data/dataProcessing";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const getChartData = (activity_history) => {
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
  var intervals = [];
  var colors = [];
  var borders = [];
  var newTimes = [];
  for (let i = 0; i < activity_history?.length - 90; i += 90) {
    let increase = step_data[i + 90] - step_data[i];
    intervals.push(increase);
    newTimes.push(formatDate(activity_history[i]["time"]));
    if (increase >= 300) {
      colors.push("rgba(75, 192, 192, 0.6)");
      borders.push("rgba(75, 192, 192, 1)");
    } else if (increase >= 150) {
      colors.push("rgba(255, 240, 0, 0.6)");
      borders.push("rgba(255, 240, 0, 1)");
    } else {
      colors.push("rgba(255, 79, 120,0.6)");
      borders.push("rgba(255, 79, 120,1)");
    }
  }
  const labels = newTimes;
  const data = {
    labels,
    datasets: [
      {
        label: "Step Count",
        data: intervals,
        borderColor: borders,
        backgroundColor: colors,
      },
    ],
  };
  return data;
};

const formatDataForChart = async (info, selectedDate) => {
  var activity_history = info;
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
  activity_history = activity_history?.slice(
    offset - difference,
    activity_history.length - difference
  );
  return getChartData(activity_history);
};

function StepBar(selectedDate) {
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
  }, [selectedDate]);
  if (!data) {
    return <div className="text-bold font-large">{"Loading..."}</div>;
  }
  var options = {
    borderWidth: 1,
    borderRadius: 2,
    scales: {
      y: {
        min: 0,
        max: 1000,
        title: {
          display: true,
          text: "# of Steps",
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return data && <Bar data={data} options={options} />;
}
export default StepBar;
