import { GeistSans } from "geist/font/sans";
import Header from "./components/layoutComps/Header";
import "./globals.css";

const geist = GeistSans;

export const metadata = {
  title: "AURA Project",
  description: "AURA Project - UNC CS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
