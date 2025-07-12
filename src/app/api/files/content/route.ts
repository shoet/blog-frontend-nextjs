import { getSignedURLForContent } from "@/services/getSignedURL";
import { putFileToSignedURL } from "@/services/putFileToSignedURL";
import { generateBase32EncodedUuid } from "@/utils/uuid";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const form = await request.formData();
  try {
    const blob = form.get("file") as Blob;
    const contentType = form.get("content-type") as string;
    if (blob === null || contentType === null) {
      return NextResponse.json(
        { message: "input is invalid" },
        { status: 400 },
      );
    }
    const fileName = generateBase32EncodedUuid();
    const newBlob = new Blob([blob], { type: contentType });
    const fileType = contentType.split("/")[1];
    const { signedUrl, putUrl } = await getSignedURLForContent(
      `${fileName}.${fileType}`,
    );
    await putFileToSignedURL(signedUrl, newBlob);
    return NextResponse.json({ putURL: putUrl }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
};
