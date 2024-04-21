import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import LoadingComponent from "@/app/components/misc/LoadingComponent";
import { formatDataForStepBar } from "@/data/data_formatting";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

function StepBar(props) {
  const { unformattedData, step_data } = props;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData.length != 0 && step_data) {
        const formattedData = formatDataForStepBar(unformattedData, step_data);
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
    borderWidth: 1,
    borderRadius: 2,
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
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + " Steps";
            }
            return label;
          },
        },
      },
    },
  };
  return data && <Bar data={data} options={options} />;
}
export default StepBar;
