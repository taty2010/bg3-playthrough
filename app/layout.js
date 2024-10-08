import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import Nav from "./components/nav";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Track your BG3 runs",
};

const icons = ["astarion", "gale", "karlach", "wyll", "shadowheart"];

const randomNum = (max) => {
  return Math.floor(Math.random() * max);
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: [dark, neobrutalism],
        variables: {
          colorBackground: "rgb(29 29 32 / 60%)",
          colorInputBackground: "rgb(29 29 32 / 60%)",
          colorTextSecondary: "white",
        },
        layout: {
          logoImageUrl: `../${icons[randomNum(5)]}.png`,
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
