import connectMongoDB from "../../../libs/mongoDB";
import Personal from "../../../models/Personal";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const activity = await Personal.findOne({ _id: id });
  return NextResponse.json({ activity });
}
