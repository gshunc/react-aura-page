import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import { formatDate } from "../../../../../utils/dataProcessing";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = (info) => {
  //Takes raw activity data and finds counts of different activities over 15 minute intervals for chart data. Complexity O(N), where N is length of activity history (up to 28800 data points).
  var activity_history = info;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    console.log("Activity Bar");
    throw new Error("Data is not available or incomplete");
  }

  //Creating arrays to track 15 minute intervals, assign colors and times to each interval.
  var intervals = [];
  var colors = [];
  var borders = [];
  var times = [];
  //Iterate through all data points to categorize.
  for (let i = 0; i < activity_history?.length - 300; i += 300) {
    var empty_count = 0;
    var walking_count = 0;
    var running_count = 0;
    var jumping_count = 0;
    var sitting_standing_count = 0;
    var arm_count = 0;
    var falling_count = 0;
    //Looping through in chunks of 300 data points = 15 minutes of real time. 300 3 second intervals = 900 1 second intervals = 15 minutes. Each index in probabilities is equal to one type of activity.
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

    //Finding proportion of active to inactive for Y variable in each bar.
    let active =
      walking_count + running_count + jumping_count + arm_count + falling_count;
    let inactive = empty_count + sitting_standing_count;
    let proportion = active / (active + inactive);

    //Categorizing color by proportion. Semi arbitrary, could be improved by user testing.
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

function ActivityBar(unformattedData) {
  //Activity level bar chart component. Fetches user data for the selected date and processes accordingly.
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData?.unformattedData) {
        const formattedData = formatDataForChart(
          unformattedData?.unformattedData
        );
        setData(formattedData);
      }
    };
    fetchData();
  }, [unformattedData.unformattedData]);
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
