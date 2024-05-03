"use client";
import { useState, useEffect, Suspense } from "react";
import GraphBox from "../../components/analytics/graphing/GraphBox";
import DateComponent from "../../components/misc/DateComponent";
import LoadingComponent from "../../components/misc/LoadingComponent";
import LoadingSpinner from "../../components/misc/LoadingSpinner";
import { getMonitoringDataById } from "@/helpers/api_helpers";
import { useSearchParams, useRouter } from "next/navigation";
import DataMonitoringGraph from "@/app/components/monitoring/DataMonitoringGraph";
import DataMonitoringInformation from "@/app/components/monitoring/DataMonitoringInformation";

function DataCollectionContent() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const res = await getMonitoringDataById(userid, date);
        setData(res.response);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(
          "Error fetching user actvity at analytics page root:",
          error
        );
      }
    };
    fetchActivity();
  }, [date, userid]);

  if (error) {
    return (
      <div>
        {
          "There has been an error processing your user data. Please refer to the following information:"
        }
        {error.message + ""}
      </div>
    );
  }
  return userid !== "" ? (
    data ? (
      <>
        <main className="flex min-h-screen flex-col mb-5">
          <div className="font-semibold text-3xl ml-10 mr-2 mt-3 underline">
            {"Data Monitoring"}
          </div>
          <div className="ml-10">
            <DateComponent date={date} onChange={setDate} />
          </div>
          <div className="flex flex-row justify-around mt-5 ml-2 mr-2">
            <GraphBox
              title={"Data Collection"}
              content={
                !loading ? (
                  <DataMonitoringGraph data={data} />
                ) : (
                  <LoadingComponent />
                )
              }
              about="This graph displays 15 minute intervals of the number of datapoints collected."
            />
            <GraphBox
              title={"Data Collection Information"}
              content={<DataMonitoringInformation data={data} />}
            ></GraphBox>
          </div>
        </main>
      </>
    ) : (
      <div className="flex min-h-screen flex-col mb-5">
        <div className="font-semibold text-3xl ml-10 mr-2 mt-3 underline">
          {"Data Collection"}
        </div>
        <div className="ml-10 mt-3 font-bold text-3xl flex flex-row">
          {"Retrieving user data..."}
          <LoadingSpinner />
        </div>
      </div>
    )
  ) : (
    router.push("/")
  );
}

export default function DataCollection() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <DataCollectionContent />
    </Suspense>
  );
}
