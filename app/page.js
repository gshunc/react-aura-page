"use client";
import { useState, useEffect } from "react";
import GraphBox from "./components/GraphBox";
import StepChart from "./components/charts/StepChart";
import StepBar from "./components/charts/StepBar";
import ActivityBar from "./components/charts/ActivityBar";
import ActivityProfile from "./components/charts/ActivityProfile";
import Header from "./components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getName = async (id) => {
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
  const [date, setDate] = useState(new Date(Date.now()));
  const [name, setName] = useState("Loading...");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getName("debug1");
        setName(res?.response?.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-row items-center mt-5">
          <div className="font-bold text-lg ml-10">{`Welcome ${name}!`}</div>
          <div className="font-bold text-lg ml-10 mr-2">{`Choose your date: `}</div>
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
              isLarge={true}
              content={<StepBar selectedDate={date} />}
            ></GraphBox>
            <GraphBox
              title={"Total Activity Level"}
              isLarge={true}
              content={<ActivityBar selectedDate={date} />}
            ></GraphBox>
          </div>
          <div className="flex flex-col">
            <GraphBox
              title={`Total Daily Steps - ${formattedDate}`}
              isLarge={true}
              content={<StepChart selectedDate={date} />}
            ></GraphBox>
            <GraphBox
              title={"Activity Profile"}
              isLarge={true}
              content={<ActivityProfile selectedDate={date} />}
            ></GraphBox>
          </div>
          <div className="flex flex-col"></div>
        </div>
      </main>
    </>
  );
}
