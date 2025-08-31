import type { Metadata } from "next";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { APP_DESCRIPTION, APP_TITLE } from "@/constant";
import clsx from "clsx";
import { Header } from "@/app/_components/Organisms/Header";
import { Footer } from "@/app/_components/Organisms/Footer";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={clsx("mx-auto max-w-[1280px]", "px-[16px]")}>
        <Header className={clsx("mt-[30px] mb-[20px]")} />
        <main className={clsx("h-full")}>{children}</main>
      </div>
      <Footer className={clsx("mt-[50px]")} />
    </div>
  );
}
