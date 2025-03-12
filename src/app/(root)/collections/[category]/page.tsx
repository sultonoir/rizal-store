import FilterPage from "@/components/filter/filter-page";
import { capitalizeWords } from "@/lib/capitalize";
import { type PageDynamic } from "@/types";
import { type Metadata } from "next";
import React from "react";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: PageDynamic): Promise<Metadata> {
  const { category } = await params;
  const title = decodeURIComponent(category ?? "");
  const titleCapital = capitalizeWords(title);
  return {
    title: titleCapital,
  };
}

const Page = async (props: PageDynamic) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { category } = params;

  const title = decodeURIComponent(category ?? "");
  return (
    <FilterPage
      params={{ category }}
      searchParams={searchParams}
      title={title}
    />
  );
};

export default Page;
