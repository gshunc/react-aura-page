import connectMongoDB from "../../../../libs/mongoDB";
import Personal from "../../../../models/Personal";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await Personal.findOne(
    { userid: id },
    { name: 1, timezone_offset: 1 }
  );
  if (!user) {
    return NextResponse.json({ response: "User not found" }, { status: 404 });
  }
  if (!user.name) {
    return NextResponse.json(
      { response: "Name not found for the user" },
      { status: 500 }
    );
  }
  return NextResponse.json({ response: user }, { status: 200 });
}
