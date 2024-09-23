"use client";

import { PrismicText } from "@prismicio/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ServicesDocument } from "../../../../prismicio-types";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AnimatedSection({ page }: { page: ServicesDocument }) {
  const container = useRef(null);
  const preferReduceMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (preferReduceMotion) {
        gsap.set(".heading, .body, .glow", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 0.8 }
      );

      tl.fromTo(
        ".body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.6"
      );
      tl.fromTo(
        ".glow",
        { y: 20 },
        { y: 0, opacity: 0.1, duration: 0.5 },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative w-full grid place-items-center text-center"
    >
      <div className="glow opacity-0 absolute left-0 top-0 bottom-0 w-[200px] h-[200px] bg-primary rounded-full blur-3xl" />
      <div className="glow opacity-0 absolute right-0 top-0 bottom-0 w-[200px] h-[200px] bg-secondary rounded-full blur-3xl" />
      <h1 className="heading opacity-0 lg:text-h1 text-h1-m leading-[120%] font-medium text-balance">
        <p className="text-lg text-primary">Service</p>
        <PrismicText field={page?.data?.title} />
      </h1>
      <p className="body md-4 text-slat-300 mt-8 max-w-2xl text-lg text-balance opacity-0">
        <PrismicText field={page?.data?.description} />
      </p>
    </div>
  );
}
