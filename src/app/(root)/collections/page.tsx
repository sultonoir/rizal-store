import FilterPage from "@/components/filter/filter-page";
import { capitalizeWords } from "@/lib/capitalize";
import { type PageDynamic } from "@/types";
import { type Metadata } from "next";
import React from "react";

export const runtime = "edge";

export async function generateMetadata({
  searchParams,
}: PageDynamic): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? decodeURIComponent(q) : "All Products";
  const titleCapital = capitalizeWords(title);
  return {
    title: titleCapital,
  };
}

const Page = async (props: PageDynamic) => {
  const searchParams = await props.searchParams;

  const title = searchParams.q
    ? decodeURIComponent(searchParams.q)
    : "All Products";
  return <FilterPage searchParams={searchParams} title={title} />;
};

export default Page;
