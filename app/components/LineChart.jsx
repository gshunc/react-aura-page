"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import { CategoryScale, registerables } from "chart.js";

ChartJS.register(CategoryScale, ...registerables);

const getProfileInfoById = async (id) => {
  try {
    let res = await fetch(`http://localhost:3000/api/analytics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching information from user.");
    }
    return res.json();
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

const formatDataForChart = async (info) => {
  var activity_history = info?.response?.activity;
  if (
    !activity_history ||
    activity_history.length === 0 ||
    !activity_history[0]?.probabilities
  ) {
    throw new Error("Data is not available or incomplete");
  }
  var e_probabilities = [];
  var w_probabilities = [];
  var r_probabilities = [];
  var j_probabilities = [];
  var l_probabilities = [];
  var s_probabilities = [];
  var c_probabilities = [];
  var g_probabilities = [];
  var times = [];

  for (let i = 0; i < activity_history?.length; i++) {
    e_probabilities.push(Number(activity_history[i]["probabilities"][0]));
    w_probabilities.push(Number(activity_history[i]["probabilities"][1]));
    r_probabilities.push(activity_history[i]["probabilities"][2]);
    j_probabilities.push(activity_history[i]["probabilities"][3]);
    l_probabilities.push(activity_history[i]["probabilities"][4]);
    s_probabilities.push(activity_history[i]["probabilities"][5]);
    c_probabilities.push(activity_history[i]["probabilities"][6]);
    g_probabilities.push(activity_history[i]["probabilities"][7]);

    times.push(String(activity_history[i]["time"]));
  }
  const labels = times;
  const data = {
    labels,
    datasets: [
      {
        label: "Probabilities",
        data: e_probabilities,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return data;
};

function LineChart() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getProfileInfoById("debug1");
        const formattedData = await formatDataForChart(info);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (!data) {
    // You can return a loading indicator or null while data is being fetched
    return <div>{"Loading!"}</div>;
  }
  console.log(data);
  return data && <Line data={data} />;
}
export default LineChart;
