import connectMongoDB from "../../../../../../libs/mongoDB";
import Personal from "../../../../../../models/Personal";
import { processAlexaData } from "../../../../../../helpers/alexa_helpers";

export async function GET(request, { params }) {
  await connectMongoDB();

  const { id, date, timezone } = params;
  const startOfDay = new Date(date);
  startOfDay.setHours(timezone, 0, 0);
  const endOfDay = new Date(new Date(date).setDate(startOfDay.getDate() + 1));
  endOfDay.setHours(0, 0, 0);

  let events = await Personal.aggregate([
    {
      $match: {
        userid: id,
      },
    },
    {
      $project: {
        events: {
          $filter: {
            input: "$events",
            cond: {
              $and: [
                {
                  $gte: ["$$this.time", new Date(startOfDay.toISOString())],
                },
                {
                  $lt: ["$$this.time", new Date(endOfDay.toISOString())],
                },
              ],
            },
          },
        },
      },
    },
  ]);
  events = events.length > 0 ? events[0].events : [];
  events = await processAlexaData(events, date, timezone);
  return Response.json({ response: events }, { status: 200 });
}
