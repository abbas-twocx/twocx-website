import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `MasonryCards`.
 */
export type MasonryCardsProps = SliceComponentProps<Content.MasonryCardsSlice>;

/**
 * Component for "MasonryCards" Slices.
 */
const MasonryCards = ({ slice }: MasonryCardsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
              {children}
            </h2>
          ),
          em: ({ children }) => (
            <em className="bg-gradient-to-b from-primary to-primary/40 bg-clip-text not-italic text-transparent">
              {children}
            </em>
          ),
        }}
      />
      <div className="max-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>
      <div className="mt-16 grid max-w-full w-full grid-rows-[auto_auto_auto] gap-[36px] md:grid-cols-3 md:gap-[36px]">
        {slice?.primary?.bento_card.map((item, index) => {
          return (
            <div
              className={clsx(
                "glass-container group row-span-3 duration-300 ease-in-out cursor-pointer grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4",
                item?.wide ? "md:col-span-2" : "md:col-span-1"
              )}
              key={index}
            >
              <div className="group-hover:h-full h-0 translate-y-3 rounded-xl absolute -left-[10px] -right-[10px] bottom-0 bg-primary/10 duration-500 ease-in-out -z-20 blur-sm"></div>
              <h3 className="text-2xl">
                <PrismicText field={item.title || ""} />
              </h3>
              <div className="max-w-md text-balance text-slate-300">
                <PrismicRichText field={item.body} />
              </div>
              <div className="max-w-full w-full max-h-[144px] h-[144px] relative">
                <PrismicNextImage
                  field={item.image}
                  fill
                  className="max-h-[144px] w-full object-cover object-center rounded-[6px]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Bounded>
  );
};

export default MasonryCards;
