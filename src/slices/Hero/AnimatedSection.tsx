"use client";

import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedSection({
  slice,
}: {
  slice: Content.HeroSlice;
}) {
  const container = useRef(null);
  const preferReduceMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (preferReduceMotion) {
        gsap.set(
          ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 0.8 }
      );
      tl.fromTo(
        ".hero__body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.6"
      );
      tl.fromTo(
        ".hero__button",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.8"
      );
      tl.fromTo(
        ".hero__image",
        { y: 100 },
        { y: 0, opacity: 1, duration: 0.5 },
        "+=0.3"
      );
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=1"
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative">
      {/* <StarGrid /> */}
      {isFilled.richText(slice?.primary?.heading) && (
        <h1 className="hero__heading text-balance text-5xl font-medium opacity-0 md:text-7xl">
          <PrismicText field={slice?.primary?.heading} />
        </h1>
      )}
      {isFilled.richText(slice?.primary?.body) && (
        <div className="hero__body mx-auto mt-6 max-w-md text-balance text-slate-300 opacity-0">
          <PrismicRichText field={slice.primary.body} />
        </div>
      )}
      {isFilled.link(slice?.primary?.button_link) && (
        <ButtonLink
          className="hero__button mt-8 opacity-0"
          field={slice.primary.button_link}
        >
          {slice.primary.button_label}
        </ButtonLink>
      )}
      {isFilled.image(slice?.primary?.image) && (
        <div className="hero__image mt-16 opacity-0">
          <div className="hero__glow absolute inset-0 -z-10 bg-primary/10 opacity-0 blur-2xl filter" />
          <div className="lg:max-h-[640px] max-h-[280px] h-[280px] lg:h-[640px] max-w-full w-full">
            <PrismicNextImage
              className="rounded-lg object-cover object-center"
              fill
              field={slice.primary.image}
            />
          </div>
        </div>
      )}
    </div>
  );
}
