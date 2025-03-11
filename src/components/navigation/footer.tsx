import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Logo from "./logo";

export default function Footer() {
  const year = new Date().getFullYear().toString();
  return (
    <footer className="not-prose border-t">
      <section className="container mx-auto">
        <div className="grid gap-6 p-6 sm:p-8">
          <div className="grid gap-6">
            <Logo />
            <p className="max-w-screen-md">
              <Balancer>
                Rizal Store is a leading online fashion retailer that offers the
                latest trends and styles in clothing, shoes, and accessories for
                men and women. Our mission is to provide our customers with a
                seamless and enjoyable shopping experience, allowing them to
                stay ahead of the fashion curve without breaking the bank
              </Balancer>
            </p>
            <div className="mb-6 flex flex-col gap-4 text-sm text-muted-foreground underline underline-offset-4 md:mb-0 md:flex-row">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>
              <Link href="/">Cookie Policy</Link>
            </div>
            <p className="text-muted-foreground">
              ©{" "}
              <a href="https://github.com/sultonoir/Rizal Store">Rizal Store</a>
              . All rights reserved. {year}-present.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
