import connectMongoDB from "../../../../../libs/mongoDB";
import Personal from "../../../../../models/Personal";
import { processData } from "../../../../../utils/dataProcessing";

export async function GET(request, { params }) {
  const { id, date } = params;
  await connectMongoDB();
  let activity = await Personal.findOne({ userid: id }, { activity: 1 });
  activity = await processData(activity, date);
  return Response.json({ response: activity }, { status: 200 });
}
