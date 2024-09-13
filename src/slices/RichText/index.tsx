import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps, JSXMapSerializer } from "@prismicio/react";
import styles from "./index.module.css";
import Bounded from "@/components/Bounded";
import clsx from "clsx";
import { PrismicRichText } from "@/components/PrismicRichText";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={clsx(
          slice?.variation === "richTextFull"
            ? "w-full"
            : "max-w-[620px] mx-auto"
        )}
      >
        <PrismicRichText
          field={slice.primary.content}
          components={components}
        />
      </div>
    </Bounded>
  );
};

export default RichText;
