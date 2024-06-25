import HomeBox from "../../../components/home/HomeBox";
import { redirect } from "next/navigation";
import Link from "next/link";

const getUser = async (id) => {
  //Makes call to API to fetch username and timezone from user.
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    let res = await fetch(`${baseURL}/api/user_info/${encodeURIComponent(id)}`);
    if (!res.ok) {
      throw new Error("Error fetching user data.");
    }
    return res.json();
  } catch (error) {
    console.error("Error in getProfileInfoById:", error);
    throw new Error(
      "Error fetching information about user. Details: " + error.message
    );
  }
};

function AnalyticsContent({ name }) {
  return (
    <div className="flex flex-col align-center justify-center mb-5 ml-3 mr-3 text-center">
      <div>
        {"Patient data and activity visualizations for "}
        {name}
        {"."}
      </div>
      <div className="mt-5">
        {
          "Visualizations include step counts, activity levels, classificiations of activity, and number of Alexa interactions"
        }
      </div>
    </div>
  );
}

function AlexaContent({ name }) {
  return (
    <div className="flex flex-col align-center justify-center mb-5 ml-3 mr-3 text-center">
      <div>
        {"Alexa interaction visualizations, statistics, and breakdowns for "}
        {name}
        {"."}
      </div>
    </div>
  );
}

export default async function Home({ params }) {
  const userid = String(params.userid);
  let res;
  try {
    res = await getUser(userid);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return redirect("/");
  }
  const username = res?.response?.name;
  return userid !== "" ? (
    <>
      <main className="flex min-h-screen flex-col mb-5">
        <div className="font-bold text-3xl ml-10 mr-2 mt-3 underline">
          {"Home"}
        </div>
        <div className="mt-5">
          <div className="mt-5 ml-5 mr-5 w-page flex flex-row justify-around">
            <Link
              className="rounded-lg border-2 hover:border-blue-900 max-h-{min}"
              href={`/pages/analytics/${userid}`}
            >
              <HomeBox
                title={"Patient Analytics"}
                content={<AnalyticsContent name={username} />}
              />
            </Link>
            <Link
              className="rounded-lg border-2 hover:border-blue-900 max-h-{min}"
              href={`/pages/alexainteractions?userid=${encodeURIComponent(
                userid
              )}`}
            >
              <HomeBox
                title={"Alexa Interactions"}
                content={<AlexaContent name={username} />}
              />
            </Link>
          </div>
        </div>
        <div className="mt-5 ml-5 mr-5 w-page flex flex-row justify-around">
          <Link
            className="rounded-lg border-2 hover:border-blue-900 max-h-{min}"
            href={`/pages/datacollection?userid=${encodeURIComponent(userid)}`}
          >
            <HomeBox
              title={"Data Collection Monitoring"}
              content={
                <div className="self-center">{`Tools for monitoring patient data collection.`}</div>
              }
            />
          </Link>
        </div>
      </main>
    </>
  ) : (
    redirect("/")
  );
}
