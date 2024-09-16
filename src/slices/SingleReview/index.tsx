import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SingleReview`.
 */
export type SingleReviewProps = SliceComponentProps<Content.SingleReviewSlice>;

/**
 * Component for "SingleReview" Slices.
 */
const SingleReview = ({ slice }: SingleReviewProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <div className="relative flex flex-col justify-center items-center text-center">
        {isFilled.image(slice.primary.image) && (
          <div className="relative max-h-[80px] h-[80px] max-w-[80px] w-[80px]">
            <PrismicNextImage
              className="object-cover object-center rounded-full border-[2px] border-secondary border-solid max-h-[80px] h-[80px] max-w-[80px] w-[80px]"
              fill
              field={slice.primary.image}
            />
          </div>
        )}
        <h4 className="mx-auto max-w-2xl text-balance text-center text-[24px] leading-[120%] mt-[6px] font-medium md:text-[24px] text-white">
          {slice.primary.name}
        </h4>
        <span className="text-[16px] text-secondary leading-[120%] mt-[4px]">
          {slice.primary.designation}
        </span>
        <div className="mx-auto mt-6 max-w-xl text-[18px] text-balance text-center text-dark-primary">
          <PrismicRichText field={slice.primary.review} />
        </div>
      </div>
    </Bounded>
  );
};

export default SingleReview;
