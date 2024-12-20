import { LoadingFallbackProps } from "@deco/deco";
import { RichText as RichTextWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import RichText from "../../components/ui/RichText.tsx";
import { ImageProps } from "../../sdk/widgets.ts";

interface Props {
  image: ImageProps;
  /**
   * @title Mobile Content
   */
  content: RichTextWidget;
}

export default function Newsletter({ image, content }: Props) {
  return (
    <div class="py-6 px-3">
      <div class="border-y border-[#ececec] flex flex-col md:flex-row md:justify-center md:items-center md:gap-0 gap-8 py-10">
        <Image
          src={image.src || ""}
          alt={image.alt || "Newsletter Image"}
          width={image.width || 0}
          height={image.height}
          loading="lazy"
          class="md:w-1/2"
        />
        <RichText class="md:w-1/2" content={content} />
      </div>
    </div>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => {
  // deno-lint-ignore no-explicit-any
  return <Newsletter {...props as any} />;
};
