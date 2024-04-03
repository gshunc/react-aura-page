"use client";
import DateComponent from "../../components/misc/DateComponent";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { pullAlexaInteractions } from "../../../utils/dataProcessing";
import AlexaBox from "@/app/components/alexa/interactionVisualizations/AlexaBox";

function AlexaInteractionsContent() {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";
  const [date, setDate] = useState(new Date(Date.now()));
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setData(null);
        const res = await pullAlexaInteractions(userid, date);
        setData(res);
      } catch (error) {
        console.error("Error fetching user actvity", error);
      }
    };
    fetchActivity();
  }, [date, userid]);

  return (
    <>
      <main className="flex min-h-screen flex-col mb-5 ml-10">
        <div className="font-semibold text-3xl mr-2 mt-3 underline">
          {"Alexa Interactions"}
        </div>

        <DateComponent date={date} onChange={setDate} />
        <div className="font-heavy text-lg mr-2 mt-5 mb-5 w-128">
          {"Boxes contain descriptions of all Alexa interactions of patients."}
        </div>
        {data?.map((entry) => {
          return (
            <AlexaBox
              date={entry?.time}
              content={entry.event}
              key={entry.time}
            />
          );
        })}
      </main>
    </>
  );
}

export default function AlexaInteractions() {
  return (
    <Suspense fallback={"Loading..."}>
      <AlexaInteractionsContent />
    </Suspense>
  );
}
