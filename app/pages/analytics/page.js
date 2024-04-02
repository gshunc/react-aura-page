"use client";
import { useState, useEffect, Suspense } from "react";
import GraphBox from "../../components/analytics/graphing/GraphBox";
import StepChart from "../../components/analytics/graphing/charts/StepChart";
import StepBar from "../../components/analytics/graphing/charts/StepBar";
import ActivityBar from "../../components/analytics/graphing/charts/ActivityBar";
import ActivityProfile from "../../components/analytics/graphing/charts/ActivityProfile";
import DatePicker from "react-datepicker";
import {
  pullUserData,
  countSteps,
  pullAlexaData,
} from "../../../utils/dataProcessing";
import { useSearchParams, useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import AlexaInteractions from "../../components/alexa/AlexaInteractionsGraph";

function AnalyticsContent() {
  //Base component of project. Hosts all graphs, page header, etc. Also keeps track of date state from DatePicker.
  const [date, setDate] = useState(new Date(Date.now()));
  const [data, setData] = useState(null);
  const [alexaData, setAlexaData] = useState(null);
  const [steps, setSteps] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await pullUserData(userid, date);
        const alexaRes = await pullAlexaData(userid, date);
        setAlexaData(alexaRes);
        setData(res);
        setSteps(countSteps(res));
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
    data ? (
      <>
        <main className="flex min-h-screen flex-col mb-5">
          <div className="font-semibold text-3xl ml-10 mr-2 mt-3 underline">
            {"Patient Analytics"}
          </div>
          <div className="flex flex-row items-center mt-5">
            {" "}
            <div className="font-semibold text-lg ml-10 mr-2">{`Choose your date: `}</div>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              maxDate={new Date(Date.now())}
              className="rounded border-2 border-transparent hover:border-blue-900 focus:border-blue-900"
            />
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col space-y-5 mt-5">
              <GraphBox
                title={"Step Activity"}
                content={<StepBar unformattedData={data} step_data={steps} />}
              ></GraphBox>
              <GraphBox
                title={"Total Activity Level"}
                content={<ActivityBar unformattedData={data} />}
              ></GraphBox>
              <GraphBox
                title={"Alexa Interactions"}
                content={<AlexaInteractions unformattedData={alexaData} />}
              />
            </div>
            <div className="flex flex-col space-y-5 mt-5">
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
      <>
        <p>Loading...</p>
      </>
    )
  ) : (
    router.push("/")
  );
}

export default function Analytics() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalyticsContent />
    </Suspense>
  );
}
