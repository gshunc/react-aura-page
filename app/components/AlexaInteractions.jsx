import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import { formatDate } from "../../utils/dataProcessing";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = (info) => {
  //Takes raw activity data and finds counts of different activities over 15 minute intervals for chart data. Complexity O(N), where N is length of activity history (up to 28800 data points).
  if (!info || info.length === 0) {
    throw new Error("Data is not available or incomplete");
  }

  //Creating arrays to track 15 minute intervals, assign colors and times to each interval.
  var intervals = [];
  var times = [];
  //Iterate through all data points to categorize.
  for (let i = 0; i < info?.length - 300; i += 300) {
    var count = 0;
    //Looping through in chunks of 300 data points = 15 minutes of real time. 300 3 second intervals = 900 1 second intervals = 15 minutes. Each index in probabilities is equal to one type of activity.
    for (let j = i; j < i + 300; j++) {
      count += info[j]["events"];
    }
    intervals.push(count);
    times.push(formatDate(info[i]["time"]));
  }
  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Alexa Interaction Counts",
        data: intervals,
      },
    ],
  };

  return data;
};
const AlexaInteractions = (unformattedData) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (unformattedData?.unformattedData) {
      if (unformattedData?.unformattedData.length != 0) {
        const formattedData = formatDataForChart(
          unformattedData?.unformattedData
        );
      }
      setData(formattedData);
    }
  }, [unformattedData?.unformattedData]);
  var options = {
    borderWidth: 1,
    borderRadius: 2,
    scales: {
      y: {
        title: {
          display: true,
          text: "# of Alexa Interactions",
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
  if (!data) {
    return <div className="text-bold font-large">{"Loading..."}</div>;
  }
  return data && <Bar data={data} options={options} />;
};
export default AlexaInteractions;
