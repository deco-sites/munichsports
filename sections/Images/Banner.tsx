import { LoadingFallbackProps } from "@deco/deco";
import Item, { Props as Banner } from "../../components/images/banner/Item.tsx";

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

export default function Banners({
  images = [],
  preload,
}: Props) {
  return (
    <div class="w-full py-6 flex flex-col md:flex-row md:gap-x-6 gap-y-6 gap-x-3">
      {images.map((image, index) => (
        <Item image={image} lcp={index === 0 && preload} />
      ))}
    </div>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Banners {...props as any} />
);
