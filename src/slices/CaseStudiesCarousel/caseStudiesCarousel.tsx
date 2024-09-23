"use client";

import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { CaseStudiesDocument } from "../../../prismicio-types";
import { CSSProperties } from "react";

// Dynamically load the carousel only on the client
const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

interface CaseStudiesCarouselClientProps {
  caseStudies: CaseStudiesDocument[];
}

const CaseStudiesCarouselClient = ({
  caseStudies,
}: CaseStudiesCarouselClientProps) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      partialVisible={false}
      ssr
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={5000}
      transitionDuration={500}
      arrows={false}
      showDots
    >
      {Array.isArray(caseStudies) && caseStudies.length > 0 ? (
        caseStudies.map((item, index) => (
          <div
            key={index}
            className="w-full grid items-center gap-8 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-[32px] lg:py-12"
          >
            <PrismicNextLink
              className="absolute no-underline inset-0 w-full h-full z-10 hover:text-primary duration-500 ease-in-out mt-8"
              href={`/case-studies/${item.uid}`}
            ></PrismicNextLink>
            <div className="flex flex-col">
              <h3 className="text-2xl">
                <PrismicRichText field={item.data.heading} />
              </h3>
              <div className="prose prose-invert mt-4 max-w-xl text-balance">
                <PrismicRichText field={item.data.description} />
              </div>
            </div>
            <div className="rounded-lg shadow-2xl lg:col-span-2 lg:pt-0 lg:max-w-[724px] max-w-full w-full lg:max-h-[390px] max-h-[290px] h-[290px] lg:h-[390px] relative">
              <PrismicNextImage
                className="object-cover object-center rounded-lg lg:max-h-[390px] max-h-[290px] h-[290px] lg:h-[390px]"
                fill
                field={item.data.bannner}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No case studies available</p>
      )}
    </Carousel>
  );
};

export default CaseStudiesCarouselClient;
