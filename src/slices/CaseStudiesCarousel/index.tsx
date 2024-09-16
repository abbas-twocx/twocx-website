import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CaseStudiesCarouselClient from "./caseStudiesCarousel";

/**
 * Props for `CaseStudiesCarousel`.
 */
export type CaseStudiesCarouselProps =
  SliceComponentProps<Content.CaseStudiesCarouselSlice>;

/**
 * Component for "CaseStudiesCarousel" Slices.
 */
const CaseStudiesCarousel = async ({
  slice,
}: CaseStudiesCarouselProps): Promise<JSX.Element> => {
  const client = createClient();
  const caseStudies = await client.getAllByType("case_studies");

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
      <div className="mt-16 max-w-full w-full">
        <CaseStudiesCarouselClient caseStudies={caseStudies} />
      </div>
    </Bounded>
  );
};

export default CaseStudiesCarousel;
