import { deleteBlog } from "@/services/deleteBlog";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  props: { params: Promise<{ blogId: number }> },
) => {
  try {
    const params = await props.params;
    await deleteBlog(params.blogId);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  return NextResponse.json({});
};
