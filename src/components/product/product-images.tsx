"use client";

import { Lens } from "@/components/ui/lens";
import { type ProductImage } from "@prisma/client";
import React from "react";
import { Image } from "@unpic/react/nextjs";

type Props = {
  images: ProductImage[];
};

export const ProductImages = ({ images }: Props) => {
  const [picture, setPicture] = React.useState(images[0]!);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <Lens className="aspect-square h-auto w-full">
        <Image
          src={picture.url}
          alt={picture.id}
          width={713}
          height={713}
          layout="constrained"
          priority={true}
          background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAA8fHx6ejo4uHh6ujo8/Ly6+rq5OPj6+rq9fT08fDw7u3t8vHx"
          className="rounded-lg object-cover"
        />
      </Lens>
      <div className="grid w-full grid-cols-4 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={image.url}
              alt={image.id}
              width={180}
              height={180}
              onMouseEnter={() => setPicture(image)}
              onClick={() => setPicture(image)}
              background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAA8fHx6ejo4uHh6ujo8/Ly6+rq5OPj6+rq9fT08fDw7u3t8vHx"
              className="aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
