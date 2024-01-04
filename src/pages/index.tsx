import Image from "next/image";
import { Inter } from "next/font/google";
import Book from "./book";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-full">
      <Book />
    </main>
  );
}
