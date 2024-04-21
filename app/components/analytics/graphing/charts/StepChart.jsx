import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import LoadingComponent from "@/app/components/misc/LoadingComponent";
import { formatDataForStepChart } from "@/data/data_formatting";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

function StepChart(props) {
  const { unformattedData, step_data } = props;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData.length != 0 && step_data) {
        const formattedData = formatDataForStepChart(
          unformattedData,
          step_data
        );
        setData(formattedData);
      }
    };
    fetchData();
  }, [unformattedData, step_data]);

  if (!data) {
    return (
      <div className="text-bold font-large">
        <LoadingComponent />
      </div>
    );
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
        suggestedMax: 100,
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

  return data && <Line data={data} options={options} />;
}
export default StepChart;
