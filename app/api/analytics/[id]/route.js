import connectMongoDB from "../../../libs/mongoDB";
import Personal from "../../../../models/Personal";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const activity = await Personal.findOne({ userid: id }, { activity: 1 });
  return NextResponse.json({ response: activity }, { status: 200 });
}
