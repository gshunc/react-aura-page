import GraphBox from "./components/GraphBox";
import LineChart from "./components/LineChart";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <GraphBox
              title={"Step Activity"}
              isLarge={true}
              content={<LineChart />}
            ></GraphBox>
            <GraphBox title={"Total Activity Level"} isLarge={true}></GraphBox>
          </div>
          <div className="flex flex-col">
            <GraphBox title={"Total Steps"}></GraphBox>
            <GraphBox title={"Standing Time"}></GraphBox>
          </div>
          <div className="flex flex-col">
            <GraphBox title={"Activity Profile"}></GraphBox>
          </div>
        </div>
      </main>
    </>
  );
}
