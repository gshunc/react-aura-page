"use client";
import { useState, useEffect, Suspense } from "react";
import GraphBox from "../../components/analytics/graphing/GraphBox";
import StepChart from "../../components/analytics/graphing/charts/StepChart";
import StepBar from "../../components/analytics/graphing/charts/StepBar";
import ActivityBar from "../../components/analytics/graphing/charts/ActivityBar";
import ActivityProfileContainer from "../../components/analytics/graphing/ActivityProfileContainer";
import DateComponent from "../../components/misc/DateComponent";
import LoadingComponent from "../../components/misc/LoadingComponent";
import LoadingSpinner from "../../components/misc/LoadingSpinner";
import { getProfileInfoById, getAlexaInfoById } from "@/helpers/api_service";
import { countSteps } from "../../../helpers/profile_helpers";
import { useSearchParams, useRouter } from "next/navigation";
import AlexaInteractions from "../../components/alexa/AlexaInteractionsGraph";

function AnalyticsContent() {
  //Base component of project. Hosts all graphs, page header, etc. Also keeps track of date state from DatePicker.
  const [date, setDate] = useState(new Date(Date.now()));
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alexaData, setAlexaData] = useState(null);
  const [steps, setSteps] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const res = await getProfileInfoById(userid, date);
        const alexaRes = await getAlexaInfoById(userid, date);
        setData(res);
        setSteps(countSteps(res));
        setAlexaData(alexaRes);
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
            {"Patient Analytics"}
          </div>
          <div className="ml-10">
            <DateComponent date={date} onChange={setDate} />
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col space-y-5 mt-5">
              <GraphBox
                title={"Step Activity"}
                content={
                  !loading ? (
                    <StepBar unformattedData={data} step_data={steps} />
                  ) : (
                    <LoadingComponent />
                  )
                }
                about="This graph displays 15 minute intervals of steps. For example, if from 12:15-12:30, you had 200 steps, the height of the bar at 12:30 would be 200 steps."
              ></GraphBox>
              <GraphBox
                title={"Active Time"}
                content={
                  !loading ? (
                    <ActivityBar unformattedData={data} />
                  ) : (
                    <LoadingComponent />
                  )
                }
                about="This graph displays 15 minute intervals of activity (walking, running, jumping, arm exercises, standing). The height of the bar is the amount of time spent 'active' in that 15 minute interval."
              ></GraphBox>
              <GraphBox
                title={"Alexa Interactions"}
                content={
                  !loading ? (
                    <AlexaInteractions
                      unformattedData={alexaData}
                      userid={userid}
                    />
                  ) : (
                    <LoadingComponent />
                  )
                }
                about="This graph displays 15 minute intervals of Alexa Interactions. Please see the Alexa Visualizations page for more information about these interactions."
              />
            </div>
            <div className="flex flex-col space-y-5 mt-5">
              <GraphBox
                title={`Total Steps`}
                content={
                  !loading ? (
                    <StepChart unformattedData={data} step_data={steps} />
                  ) : (
                    <LoadingComponent />
                  )
                }
                about="This graph displays the cumulative step count over the course of the selected day for the user."
              ></GraphBox>
              <GraphBox
                title={"Activity Profile"}
                content={
                  !loading ? (
                    <>
                      <ActivityProfileContainer
                        unformattedData={data}
                        steps={steps}
                      />
                    </>
                  ) : (
                    <LoadingComponent />
                  )
                }
                about="This profile displays the proportions of the different activities that the user engaged in on the selected day."
              ></GraphBox>
            </div>
          </div>
        </main>
      </>
    ) : (
      <div className="flex min-h-screen flex-col mb-5">
        <div className="font-semibold text-3xl ml-10 mr-2 mt-3 underline">
          {"Patient Analytics"}
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

export default function Analytics() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <AnalyticsContent />
    </Suspense>
  );
}
