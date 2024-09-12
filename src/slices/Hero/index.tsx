import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import {
  SliceComponentProps,
} from "@prismicio/react";
import AnimatedSection from "./AnimatedSection";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center"
    >
      <AnimatedSection slice={slice}/>
    </Bounded>
  );
};

export default Hero;
