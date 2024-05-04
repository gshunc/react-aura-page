import connectMongoDB from "../../../../../../libs/mongoDB";
import Activity from "../../../../../../models/Activity";
import { processUserData } from "../../../../../../helpers/profile_helpers";

export async function GET(request, { params }) {
  await connectMongoDB();

  const { id, date, timezone } = params;
  var startOfDay = new Date(date);
  if (startOfDay.getHours() - timezone < 0) {
    startOfDay = new Date(startOfDay.getTime() - 86400000);
  }
  startOfDay.setHours(Number(timezone), 0, 0);
  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setHours(Number(timezone), 0, 0);

  let events = await Activity.aggregate([
    {
      $match: {
        "metadata.userid": id,
        time: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $project: {
        "metadata.userid": 1,
        probabilities: 1,
        time: 1,
      },
    },
  ]);
  console.log(events);

  events = events.length > 0 ? events : [];
  events = await processUserData(events, date, timezone);
  return Response.json({ response: events }, { status: 200 });
}
