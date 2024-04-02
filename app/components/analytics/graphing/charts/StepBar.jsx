import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import { formatDate } from "../../../../../utils/dataProcessing";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = (info, step_data) => {
  //Formats data for the step bar chart by binning step amounts into 15 minute sections.
  var activity_history = info;

  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  //Looping through activity_history to count step events, same as stepchart but adding .

  const step_array = step_data?.step_array;

  var intervals = [];
  var colors = [];
  var borders = [];
  var newTimes = [];
  for (let i = 0; i < activity_history?.length - 300; i += 300) {
    let increase = step_array[i + 300] - step_array[i];
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

function StepBar(props) {
  const { unformattedData, step_data } = props;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData != [] && step_data) {
        const formattedData = formatDataForChart(
          unformattedData.unformattedData,
          step_data
        );
        setData(formattedData);
      }
    };
    fetchData();
  }, [unformattedData, step_data]);
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
