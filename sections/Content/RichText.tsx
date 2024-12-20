import type { LoadingFallbackProps } from "@deco/deco";
import RichTextComponent from "../../components/ui/RichText.tsx";

interface Props {
  /**
   * @format rich-text
   */
  content: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
}

export default function RichText({ content, backgroundColor }: Props) {
  return (
    <RichTextComponent
      class="px-3 py-6 my-6"
      style={{ backgroundColor }}
      content={content}
    />
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <RichText {...props as any} />
);
