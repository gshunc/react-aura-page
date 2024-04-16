import React from "react";
import { Chart as ChartJS } from "chart.js";
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

  return step_data && step_data.step_count > 0 ? (
    <>
      <div className="flex flex-col h-container w-72 text-6xl space-y-3 pl-5">
        <p className="text-xl font-bold">User Activity Stats</p>
        <p className="text-lg">Steps: {step_data.step_count}</p>
        {active_time <= 60 ? (
          <p className="text-lg">Active Time: {active_time} seconds</p>
        ) : (
          <p className="text-lg">Active Time: {active_time / 60} minutes</p>
        )}
      </div>
    </>
  ) : (
    <div className="min-h-full flex flex-col justify-center">
      <div className="bg-carolina/25 p-10 rounded-md border-blue-900 border-2">
        {"No steps detected!"}
      </div>
    </div>
  );
}
export default StatProfile;
