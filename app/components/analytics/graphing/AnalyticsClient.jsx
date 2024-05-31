"use client";
import GraphBox from "../../../components/analytics/graphing/GraphBox";
import StepChart from "../../../components/analytics/graphing/charts/StepChart";
import StepBar from "../../../components/analytics/graphing/charts/StepBar";
import ActivityBar from "../../../components/analytics/graphing/charts/ActivityBar";
import ActivityProfileContainer from "../../../components/analytics/graphing/ActivityProfileContainer";
import DateComponent from "../../../components/misc/DateComponent";
import LoadingSpinner from "../../../components/misc/LoadingSpinner";
import AlexaInteractions from "../../../components/alexa/AlexaInteractionsGraph";

export default function AnalyticsClient({
  userid,
  date,
  data,
  alexaData,
  steps,
  setDate,
}) {
  return data ? (
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
              content={<StepBar unformattedData={data} step_data={steps} />}
              about="This graph displays 15 minute intervals of steps. For example, if from 12:15-12:30, you had 200 steps, the height of the bar at 12:30 would be 200 steps."
            ></GraphBox>
            <GraphBox
              title={"Active Time"}
              content={<ActivityBar unformattedData={data} />}
              about="This graph displays 15 minute intervals of activity (walking, running, jumping, arm exercises, standing). The height of the bar is the amount of time spent 'active' in that 15 minute interval."
            ></GraphBox>
            <GraphBox
              title={"Alexa Interactions"}
              content={
                <AlexaInteractions
                  unformattedData={alexaData}
                  userid={userid}
                />
              }
              about="This graph displays 15 minute intervals of Alexa Interactions. Please see the Alexa Visualizations page for more information about these interactions."
            />
          </div>
          <div className="flex flex-col space-y-5 mt-5">
            <GraphBox
              title={`Total Steps`}
              content={<StepChart unformattedData={data} step_data={steps} />}
              about="This graph displays the cumulative step count over the course of the selected day for the user."
            ></GraphBox>
            <GraphBox
              title={"Activity Profile"}
              content={
                <>
                  <ActivityProfileContainer
                    unformattedData={data}
                    steps={steps}
                  />
                </>
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
  );
}
