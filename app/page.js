import GraphBox from "./components/GraphBox";
import LineChart from "./components/LineChart";
import Header from "./components/Header";

const getProfileInfoById = async (id) => {
  try {
    let res = await fetch(`http://localhost:3000/api/analytics/?id=${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Error fetching information from user.");
    }
    return res.json();
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};
export default async function Home() {
  const info = JSON.stringify(
    await getProfileInfoById("655768647ec91b0002a9d8b2")
  );
  console.log(info);
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <GraphBox
              title={"Step Activity"}
              isLarge={true}
              content={<LineChart></LineChart>}
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
        <div>{info}</div>
      </main>
    </>
  );
}
