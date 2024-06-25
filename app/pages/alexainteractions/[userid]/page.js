import DateComponent from "../../../components/misc/DateComponent";
import { getAlexaInteractionsById } from "@/helpers/api_service";
import AlexaBox from "@/app/components/alexa/interactionVisualizations/AlexaBox";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUser = async (id) => {
  //Makes call to API to fetch username and timezone from user.
  try {
    let res = await fetch(`${baseURL}/api/user_info/${id}`, {
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

async function AlexaInteractionsContent(params) {
  const userid = params.userid;
  var date = new Date(Date.now());
  var user;
  var data = null;
  var userOffset;

  try {
    user = await getUser(userid);
    userOffset = Number(user?.response?.timezone_offset);
  } catch (error) {
    console.error(error);
  }

  try {
    if (userOffset) {
      const res = await getAlexaInteractionsById(userid, date, userOffset);
      data = res.response;
    }
  } catch (error) {
    console.error("Error fetching user actvity", error);
  }

  async function setDate(newDate) {
    "use server";
    date = new Date(newDate);
    user = await getUser(userid);
    userOffset = Number(user?.response?.timezone_offset);
    const res = await getAlexaInteractionsById(userid, date, userOffset);
    data = res.response;
  }

  return (
    <main>
      <div className="flex min-h-screen flex-col mb-5 ml-10">
        <div className="font-semibold text-3xl mr-2 mt-3 underline">
          {"Alexa Interactions"}
        </div>

        <DateComponent date={date} onChange={setDate} />
        <div className="font-heavy text-lg mr-2 mt-5 mb-5 w-128 text-gray-700 italic">
          {"Boxes contain descriptions of all Alexa interactions of patients."}
        </div>
        {data && data?.length != 0 ? (
          data?.map((entry) => {
            return (
              <AlexaBox
                date={entry?.time}
                content={entry.event}
                key={entry.time}
                userid={userid}
                offset={userOffset}
              />
            );
          })
        ) : (
          <div className="font-medium flex flex-col rounded-xl bg-carolina border-2 border-blue-900 bg-opacity-60 w-96 p-6 self-center justify-center text-center text-2xl text-gray-800">
            {"No user interactions with Alexa on this day"}
            <br></br>
            <br></br>
            <div className="font-medium">
              {"Check another date or engage with your Alexa"}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AlexaInteractions({ params }) {
  return <AlexaInteractionsContent userid={params.userid} />;
}
