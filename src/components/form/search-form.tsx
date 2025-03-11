"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Search } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";

type HTMLFormProps = React.HTMLProps<HTMLFormElement>;

export function SearchForm({ className }: HTMLFormProps) {
  const router = useRouter();
  const handleSearch = async (formData: FormData) => {
    const q = formData.get("q")?.toString();
    if (!q) {
      return;
    }

    router.push(`/collections/?q=${q}`);
  };
  return (
    <Form className={cn(className)} action={handleSearch}>
      <Label htmlFor="Search product" className="sr-only">
        Search product
      </Label>
      <div className="relative">
        <Input
          id="Search product"
          className="peer pe-9 ps-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Search..."
          name="q"
          type="search"
          onFocus={() => router.prefetch("/collections")}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </Form>
  );
}
