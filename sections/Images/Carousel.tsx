import { LoadingFallbackProps } from "@deco/deco";
import Item, {
  Props as Banner,
} from "../../components/images/carousel/Item.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  buttons?: {
    /** @description Show previous button */
    prev?: boolean;
    /** @description Show next button */
    next?: boolean;
    /** @description Show dots */
    dots?: boolean;
  };
  /**
   * @ignore
   */
  loading?: "lazy" | "eager";
}

export default function Carousel({
  images = [],
  preload,
  interval,
  buttons,
  loading = "eager",
}: Props) {
  const id = useId();

  return (
    <div id={id} class="w-screen relative pb-6">
      <Slider class="carousel carousel-center w-full">
        {images.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-screen">
            <Item image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      {buttons?.prev && (
        <Slider.PrevButton
          class="btn btn-neutral btn-outline btn-circle no-animation btn-sm"
          disabled={false}
        >
          <Icon id="angle-right" class="rotate-180" />
        </Slider.PrevButton>
      )}

      {buttons?.next && (
        <Slider.NextButton
          class="btn btn-neutral btn-outline btn-circle no-animation btn-sm"
          disabled={false}
        >
          <Icon id="angle-right" />
        </Slider.NextButton>
      )}

      {buttons?.dots && (
        <ul
          class={clx(
            "col-span-full row-start-4 z-10",
            "carousel justify-center gap-3",
          )}
        >
          {images.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-black opacity-20 h-3 w-3 no-animation rounded-full",
                  "disabled:w-8 disabled:bg-base-100 disabled:opacity-100 transition-[width]",
                )}
              >
              </Slider.Dot>
            </li>
          ))}
        </ul>
      )}

      {loading === "eager" && (
        <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
      )}
    </div>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Carousel {...props as any} loading="lazy" />
);
