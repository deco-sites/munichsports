import type { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";

function formatContent(content?: string): string {
  return (content || "")
    .replace(/font-size:\s*(\d+)pt/g, (_, pt) => `font-size: ${pt}px`)
    .replace(/<p[^>]*><\/p>/g, "<br>");
}

type Props =
  & Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    "children" | "dangerouslySetInnerHTML"
  >
  & { content: string };

export default function RichText({ content, ...props }: Props) {
  return (
    <div
      {...props}
      class={clx(
        "[&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4",
        "[&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold",
        "[&_h1]:leading-[1.2] [&_h2]:leading-[1.2] [&_h3]:leading-[1.2]",
        props.class,
        props.className,
      )}
      dangerouslySetInnerHTML={{
        __html: formatContent(content),
      }}
    />
  );
}
