"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { User2 } from "lucide-react";

export function SigninForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") ?? "/";
  const router = useRouter();
  const handleSubmit = async () => {
    await authClient.signIn.email(
      {
        email: "",
        password: "",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess() {
          router.refresh();
        },
      },
    );
  };

  const signIn = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onResponse: () => {
          setPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex items-center justify-center rounded-md">
            <Image src="/logo.png" alt="logo" width={50} height={50} priority />
          </div>
          <span className="sr-only">Rizal Store.</span>
        </a>
        <h1 className="text-xl font-bold">Welcome to Rizal Store.</h1>
      </div>
      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        <User2 />
        Continue with Guest
      </Button>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-1">
        <Button
          variant="outline"
          type="button"
          onClick={signIn}
          disabled={pending}
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
