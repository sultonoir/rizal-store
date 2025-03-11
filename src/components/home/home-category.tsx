"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import AnimatedBackground from "../ui/animated-background";

const HomeCategory = () => {
  const lists = [
    {
      name: "Shoes",
      path: "/collections/accessories/shoes",
      bgImage: "/explore1.svg",
      image: "/2.jpg",
      totalProcuts: "155 products",
    },
    {
      name: "T-shirt",
      path: "/collections/t-shirt",
      bgImage: "/explore2.svg",
      image: "/4.jpg",
      totalProcuts: "141 products",
    },
    {
      name: "Outwear",
      path: "/collections/outwear",
      bgImage: "/explore3.svg",
      image: "/3.jpg",
      totalProcuts: "133 products",
    },
    {
      name: "Pants",
      path: "/collections/pants",
      bgImage: "/explore4.svg",
      image: "/5.jpg",
      totalProcuts: "142 products",
    },
    {
      name: "Shirt",
      path: "/collections/shirt",
      bgImage: "/explore5.svg",
      image: "/1.jpg",
      totalProcuts: "144 products",
    },
    {
      name: "Bag",
      path: "/collections/accessories/bags",
      bgImage: "/explore6.svg",
      image: "/6.jpg",
      totalProcuts: "149 products",
    },
  ];
  return (
    <div className="flex flex-col space-y-5">
      <p className="font-bold ~text-2xl/3xl">
        Mix & Match your preferred category!
      </p>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
        <AnimatedBackground
          className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6,
          }}
          enableHover
        >
          {lists.map((list) => (
            <div
              key={list.name}
              className="relative isolate z-10 flex flex-col gap-3 p-2"
              data-id={`card-${list.name}`}
            >
              <Image
                src={list.image}
                alt={list.name}
                width={150}
                height={150}
                priority
                className="aspect-square size-full rounded-lg"
              />
              <p className="text-center">
                <Link href={list.path}>
                  <span className="absolute inset-0 z-10"></span>
                  {list.name}
                </Link>
              </p>
            </div>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
};

export default HomeCategory;
