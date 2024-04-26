import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import { formatDate } from "../../../utils/formatDate";
import LoadingComponent from "../misc/LoadingComponent";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = (info) => {
  var intervals = [];
  var times = [];
  info.forEach((element) => {
    intervals.push(element.count);
    times.push(formatDate(new Date(element.time)));
  });
  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Datapoints",
        data: intervals,
      },
    ],
  };

  return data;
};
const DataMonitoringGraph = (unformattedData) => {
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
          text: "# of Datapoints",
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
    (!loading ? <Bar data={data} options={options} /> : <LoadingComponent />)
  );
};
export default DataMonitoringGraph;
