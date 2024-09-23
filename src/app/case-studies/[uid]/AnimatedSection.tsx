"use client";

import { PrismicImage, PrismicText } from "@prismicio/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { CaseStudiesDocument } from "../../../../prismicio-types";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

interface Service {
  id: string;
  type: string;
  tags: string[];
  lang: string;
  slug: string;
  first_publication_date: string;
  last_publication_date: string;
  uid: string;
  link_type: string;
  isBroken: boolean;
}

export default function AnimatedSection({
  page,
}: {
  page: CaseStudiesDocument;
}) {
  const container = useRef(null);
  const preferReduceMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (preferReduceMotion) {
        gsap.set(".heading, .logo, .body, .glow", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(".heading", { y: 20 }, { y: 0, opacity: 1, duration: 0.8 });

      tl.fromTo(".logo", { y: 20 }, { y: 0, opacity: 1, duration: 0.5 });

      tl.fromTo(
        ".body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.6"
      );
      tl.fromTo(
        ".glow",
        { y: 20 },
        { y: 0, opacity: 0.1, duration: 0.8 },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative w-full grid place-items-center lg:place-items-start text-center lg:text-start"
    >
      <div className="glow opacity-0 absolute left-0 top-0 bottom-0 w-[200px] h-[200px] bg-primary rounded-full blur-3xl" />
      <div className="glow opacity-0 absolute right-0 top-0 bottom-0 w-[200px] h-[200px] bg-secondary rounded-full blur-3xl" />
      <h1 className="heading opacity-0 lg:text-h1 text-h1-m leading-[120%] font-medium text-balance">
        <p className="text-2xl text-primary">Clients</p>
        <PrismicText field={page?.data?.heading} />
      </h1>
      <div className="mt-[24px] logo opacity-0">
        <PrismicImage
          width={240}
          height={120}
          className="object-contain object-center"
          field={page.data.image}
        />
      </div>
      <p className="body md-4 text-slat-300 mt-[24px] max-w-2xl text-lg text-balance opacity-0">
        <PrismicText field={page?.data?.description} />
      </p>
      <div className="flex flex-col lg:flex-row gap-[24px] w-full">
      {page.tags.length > 0 && (
        <div className="flex flex-col gap-[24px] mt-[32px] rounded-xl p-[12px] border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 backdrop-blur-sm">
          <span className="text-primary text-[18px]">Technologies Used</span>
          <div className="w-full flex items-center gap-[12px] flex-wrap justify-center lg:justify-start">
            {page.tags.map((tag, index) => (
              <div
                key={index}
                className="cursor-pointer text-[14px] focus:ring-offset-3 relative inline-flex h-fit w-fit rounded-full border border-green-100/20 bg-green-200/10 px-[8px] py-[4px] text-green-200 outline-none ring-secondary transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-secondary after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-secondary/40 hover:text-secondary after:hover:bg-opacity-15 focus:ring-2"
              >
                <p>{tag}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {page.data.services.length > 0 && (
        <div className="flex flex-col gap-[24px] mt-[32px] w-full rounded-xl backdrop-blur-sm p-[12px] border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5">
          <span className="text-primary text-[18px]">Services Used</span>
          <div className="w-full flex items-center gap-[12px] flex-wrap justify-center lg:justify-start ">
            {page.data.services.map((item, index) => {
              const service = item.service as Service;
              const capitalizWords = (str: string) => {
                return str
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
              }

              return (
                <div
                  key={index}
                  className="cursor-pointer text-[14px] focus:ring-offset-3 relative inline-flex h-fit w-fit rounded-full border border-green-100/20 bg-green-200/10 px-[8px] py-[4px] text-green-200 outline-none ring-secondary transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-secondary after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-secondary/40 hover:text-secondary after:hover:bg-opacity-15 focus:ring-2"
                >
                  <p>{capitalizWords(service.uid)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
