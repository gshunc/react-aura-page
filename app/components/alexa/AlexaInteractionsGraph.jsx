import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import Link from "next/link";
import LoadingComponent from "../misc/LoadingComponent";
import { formatDataForAlexaGraph } from "@/data/data_formatting";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const AlexaInteractionsGraph = (props) => {
  const { userid, unformattedData } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (unformattedData) {
      if (unformattedData.length != 0) {
        var formattedData = formatDataForAlexaGraph(unformattedData);
      }
      setData(formattedData);
      setLoading(false);
    }
  }, [unformattedData]);

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
            href={`/pages/alexainteractions/${userid}`}
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
