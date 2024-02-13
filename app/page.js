"use client";
import { useState, useEffect } from "react";
import GraphBox from "./components/GraphBox";
import StepChart from "./components/charts/StepChart";
import StepBar from "./components/charts/StepBar";
import ActivityBar from "./components/charts/ActivityBar";
import ActivityProfile from "./components/charts/ActivityProfile";
import Header from "./components/Header";
import DatePicker from "react-datepicker";
import { pullData } from "./data/dataProcessing";
import "react-datepicker/dist/react-datepicker.css";

const getName = async (id) => {
  //Makes call to API to fetch username.
  try {
    let res = await fetch(`/api/user_info/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching user data.");
    }
    return res.json();
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

export default function Home() {
  //Base component of project. Hosts all graphs, page header, etc. Also keeps track of date state from DatePicker.
  const [date, setDate] = useState(new Date(Date.now()));
  const [name, setName] = useState("Loading...");
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await getName("debug1");
        setName(res?.response?.name);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };
    fetchName();
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await pullData("debug1", date);
        setData(res);
      } catch (error) {
        console.error("Error fetching user actvity", error);
      }
    };
    fetchActivity();
  }, [date]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <>
      <main className="flex min-h-screen flex-col mb-5">
        <Header />
        <div className="flex flex-row items-center mt-5">
          <div className="font-bold text-2xl ml-10">{`Welcome ${name}!`}</div>
          <div className="font-semibold text-lg ml-10 mr-2">{`Choose your date: `}</div>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="rounded"
          />
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <GraphBox
              title={"Step Activity"}
              content={<StepBar unformattedData={data} />}
            ></GraphBox>
            <GraphBox
              title={"Total Activity Level"}
              content={<ActivityBar unformattedData={data} />}
            ></GraphBox>
          </div>
          <div className="flex flex-col">
            <GraphBox
              title={`Total Daily Steps - ${formattedDate}`}
              content={<StepChart unformattedData={data} />}
            ></GraphBox>
            <GraphBox
              title={"Activity Profile"}
              content={<ActivityProfile unformattedData={data} />}
            ></GraphBox>
          </div>
        </div>
      </main>
    </>
  );
}
