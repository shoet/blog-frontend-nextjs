import { getSignedURL } from "@/services/getSignedURL";
import { putFileToSignedURL } from "@/services/putFileToSignedURL";
import { generateBase32EncodedUuid } from "@/utils/uuid";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("### start upload");
  const form = await request.formData();
  try {
    const blob = form.get("file") as Blob;
    const fileType = form.get("fileType")?.toString();
    const contentType = form.get("content-type") as string;
    console.log("### start upload");
    if (blob === null || contentType === null || !fileType) {
      return NextResponse.json(
        { message: "input is invalid" },
        { status: 400 },
      );
    }
    const fileName = generateBase32EncodedUuid();
    const newBlob = new Blob([blob], { type: contentType });
    const { uploadUrl, destinationUrl } = await getSignedURL(
      fileName,
      fileType,
    );
    await putFileToSignedURL(uploadUrl, newBlob);
    return NextResponse.json({ uploadUrl, destinationUrl }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
};
