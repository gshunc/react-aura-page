"use client";
import { useState, useEffect, Suspense } from "react";
import GraphBox from "../../components/graphing/GraphBox";
import StepChart from "../../components/graphing/charts/StepChart";
import StepBar from "../../components/graphing/charts/StepBar";
import ActivityBar from "../../components/graphing/charts/ActivityBar";
import ActivityProfile from "../../components/graphing/charts/ActivityProfile";
import NameLabel from "../../components/homeComponents/NameLabel";
import Header from "../../components/Header";
import DatePicker from "react-datepicker";
import { pullData, countSteps } from "../../../utils/dataProcessing";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

function HomeContent() {
  //Base component of project. Hosts all graphs, page header, etc. Also keeps track of date state from DatePicker.
  const [date, setDate] = useState(new Date(Date.now()));
  const [data, setData] = useState(null);
  const [steps, setSteps] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await pullData(userid, date);
        setSteps(countSteps(res));
        setData(res);
      } catch (error) {
        console.error("Error fetching user actvity", error);
      }
    };
    fetchActivity();
  }, [date, userid]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return userid !== "" ? (
    <>
      <main className="flex min-h-screen flex-col mb-5">
        <Header />
        <div className="flex flex-row items-center mt-5">
          <NameLabel userid={userid} />
          <div className="font-semibold text-lg ml-10 mr-2">{`Choose your date: `}</div>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            maxDate={new Date(Date.now())}
            className="rounded"
          />
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <GraphBox
              title={"Step Activity"}
              content={<StepBar unformattedData={data} step_data={steps} />}
            ></GraphBox>
            <GraphBox
              title={"Total Activity Level"}
              content={<ActivityBar unformattedData={data} />}
            ></GraphBox>
          </div>
          <div className="flex flex-col">
            <GraphBox
              title={`Total Daily Steps - ${formattedDate}`}
              content={<StepChart unformattedData={data} step_data={steps} />}
            ></GraphBox>
            <GraphBox
              title={"Activity Profile"}
              content={<ActivityProfile unformattedData={data} />}
            ></GraphBox>
          </div>
        </div>
      </main>
    </>
  ) : (
    router.push("/")
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
