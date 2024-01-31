import connectMongoDB from "../../../libs/mongoDB";
import Personal from "../../../models/Personal";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const activity = await Personal.findOne({ _id: id }).project({ activity: 1 });
  return NextResponse.json({ response: activity }, { status: 200 });
}
