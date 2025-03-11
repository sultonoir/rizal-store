import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export const HomeHero = () => {
  return (
    <div className="overflow-hidden bg-gray-100 dark:bg-background">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col px-4 md:flex-row">
        <div className="flex flex-1 flex-col items-center justify-center pt-10 md:items-start md:px-4 md:pt-0">
          <span
            data-aos="fade-down"
            data-aos-delay="200"
            className="mb-2.5 rounded-md bg-primary/20 px-4 py-1 text-sm font-semibold text-primary md:mb-5"
          >
            sale 70%
          </span>
          <h2
            data-aos="fade-right"
            data-aos-delay="300"
            className="mb-5 text-center text-[2.5rem] font-bold leading-tight text-foreground md:text-left md:text-5xl"
          >
            An Industrial Take on Streetwear
          </h2>
          <h3
            data-aos="fade-right"
            data-aos-delay="400"
            className="font-regular mb-5 text-center text-lg leading-tight text-muted-foreground md:mb-10 md:text-left"
          >
            Anyone can beat you but no one can beat your outfit as long as you
            wear Dine outfits.
          </h3>
          <Link
            href={"/"}
            data-aos="fade-up"
            data-aos-delay="500"
            className="mb-10 flex items-center rounded bg-zinc-900 px-8 py-2.5 text-base font-normal text-white shadow-sm shadow-zinc-500"
          >
            <ShoppingBag />
            <span className="ml-2">Start Shopping</span>
          </Link>
          <div
            className="mb-5 flex w-full flex-wrap justify-center md:justify-between"
            data-aos-delay="600"
            data-aos="fade"
          >
            {["bazaar", "bustle", "versace", "instyle"].map((brand, index) => (
              <Image
                priority
                key={index}
                src={`/${brand}.svg`}
                alt={`${brand} brand`}
                width={100}
                height={50}
                className={"mx-4 my-1"}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 items-end justify-start">
          <Image
            priority={true}
            src="/hero.webp"
            alt="hero"
            width={550}
            height={550}
            data-aos="fade-up"
          />
        </div>
      </div>
    </div>
  );
};
