import AnalyticsClient from "@/app/components/analytics/graphing/AnalyticsClient";
import { getProfileInfoById, getAlexaInfoById } from "@/helpers/api_service";
import { countSteps } from "../../../../helpers/profile_helpers";

export default async function Analytics({ params }) {
  const initialDate = new Date(Date.now());
  const userid = String(params.userid);

  async function fetchData(date) {
    const [profileData, alexaData] = await Promise.all([
      getProfileInfoById(userid, date),
      getAlexaInfoById(userid, date),
    ]);

    const steps = countSteps(profileData);
    return { profileData, alexaData, steps };
  }

  try {
    const initialData = await fetchData(initialDate);
    return (
      <AnalyticsClient
        userid={userid}
        initialDate={initialDate}
        initialData={initialData}
        onDateChange={async (newDate) => {
          "use server";
          const [profileData, alexaData] = await Promise.all([
            getProfileInfoById(userid, newDate),
            getAlexaInfoById(userid, newDate),
          ]);
          const steps = countSteps(profileData);
          return { profileData, alexaData, steps };
        }}
      />
    );
  } catch (error) {
    console.error(
      "Error fetching user activity at analytics page root:",
      error
    );
    return (
      <div className="flex min-h-screen flex-col mb-5">
        <div className="font-semibold text-3xl ml-10 mr-2 mt-3 underline">
          {"Patient Analytics"}
        </div>
        <div className="ml-10 mt-3 font-bold text-3xl flex flex-row">
          {"Error retrieving user data. Please try again."}
        </div>
      </div>
    );
  }
}
