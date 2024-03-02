import connectMongoDB from "../../../../../../libs/mongoDB";
import Personal from "../../../../../../models/Personal";
import { processData } from "../../../../../../utils/dataProcessing";

export async function GET(request, { params }) {
  const { id, date, timezone } = params;
  await connectMongoDB();
  let activity = await Personal.findOne({ userid: id }, { activity: 1 });
  console.log(activity);
  activity = await processData(activity, date, timezone);
  return Response.json({ response: activity }, { status: 200 });
}
