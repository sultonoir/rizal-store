import HomeEmailSubscription from "@/components/home/home-email-subscribe";
import HomeCategory from "@/components/home/home-category";
import HomeFlow from "@/components/home/home-flow";
import { HomePromotions } from "@/components/home/home-promotions";
import ProductCarousel from "@/components/product/product-carousel";
import React, { Suspense } from "react";
import PromoHero from "@/components/promo/promo-hero";
import { getPromotions } from "@/server/promo/promo-service";

const Page = async () => {
  const promotions = await getPromotions()
  return (
    <main className="min-h-screen space-y-10 py-5">
      <HomePromotions />
      <div className="container space-y-10">
        <ProductCarousel />
        <PromoHero hero={promotions}/>
      </div>
      <section className="container space-y-10">
        <HomeFlow />
        <HomeCategory />
        <Suspense>
          <ProductCarousel sort="most-rating" title="Best Sellers Alert!" />
        </Suspense>
      </section>
      <div className="container flex flex-col gap-10">
        <HomeEmailSubscription />
      </div>
    </main>
  );
};

export default Page;
