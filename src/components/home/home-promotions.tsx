import Image from "next/image";
import Link from "next/link";

export const HomePromotions = () => {
  return (
    <div className="bg-accent">
      <div className="mx-auto flex flex-col items-center px-4 py-10 md:container">
        <span className="mb-4 text-sm font-bold uppercase text-violet-700 dark:text-white">
          Promotions
        </span>
        <h2 className="mb-6 text-center text-3xl font-bold text-black dark:text-white md:text-4xl">
          Our Promotions Events
        </h2>
        <div className="grid w-full max-w-[1150px] grid-cols-2 gap-3 md:grid-cols-4">
          <Link href="/" className="relative col-span-2">
            <Image
              priority
              src="/promo-banner-1.webp"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="promo banner 1 image"
            />
          </Link>
          <Link href="/" className="relative row-span-2">
            <Image
              priority
              src="/promo-banner-2.webp"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              alt="promo banner 2 image"
            />
          </Link>
          <Link href="/" className="relative row-span-2">
            <Image
              priority
              src="/promo-banner-3.webp"
              width={400}
              height={200}
              alt="promo banner 3 image"
            />
          </Link>
          <Link href="/" className="relative col-span-2">
            <Image
              priority
              src="/promo-banner-4.webp"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              alt="promo banner 4 image"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
