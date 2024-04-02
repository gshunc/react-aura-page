import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = (info, step_data) => {
  //Formats data by counting every walking or running event as steps. Step amounts are somewhat arbitrary and can be improved with better stats on walking rates and info about users. O(N) with N = length of activity_history.
  var activity_history = info;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  //Looping through all activity_history points and adding steps for running and walking.
  const step_array = step_data?.step_array;
  const times = step_data?.times;

  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Step Count",
        data: step_array,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return data;
};

function StepChart(props) {
  const { unformattedData, step_data } = props;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData.unformattedData != [] && step_data) {
        console.log(unformattedData.unformattedData);
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
