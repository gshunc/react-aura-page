"use client";
import HomeBox from "../../components/home/HomeBox";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

const getName = async (id) => {
  //Makes call to API to fetch username.
  try {
    let res = await fetch(`/api/user_info/${id}`, {
      cache: "no-store",
    });
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

const HomeContent = () => {
  const searchParams = useSearchParams();
  const userid = searchParams.get("userid") ?? "";
  const [username, setUsername] = useState("Loading...");
  const router = useRouter();
  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await getName(userid);
        setUsername(res?.response?.name);
      } catch (error) {
        console.error("Error fetching user actvity", error);
      }
    };
    fetchName();
  }, [userid]);

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
              href={`/pages/analytics?userid=${encodeURIComponent(userid)}`}
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
      </main>
    </>
  ) : (
    router.push("/")
  );
};

export default function Home() {
  return (
    <Suspense>
      <HomeContent></HomeContent>
    </Suspense>
  );
}
