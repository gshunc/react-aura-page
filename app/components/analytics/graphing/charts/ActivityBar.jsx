import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import LoadingComponent from "@/app/components/misc/LoadingComponent";
import { formatDataForActivityBar } from "@/data/data_formatting";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

function ActivityBar(unformattedData) {
  //Activity level bar chart component. Fetches user data for the selected date and processes accordingly.
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData.unformattedData?.length != 0) {
        const formattedData = formatDataForActivityBar(
          unformattedData.unformattedData
        );
        setData(formattedData);
      }
    };
    fetchData();
  }, [unformattedData.unformattedData]);
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
        suggestedMax: 3,
        min: 0,
        ticks: {
          callback: function (value, index, ticks) {
            return value > 0.999999
              ? `${value} minutes`
              : `${value * 60} seconds`;
          },
        },
        title: {
          display: true,
          text: "Time Spent Active Per 15 Minute Period",
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
            if (context.parsed.y !== null && context.parsed.y > 1) {
              label += context.parsed.y + " Minutes";
            } else if (context.parsed.y !== null && context.parsed.y == 1) {
              label += context.parsed.y + " Minute";
            } else {
              label += context.parsed.y * 60 + " Seconds";
            }
            return label;
          },
        },
      },
    },
  };

  return data && <Bar data={data} options={options} />;
}
export default ActivityBar;
