"use client";
import DateComponent from "../../components/misc/DateComponent";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { pullAlexaData } from "../../../utils/dataProcessing";

export default function AlexaInteractions() {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";
  const [date, setDate] = useState(new Date(Date.now()));
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await pullAlexaData(userid, date);
        setData(res);
      } catch (error) {
        console.error("Error fetching user actvity", error);
      }
    };
    fetchActivity();
  }, [date, userid]);

  return (
    <>
      <main className="flex min-h-screen flex-col mb-5">
        <div className="font-semibold text-3xl ml-10 mr-2 mt-3 underline">
          {"Alexa Interactions"}
        </div>
        <DateComponent date={date} onChange={setDate} />
      </main>
    </>
  );
}
