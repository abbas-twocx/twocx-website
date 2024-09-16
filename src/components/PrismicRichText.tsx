import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
} from "@prismicio/react";
import { Heading } from "./Heading";

type PrismicRichTextProps = {
  field: any; // The rich text content
  components?: JSXMapSerializer;
  // Other props passed to BasePrismicRichText
  [key: string]: any;
};

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      className="mb-7 mt-12 first:mt-0 last:mb-0 line-clamp-4 text-h1M font-bold leading-tight text-darkHeading md:text-h1 lg:text-h1 xl:text-h1"
    >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading
      as="h2"
      size="md"
      className="mb-7 mt-12 first:mt-0 last:mb-0 text-h2 leading-9 font-semibold text-darkHeading"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="sm"
      className="mb-7 mt-12 first:mt-0 last:mb-0 font-semibold text-h3 leading-9 text-darkHeading"
    >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading
      as="h4"
      size="sm"
      className="mb-7 mt-12 first:mt-0 last:mb-0 font-semibold text-h4 leading-9 text-darkHeading"
    >
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading
      as="h4"
      size="sm"
      className="mb-7 mt-12 first:mt-0 last:mb-0 font-semibold text-h5 leading-9 text-darkHeading"
    >
      {children}
    </Heading>
  ),
  heading6: ({ children }) => (
    <Heading
      as="h4"
      size="sm"
      className="mb-7 mt-12 first:mt-0 last:mb-0 font-semibold text-h6 leading-9 text-darkHeading"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="mb-7 last:mb-0 text-b16 font-normal leading-relaxed text-white lg:text-b18 xl:text-b18">
      {children}
    </p>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6 text-white text-b16 lg:text-b18">
      {children}
    </ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-[8px] list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-[8px] list-disc pl-1 last:mb-0 md:pl-2 text-white">
      {children}
    </li>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="underline decoration-1 underline-offset-2 ease-in-out duration-300 hover:text-primary text-[18px] m-0"
    >
      {children}
    </PrismicNextLink>
  ),
  image: ({ node }) => (
    <PrismicNextLink
      className="flex justify-center"
      field={node.linkTo ? node.linkTo : undefined}
    >
      <PrismicNextImage
        priority={true}
        className="mx-8 max-h-[820px] rounded-lg self-center max-w-[720px] w-full object-cover object-center"
        field={node}
      />
    </PrismicNextLink>
  ),
};

export function PrismicRichText({
  field,
  components,
  ...props
}: PrismicRichTextProps) {
  return (
    <BasePrismicRichText
      field={field}
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  );
}
