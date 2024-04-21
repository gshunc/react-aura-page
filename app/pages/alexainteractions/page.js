"use client";
import DateComponent from "../../components/misc/DateComponent";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { pullAlexaInteractions } from "../../../service/api_service";
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
    <main>
      <div className="flex min-h-screen flex-col mb-5 ml-10">
        <div className="font-semibold text-3xl mr-2 mt-3 underline">
          {"Alexa Interactions"}
        </div>

        <DateComponent date={date} onChange={setDate} />
        <div className="font-heavy text-lg mr-2 mt-5 mb-5 w-128 text-gray-700 italic">
          {"Boxes contain descriptions of all Alexa interactions of patients."}
        </div>
        {data?.length != 0 ? (
          data?.map((entry) => {
            return (
              <AlexaBox
                date={entry?.time}
                content={entry.event}
                key={entry.time}
                userid={userid}
              />
            );
          })
        ) : (
          <div className="font-medium flex flex-col rounded-xl bg-carolina border-2 border-blue-900 bg-opacity-60 w-96 p-6 self-center justify-center text-center text-2xl text-gray-800">
            {"No user interactions with Alexa on this day"}
            <br></br>
            <br></br>
            <div className="font-medium">
              {"Check another date or engage with your Alexa"}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AlexaInteractions() {
  return (
    <Suspense fallback={"Loading..."}>
      <AlexaInteractionsContent />
    </Suspense>
  );
}
