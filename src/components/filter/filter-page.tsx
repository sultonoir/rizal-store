"use client";

import {
  type SearchProduct,
  type ProductCard as ProductCardProps,
  type SearchProductsClient,
} from "@/types";
import React, { useEffect, useState } from "react";
import FilterHeader from "../filter/filter-header";
import { PaginationWithLinks } from "@/components/ui/pagination-with-link";
import ProductCard from "../product/product-card";
import ProductLoading from "@/components/product/product-loading";
import { ProductNotFound } from "../product/product-notfound";

type ProductGridProps = {
  products: ProductCardProps[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <div className="flex h-full flex-col gap-4">
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  </div>
);

type SearchResultProps = {
  status: "pending" | "error" | "success";
  data?: SearchProduct;
  title: string;
};

const SearchResult: React.FC<SearchResultProps> = ({ status, data, title }) => {
  if (status === "pending") {
    return (
      <ProductLoading className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4" />
    );
  }

  if (status === "error" || !data?.products || data.products.length === 0) {
    return <ProductNotFound title={title} recommend={data?.recommend ?? []} />;
  }

  return (
    <>
      <ProductGrid products={data.products} />
      <PaginationWithLinks
        totalCount={data.pagination.total}
        pageSize={data.pagination.limit}
        page={data.pagination.current}
      />
    </>
  );
};

export default function FilterPage({
  searchParams,
  title,
  params,
}: SearchProductsClient) {
  const [data, setData] = useState<SearchProduct | undefined>(undefined);
  const [status, setStatus] = useState<"pending" | "error" | "success">(
    "pending",
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("pending");
      try {
        const queryObject: Record<string, string> = {};

        // Menambahkan `searchParams` ke `queryObject` tanpa mengubah tipe data
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryObject[key] = String(value);
          }
        });

        // Menambahkan `params` hanya jika ada nilainya
        if (params?.category) queryObject["category"] = params.category;
        if (params?.subcategory)
          queryObject["subcategory"] = params.subcategory;

        // Buat query string hanya dengan parameter yang ada
        const query = new URLSearchParams(queryObject).toString();

        const response = await fetch(`/api/products?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json<SearchProduct>();
        setData(result);
        setStatus("success");
      } catch (error) {
        if (error instanceof Error) {
          setData(undefined);
          setStatus("error");
        }
        setData(undefined);
        setStatus("error");
      }
    };

    fetchProducts();
  }, [searchParams, params]);

  return (
    <main className="flex min-h-[calc(100dvh-130px)] w-full flex-col gap-3">
      <FilterHeader title={title} count={data?.pagination?.total ?? 0} />
      <SearchResult status={status} data={data} title={title} />
    </main>
  );
}
