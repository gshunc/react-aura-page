import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import { formatDate } from "../../../utils/formatDate";
import Link from "next/link";
import LoadingComponent from "../misc/LoadingComponent";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = (info) => {
  //Takes raw activity data and finds counts of different activities over 15 minute intervals for chart data. Complexity O(N), where N is length of activity history (up to 28800 data points).

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
const AlexaInteractionsGraph = (unformattedData, userid) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    if (unformattedData) {
      if (unformattedData.unformattedData?.length != 0) {
        var formattedData = formatDataForChart(
          unformattedData?.unformattedData
        );
      }
      setData(formattedData);
      setLoading(false);
    }
  }, [unformattedData, unformattedData?.unformattedData]);
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
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
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
    return (
      <div className="text-bold font-large">
        <LoadingComponent />
      </div>
    );
  }
  return (
    data &&
    (!loading ? (
      <div className="w-full h-full flex flex-col items-center">
        <Bar data={data} options={options} />{" "}
        <div>
          <Link
            href={`/pages/alexainteractions?userid=${encodeURIComponent(
              userid
            )}`}
            className="underline text-blue-900"
          >
            {"View Alexa Interaction Breakdown"}
          </Link>
        </div>
      </div>
    ) : (
      <LoadingComponent />
    ))
  );
};
export default AlexaInteractionsGraph;
