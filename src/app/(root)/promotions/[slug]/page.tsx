import ProductCard from "@/components/product/product-card";
import { capitalizeWords } from "@/lib/capitalize";
import { getPromoByslug } from "@/server/promo/promo-service";
import { Image } from "@unpic/react/nextjs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const runtime = "edge";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const promo = await getPromoByslug({ slug });

  if (!promo) {
    return notFound();
  }

  return {
    title: `Promo ${capitalizeWords(promo.title)}`,
    openGraph: { title: capitalizeWords(promo.title), description: promo.desc },
  };
}

const page = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const promo = await getPromoByslug({ slug });

  if (!promo) {
    return notFound();
  }
  return (
    <div className="flex min-h-screen flex-col space-y-5 py-5">
      <div className="mx-auto max-w-screen-lg px-10">
        <Image
          src={promo.image}
          alt={promo.title}
          width={900}
          height={300}
          className="rounded-2xl"
          priority
          layout="constrained"
          background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAA8fHx6ejo4uHh6ujo8/Ly6+rq5OPj6+rq9fT08fDw7u3t8vHx"
        />
      </div>
      <div className="container space-y-5">
        <h1 className="text-center font-bold uppercase ~text-lg/3xl">
          Promo {promo.title}
        </h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {promo.product.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
