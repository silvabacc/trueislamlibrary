import TrueIslam from "@/components/icons/trueislam.ico";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <Link
      className="flex ml-4 justify-center items-center space-x-2 cursor-pointer py-2"
      href="/"
    >
      <Image className="w-12 h-12 rounded" src={TrueIslam} alt="" />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        True Islam Library
      </h1>
      <span className="hidden md:inline self-end text-xs italic">
        Made by IslamBackup with love
      </span>
    </Link>
  );
}
