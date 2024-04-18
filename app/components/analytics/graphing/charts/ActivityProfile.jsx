import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";
import LoadingComponent from "@/app/components/misc/LoadingComponent";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

function ActivityProfile(props) {
  const { data } = props;

  if (!data) {
    return (
      <div className="text-bold font-large">
        <LoadingComponent />
      </div>
    );
  }

  return data && !data.isEmpty ? (
    <div className="h-container border-r-2 border-blue-900">
      <Doughnut data={data} options={{}} />
    </div>
  ) : (
    <div className="min-h-full flex flex-col justify-center">
      <div className="bg-carolina/25 p-10 rounded-md border-blue-900 border-2">
        {"No activity detected!"}
      </div>
    </div>
  );
}
export default ActivityProfile;
