import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Technologies`.
 */
export type TechnologiesProps = SliceComponentProps<Content.TechnologiesSlice>;

/**
 * Component for "Technologies" Slices.
 */
const Technologies = ({ slice }: TechnologiesProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-balance text-center text-h2-m leading-[120%] font-medium md:text-h2">
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
      <div className="max-auto mt-6 lg:max-w-md max-w-full text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>
      <div className="mt-16 max-w-full w-full"></div>
    </Bounded>
  );
};

export default Technologies;
