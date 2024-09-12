import WordMark from "@/components/WordMark";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-600 px-8 py-7 md:flex-row">
      <Link href={"/"}>
        <Image
          className="invert"
          width={120}
          height={40}
          src={settings?.data?.site_logo?.url || ""}
          alt={settings?.data?.site_logo?.alt || "TwoCX Wordmark"}
        />
        <span className="sr-only">TwoCX Wordmark</span>
      </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-6">
          {settings?.data?.navigation?.map((item, index) => {
            return (
              <li key={index}>
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={item?.link}
                >
                  {item?.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
