import GraphBox from "./components/GraphBox";
import StepChart from "./components/charts/StepChart";
import StepBar from "./components/charts/StepBar";
import ActivityProfile from "./components/charts/ActivityProfile";
import Header from "./components/Header";
import generateTimeSeriesData from "./data/fakerdata";

export default function Home() {
  const currentDate = new Date(Date.now());
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <GraphBox
              title={"Step Activity"}
              isLarge={true}
              // content={<StepBar />}
            ></GraphBox>
            <GraphBox title={"Total Activity Level"} isLarge={true}></GraphBox>
          </div>
          <div className="flex flex-col">
            <GraphBox
              title={`Total Daily Steps - ${formattedDate}`}
              isLarge={true}
              content={<StepChart />}
            ></GraphBox>
            <GraphBox
              title={"Activity Profile"}
              isLarge={true}
              content={<ActivityProfile />}
            ></GraphBox>
          </div>
          <div className="flex flex-col"></div>
        </div>
      </main>
    </>
  );
}
