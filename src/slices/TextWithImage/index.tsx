import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";
const AnimatedContent = dynamic(() => import("./AnimatedContent"), {
  ssr: false,
});

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
};

/**
 * Props for `TextWithImage`.
 */
export type TextWithImageProps =
  SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextWithImage = ({ slice }: TextWithImageProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />
      {isFilled.richText(slice.primary.heading) && (
        <AnimatedContent>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-balance text-center text-h2-m leading-[120%] font-medium md:text-h2 mb-16">
                  {children}
                </h2>
              ),
            }}
          />
        </AnimatedContent>
      )}
      <div className="w-full grid items-center gap-8 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 lg:px-8 px-[22px] py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          {slice?.primary?.icon && (
            <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-3xl">
              {icons[slice?.primary?.icon]}
            </div>
          )}
          <div className="mt-6 text-2xl text-balance font-normal">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="prose prose-invert mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          {isFilled.link(slice.primary.button_link) && (
            <ButtonLink className="mt-6" field={slice.primary.button_link}>
              {slice.primary.button_text || "Learn More"}
            </ButtonLink>
          )}
        </div>
        <div
          className={clsx(
            "rounded-lg shadow-2xl lg:col-span-2 lg:pt-0 max-w-[724px] w-full lg:max-h-[390px] max-h-[240px] h-[240px] lg:h-[390px] relative",
            slice?.variation === "reverse"
              ? "lg:order-1 lg:translate-x-[6vw]"
              : "lg:-order-1 lg:translate-x-[-6vw]"
          )}
        >
          <PrismicNextImage
            className="object-cover object-center rounded-lg max-h-[390px] h-[390px]"
            fill
            field={slice.primary.image}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default TextWithImage;
