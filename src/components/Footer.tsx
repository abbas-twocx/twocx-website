import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";
import Bounded from "./Bounded";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const footer = await client.getSingle("footer");
  const footerLinks = footer.data.links;
  const footerAddresses = footer.data.address;

  return (
    <Bounded as="footer">
      <div className="flex gap-[32px] flex-col w-full border-t border-slate-600 py-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-6 items-start max-w-[460px] lg:w-2/4 lg:mr-12">
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

        <div className="flex flex-col gap-6 lg:w-2/4 lg:flex-row lg:gap-6 lg:justify-end">
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
        </div>
      </div>
      <address className="flex flex-col gap-6 justify-around text-slate-300 lg:flex-row flex-wrap w-full">
        {footerAddresses.map((item, index) => {
          const sanitizedPhone = item.phone
            ? item.phone.replace(/[^\d+]/g, "")
            : "";

          return (
            <div
              key={index}
              className="max-w-[320px] flex flex-col gap-[6px] text-balance"
            >
              <h6 className="text-white">{item.heading}</h6>
              <Link
                className="hover:text-primary duration-500 ease-in-out"
                href={`mailto:${item.email}`}
              >
                {item.email}
              </Link>
              <Link
                className="hover:text-primary duration-500 ease-in-out"
                href={`tel:${sanitizedPhone}`}
              >
                {item.phone}
              </Link>
              <p>{item.location}</p>
            </div>
          );
        })}
      </address>
      <div className="mt-8 text-center text-slate-400 lg:text-left border-t border-primary/10 w-full justify-center items-center py-3">
        <PrismicText field={footer.data.copyright_text} />
      </div>
    </Bounded>
  );
}
