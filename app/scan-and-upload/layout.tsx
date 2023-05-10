import "@/styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "BOON - The FinOps Platform for MM and SMB Fleet Customers",
  description:
    "BOON - The FinOps Platform for MM and SMB Fleet Customers. Streamline expense management, spend controls, and fleet insights with a modern and seamless UI/UX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
