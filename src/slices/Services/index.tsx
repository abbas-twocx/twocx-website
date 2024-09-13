import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";
import Link from "next/link";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services = async ({ slice }: ServicesProps): Promise<JSX.Element> => {
  const client = createClient();
  const services = await client.getAllByType("services");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading3: ({ children }) => (
            <h3 className="text-balance text-center text-[42px] font-medium md:text-7xl">
              {children}
            </h3>
          ),
          em: ({ children }) => (
            <em className="bg-gradient-to-b from-primary to-primary/40 bg-clip-text not-italic text-transparent">
              {children}
            </em>
          ),
        }}
      />
      <div className="mt-16 grid max-w-full w-full grid-rows-[auto_auto_auto] gap-[36px] grid-cols-1 lg:grid-cols-2 md:gap-[36px]">
        {services &&
          services.length > 0 &&
          services?.map((item, index) => {
            return (
              <div
                className={
                  "glass-container group row-span-3 duration-300 ease-in-out cursor-pointer grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4"
                }
                key={index}
              >
                <div className="group-hover:h-full h-0 translate-y-3 rounded-xl absolute -left-[10px] -right-[10px] bottom-0 bg-primary/10 duration-500 ease-in-out -z-20 blur-sm"></div>
                <h3 className="text-2xl">
                  <PrismicText field={item.data.title || ""} />
                </h3>
                <div className="max-w-md text-balance text-slate-300">
                  <PrismicRichText field={item.data.description} />
                </div>
                <Link
                  className="inline-flex min-h-11 items-center before:absolute before:inset-0"
                  href={`/services/${item?.uid}` || "#"}
                >
                  Learn More
                </Link>
              </div>
            );
          })}
      </div>
    </Bounded>
  );
};

export default Services;
