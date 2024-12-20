import { LoadingFallbackProps } from "@deco/deco";
import Image from "apps/website/components/Image.tsx";
import RichText from "../../components/ui/RichText.tsx";
import { ImageProps } from "../../sdk/widgets.ts";

/**
 * @title {{{name}}}
 */
interface Benefit {
  /**
   * @title Name
   * @description Used to identify the benefit in admin
   */
  name: string;
  icon: ImageProps;
  /**
   * @format rich-text
   */
  content: string;
}

interface Props {
  benefits: Benefit[];
}

export default function Benefits({ benefits }: Props) {
  return (
    <div
      style={{
        "--items-count": benefits.length,
      }}
      class="bg-[#333333] py-6 px-3 flex flex-col md:grid md:grid-cols-[repeat(var(--items-count),1fr)] md:justify-center gap-6"
    >
      {benefits.map(({ icon, content }) => (
        <div class="flex flex-col gap-4 items-center">
          <Image
            src={icon.src || ""}
            width={icon.width || 0}
            height={icon.height}
            alt={icon.alt || "Icon"}
          />
          <RichText content={content} />
        </div>
      ))}
    </div>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Benefits {...props as any} />
);
