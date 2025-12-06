import { deleteBlog } from "@/services/deleteBlog";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (
  _request: NextRequest,
  props: { params: Promise<{ blogId: string }> },
) => {
  try {
    const params = await props.params;
    const blogIdNum = parseInt(params.blogId);
    if (isNaN(blogIdNum)) {
      return NextResponse.json("BadRequest", { status: 400 });
    }
    await deleteBlog(blogIdNum);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
  return NextResponse.json({});
};
