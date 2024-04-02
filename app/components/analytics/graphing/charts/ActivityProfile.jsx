import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 8;

const formatDataForChart = (info) => {
  //Formats data for display in the activity doughnut chart. Categorizes all data into counts of each activity type in an array in a simple for loop. O(N) with N = length of activity_history.
  var activity_history = info;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0].probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }

  var empty_count = 0;
  var walking_count = 0;
  var running_count = 0;
  var jumping_count = 0;
  var sitting_standing_count = 0;
  var arm_count = 0;
  var falling_count = 0;
  for (let i = 0; i < activity_history?.length; i++) {
    var probabilities = activity_history[i]["probabilities"];
    var numbers = probabilities.map((value) => +value);
    var max = Math.max(...numbers);
    if (Number(activity_history[i]["probabilities"][0]) === max) {
      empty_count += 1;
    } else if (Number(activity_history[i]["probabilities"][1]) === max) {
      walking_count += 1;
    } else if (Number(activity_history[i]["probabilities"][2] === max)) {
      running_count += 1;
    } else if (Number(activity_history[i]["probabilities"][3] === max)) {
      jumping_count += 1;
    } else if (Number(activity_history[i]["probabilities"][4] === max)) {
      sitting_standing_count += 1;
    } else if (Number(activity_history[i]["probabilities"][6] === max)) {
      arm_count += 1;
    } else if (Number(activity_history[i]["probabilities"][7] === max)) {
      falling_count += 1;
    }
  }
  //Checking if counts are all zero and then displaying that no activity has been detected to the user.
  var isEmpty = false;
  if (empty_count == activity_history?.length) {
    isEmpty = true;
  }

  const labels = [
    "Walking",
    "Running",
    "Jumping",
    "Sitting/Standing",
    "Arm Exercises",
    "Falling",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Times Detected",
        data: [
          walking_count,
          running_count,
          jumping_count,
          sitting_standing_count,
          arm_count,
          falling_count,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    isEmpty: isEmpty,
  };

  return data;
};

function ActivityProfile(unformattedData) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      if (unformattedData != []) {
        const formattedData = formatDataForChart(
          unformattedData?.unformattedData
        );
        setData(formattedData);
      }
    };
    fetchData();
  }, [unformattedData.unformattedData]);

  if (!data) {
    return <div className="text-bold font-large">{"Loading..."}</div>;
  }

  return data && !data.isEmpty ? (
    <div className="h-container">
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
