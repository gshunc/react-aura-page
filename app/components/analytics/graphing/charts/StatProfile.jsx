import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import LoadingComponent from "@/app/components/misc/LoadingComponent";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

function StatProfile(props) {
  const { active_time, step_data } = props;

  if (!step_data) {
    return <div className="text-bold font-large">no steps</div>;
  }
  if (!active_time) {
    return <div className="text-bold font-large">no steps</div>;
  }

  if (!step_data) {
    return <LoadingComponent />;
  }

  const data = {
    datasets: [
      {
        label: "Active Time",
        data: [active_time, 1800 - active_time],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(128, 128, 128, 0.2)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(128, 128, 128, 1)"],
        borderWidth: 1,
        circumference: 360,
      },
      {
        label: "Steps",
        data: [step_data.step_count, 1000 - step_data.step_count],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(128, 128, 128, 0.2)",
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(128, 128, 128, 1)"],
        borderWidth: 1,
        circumference: (ctx) => {
          return 360;
        },
      },
    ],
  };

  return step_data && step_data.step_count > 0 ? (
    <>
      <div className="flex flex-col h-72 w-72 ml-4">
        {active_time <= 60 ? (
          <>
            <div className="text-xs min-h-5 w-fit pl-2 pr-2 bg-graph_pink/20 border-2 border-graph_pink rounded-sm">
              Active Time: {active_time} seconds
            </div>
          </>
        ) : (
          <div className="text-xs min-h-6 w-fit pl-2 pr-2 bg-graph_pink/20 border-2 border-graph_pink rounded-sm">
            Active Time: {Math.floor(active_time / 60)} minutes,{" "}
            {active_time % 60} seconds
          </div>
        )}
        <div className="text-xs mt-4 min-h-5 w-fit pl-2 pr-2 bg-graph_blue/20 border-2 border-graph_blue rounded-sm">
          Steps: {step_data.step_count}
        </div>
        <div className="self-center mt-3 max-h-56">
          <Doughnut
            data={data}
            options={{
              plugins: {
                legend: {
                  display: true,
                },
                tooltip: {
                  enabled: false,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  ) : (
    <div className="ml-4 min-h-full flex flex-col justify-center">
      <div className="bg-carolina/25 p-10 rounded-md border-blue-900 border-2">
        {"No steps detected!"}
      </div>
    </div>
  );
}
export default StatProfile;
