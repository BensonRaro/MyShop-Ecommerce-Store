import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
      <div className="md:space-y-6 flex md:flex-col gap-2 md:gap-0">
        <Link
          href={"/shop?category=Kids"}
          className="relative border rounded-lg md:rounded-none"
        >
          <Image
            src={"/images/kids.jpg"}
            alt="Kids Collection"
            width={500}
            height={500}
            className="rounded-t-lg md:rounded-lg w-full"
          />
          <p className="absolute left-6 bottom-2 md:bottom-6 md:text-white flex flex-col font-serif">
            <span className="text-xl md:text-2xl font-bold">
              Kid&apos; Fashion
            </span>
            {/* <span className="font-semibold text-sm sm:text-lg md:text-xl">
              Elevate your look with our stylish men's s shirts and T-shirt
            </span> */}
          </p>
        </Link>
        <Link href={"/shop?category=mens' Shirts"} className="relative">
          <Image
            src={"/images/men.jpg"}
            alt="men Collection"
            width={500}
            height={500}
            className="rounded-lg w-full"
          />
          <p className="absolute left-6 bottom-2 md:bottom-6 text-white flex flex-col font-serif">
            <span className="text-xl md:text-2xl font-bold">
              Men&apos; Shirts
            </span>
            <span className="font-semibold text-sm sm:text-lg md:text-xl">
              Elevate your look with our stylish mens&apos; s shirts and T-shirt
            </span>
          </p>
        </Link>
      </div>
      <div className="md:space-y-8 flex md:flex-col gap-2 md:gap-0">
        <Link href={"/shop?category=Men Collection"} className="relative">
          <Image
            src={"/images/mencollection.jpg"}
            alt="men Collection"
            width={400}
            height={400}
            className="rounded-lg w-full"
          />
          <p className="hero-p">Men Collection</p>
        </Link>
        <Link href={"/shop?category=Women Collection"} className="relative">
          <Image
            src={"/images/womencollection.jpg"}
            alt="women Collection"
            width={400}
            height={400}
            className="rounded-lg w-full"
          />
          <p className="hero-p">Women Collection</p>
        </Link>
      </div>
      <div className="relative hidden md:block">
        <Image
          src={"/images/girls.jpg"}
          className="rounded-lg w-full absolute h-fit xl:h-full"
          width={400}
          height={400}
          alt="girls Collection"
        />
        <p className="absolute left-6 bottom-6 text-white flex flex-col">
          <span className="text-xl md:text-2xl font-bold font-serif">
            Girl&apos; Fashion
          </span>
          <span className="font-semibold text-sm sm:text-lg md:text-xl">
            Every allure, wrapped in mystery
          </span>
          <Button className="rounded-full mt-4" asChild>
            <Link href={"shop?category=Girls' Top"}>Shop Now</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Hero;
