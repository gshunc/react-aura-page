"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
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

  var intervals = [];
  var colors = [];
  var borders = [];
  var times = [];
  for (let i = 0; i < activity_history?.length - 300; i += 300) {
    var empty_count = 0;
    var walking_count = 0;
    var running_count = 0;
    var jumping_count = 0;
    var sitting_standing_count = 0;
    var arm_count = 0;
    var falling_count = 0;
    for (let j = i; j < i + 300; j++) {
      var probabilities = activity_history[j]["probabilities"];
      var numbers = probabilities.map((value) => +value);
      var max = Math.max(...numbers);
      if (Number(activity_history[j]["probabilities"][0]) === max) {
        empty_count += 1;
      } else if (Number(activity_history[j]["probabilities"][1]) === max) {
        walking_count += 1;
      } else if (Number(activity_history[j]["probabilities"][2] === max)) {
        running_count += 1;
      } else if (Number(activity_history[j]["probabilities"][3] === max)) {
        jumping_count += 1;
      } else if (Number(activity_history[j]["probabilities"][4] === max)) {
        sitting_standing_count += 1;
      } else if (Number(activity_history[j]["probabilities"][6] === max)) {
        arm_count += 1;
      } else if (Number(activity_history[j]["probabilities"][7] === max)) {
        falling_count += 1;
      }
    }
    let active =
      walking_count + running_count + jumping_count + arm_count + falling_count;
    let inactive = empty_count + sitting_standing_count;
    let proportion = active / (active + inactive);
    if (proportion >= 0.66) {
      colors.push("rgba(75, 192, 192, 0.6)");
      borders.push("rgba(75, 192, 192, 1)");
    } else if (proportion >= 0.33) {
      colors.push("rgba(255, 240, 0, 0.6)");
      borders.push("rgba(255, 240, 0, 1)");
    } else {
      colors.push("rgba(255, 79, 120,0.6)");
      borders.push("rgba(255, 79, 120,1)");
    }
    intervals.push(proportion);
    times.push(formatDate(activity_history[i]["time"]));
  }

  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Activity Levels",
        data: intervals,
        borderColor: borders,
        backgroundColor: colors,
      },
    ],
  };
  return data;
};

function ActivityBar(selectedDate) {
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
  }, [selectedDate.selectedDate]);
  if (!data) {
    return <div className="text-bold font-large">{"Loading..."}</div>;
  }
  var options = {
    borderWidth: 1,
    borderRadius: 2,
    scales: {
      y: {
        max: 1,
        ticks: {
          callback: function (value, index, ticks) {
            return `${index * 10}%`;
          },
        },
        title: {
          display: true,
          text: "Percentage of Time Spent Active",
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
export default ActivityBar;
