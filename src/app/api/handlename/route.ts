import { getHandlename } from "@/services/getHandlename";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const query = new URL(request.url).searchParams;
  const blogId = query.get("blogId");
  if (!blogId) {
    return NextResponse.json({ error: "userId not found" }, { status: 400 });
  }
  const ip = request.headers.get("x-forwarded-for");
  if (!ip) {
    return NextResponse.json(
      { error: "IP address not found" },
      { status: 400 },
    );
  }
  const blogIdNum = Number(blogId);
  if (isNaN(blogIdNum)) {
    return NextResponse.json(
      { error: "userId is not a number" },
      { status: 400 },
    );
  }

  const res = await getHandlename(blogIdNum, ip);
  return NextResponse.json({ handlename: res.handlename }, { status: 200 });
};
