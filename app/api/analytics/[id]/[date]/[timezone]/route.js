import connectMongoDB from "../../../../../../libs/mongoDB";
import Activity from "../../../../../../models/Activity";
import { processUserData } from "../../../../../../helpers/profile_helpers";

export async function GET(request, { params }) {
  await connectMongoDB();
  const { id, date, timezone } = params;

  var startOfDay = new Date(new Date().getTime() - 3600000 * timezone);
  startOfDay.setUTCHours(timezone, 0, 0);

  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setHours(timezone);
  if (endOfDay.getTime() > new Date()) {
    endOfDay.setTime(new Date().getTime());
  }

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

  events = events.length > 0 ? events : [];
  events = await processUserData(events, date, timezone);
  return Response.json({ response: events }, { status: 200 });
}
