"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFly,
  FaFigma,
} from "react-icons/fa6";
import gsap from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useGSAP } from "@gsap/react";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.ProcessSlice;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const preferReduceMotion = usePrefersReducedMotion();

  const icons = {
    cloudflare: <FaCloudflare />,
    npm: <FaNpm />,
    github: <FaGithub />,
    digitalocean: <FaDigitalOcean />,
    figma: <FaFigma />,
    fly: <FaFly />,
  };

  useGSAP(
    () => {
      if (preferReduceMotion) {
        gsap.set(".pulsing-icon", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".pulsing-icon",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 }
      );
    },
    { scope: container, dependencies: [preferReduceMotion] }
  );

  return (
    <div
      ref={container}
      className="mt-20 flex flex-col items-center md:flex-row gap-[40px] flex-wrap justify-center"
    >
      {slice.primary.process.map((item, index) => (
        <div className="text-center" key={index}>
          <div className="pulsing-icon opacity-0 gap-[12px] flex text-center p-[24px] flex-col max-w-[322px] max-h-[322px] h-[322px] w-[322px] aspect-square shrink-0 items-center justify-center rounded-full border border-primary/30 bg-white/5 backdrop-blur text-3xl text-blue-100 md:text-4xl lg:text-5xl">
            <h4 className="text-[24px] leading-[120%]">{item.title}</h4>
            <p className="text-[16px] leading-[140%]">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
