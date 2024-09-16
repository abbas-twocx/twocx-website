import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies = async ({
  slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
  const client = createClient();
  const caseStudies = await client.getAllByType("case_studies");
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
        <PrismicText field={slice?.primary?.heading} />
      </h2>
      <div className="max-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice?.primary?.description} />
      </div>
      <div className="mt-20 grid gap-16">
        {caseStudies?.map(
          (caseStudy, index) =>
            caseStudy && (
              <div
                key={caseStudy?.id || index}
                className="relative group bg-secondary/5 backdrop-blur-lg p-[24px] rounded-xl grid gap-4 transition-all ease-in-out duration-500 hover:cursor-pointer hover:shadow-xl md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="col-span-1 flex flex-col justify-center gap-4">
                  <h4 className="text-3xl">
                    <PrismicText field={caseStudy?.data?.heading} />
                  </h4>
                  <div className="max-w-md">
                    <PrismicRichText field={caseStudy?.data?.description} />
                  </div>
                  <PrismicNextLink
                    className="after:absolute after:inset-0 no-underline hover:text-primary duration-500 ease-in-out"
                    href={`/case-studies/${caseStudy.uid}`}
                  >
                    Explore More
                  </PrismicNextLink>
                </div>
                <PrismicNextImage
                  field={caseStudy?.data?.bannner}
                  quality={100}
                  className={clsx(
                    "rounded-xl lg:col-span-2",
                    index % 2 && "md:-order-1"
                  )}
                />
              </div>
            )
        )}
      </div>
    </Bounded>
  );
};

export default CaseStudies;
