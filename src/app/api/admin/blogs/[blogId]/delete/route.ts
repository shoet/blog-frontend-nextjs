import { deleteBlog } from "@/services/deleteBlog";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { blogId: number } },
) => {
  try {
    await deleteBlog(params.blogId);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  return NextResponse.json({});
};
