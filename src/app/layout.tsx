import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="ja">{children}</html>;
}
