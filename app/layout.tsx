import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
