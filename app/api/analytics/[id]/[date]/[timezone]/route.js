import connectMongoDB from "../../../../../../libs/mongoDB";
import Personal from "../../../../../../models/Personal";

export async function GET(request, { params }) {
  await connectMongoDB();
  const { id, date, timezone } = params;

  // Convert the date string to a Date object
  const dateObj = new Date(date);

  // Set the timezone offset
  const timezoneOffset = timezone * 60 * 60 * 1000; // Convert hours to milliseconds

  // Calculate the start of the day in ISO format
  const startOfDay = new Date(dateObj.getTime() + timezoneOffset);
  startOfDay.setHours(0, 0, 0, 0);

  // Calculate the end of the day in ISO format
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

  const user = await Personal.aggregate([
    { $match: { userid: id } },
    { $unwind: { path: "$activity" } },
    {
      $match: {
        "activity.time": {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    { $project: { _id: 0, activity: 1 } },
  ]);

  const activity = user ? user.map((a) => a.activity) : [];
  return Response.json({ response: activity }, { status: 200 });
}
