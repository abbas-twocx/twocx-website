import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";
import Bounded from "./Bounded";
import { PrismicRichText } from "./PrismicRichText";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const footer = await client.getSingle("footer");
  const footerLinks = footer.data.links;
  const footerAddresses = footer.data.address;
  const combinedLinks = [...footerLinks, ...footerAddresses];

  return (
    <Bounded as="footer">
      <div className="flex flex-col w-full border-t border-slate-600 py-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-6 items-start max-w-[420px] lg:w-1/4 lg:mr-12">
          <Link href={"/"}>
            <Image
              className="invert"
              width={120}
              height={40}
              src={footer?.data?.image?.url || ""}
              alt={footer?.data?.image?.alt || "TwoCX Wordmark"}
            />
            <span className="sr-only">TwoCX Wordmark</span>
          </Link>
          <PrismicText field={footer.data.body} />
        </div>

        <div className="flex flex-col gap-6 lg:w-3/4 lg:flex-row lg:gap-12 lg:justify-between">
          <div className="flex flex-col gap-4 lg:w-1/3">
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-col gap-3">
                {settings?.data?.navigation?.map((item, index) => (
                  <li key={index}>
                    <PrismicNextLink
                      className="inline-flex items-center text-slate-300 hover:text-slate-100"
                      field={item?.link}
                    >
                      {item?.label}
                    </PrismicNextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col gap-4 lg:w-1/3">
            <nav aria-label="Footer Links">
              <ul className="flex flex-col gap-3">
                {footerLinks.map((item, index) => (
                  <li key={index}>
                    <PrismicNextLink
                      className="inline-flex items-center text-slate-300 hover:text-slate-100"
                      field={item?.link}
                    >
                      {item?.label}
                    </PrismicNextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer Addresses */}
          <div className="flex flex-col gap-4 lg:w-1/3">
            <address className="flex flex-col gap-3 text-slate-300">
              {footerAddresses.map((item, index) => (
                <div key={index}>
                  <PrismicRichText field={item.address} />
                </div>
              ))}
            </address>
          </div>
        </div>
      </div>
      {/* Copyright Text */}
      <div className="mt-8 text-center text-slate-400 lg:text-left">
        <PrismicText field={footer.data.copyright_text} />
      </div>
    </Bounded>
  );
}
