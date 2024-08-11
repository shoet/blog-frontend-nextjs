import { getSignedURLForContent } from "@/services/getSignedURL";
import { putFileToSignedURL } from "@/services/putFileToSignedURL";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const form = await request.formData();
  try {
    const file = form.get("file") as File;
    const { signedUrl, putUrl } = await getSignedURLForContent(file.name);
    await putFileToSignedURL(signedUrl, file, file.type);
    return NextResponse.json({ putURL: putUrl }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
};
