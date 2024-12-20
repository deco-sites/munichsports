import { Picture, Source } from "apps/website/components/Picture.tsx";
import { clx } from "../../../sdk/clx.ts";
import { useSendEvent } from "../../../sdk/useSendEvent.ts";
import { ImageProps } from "../../../sdk/widgets.ts";

/**
 * @title {{{alt}}}
 */
export interface Props {
  /** @description Desktop optimized image */
  desktop: Omit<ImageProps, "alt">;
  /** @description Mobile optimized image */
  mobile: Omit<ImageProps, "alt">;
  /** @description Image's alt text */
  alt?: string;
  action?: {
    /** @description Banner action link */
    href?: string;
    /** @description Image text title */
    title?: string;
    /** @description Button label */
    label?: string;
  };
}

export default function BannerItem({
  image,
  lcp,
}: { image: Props; lcp?: boolean }) {
  const {
    alt = "Banner",
    mobile,
    desktop,
    action,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="flex flex-col relative"
    >
      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.src}
          width={mobile.width || 412}
          height={mobile.height || 660}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.src}
          width={desktop.width || 1440}
          height={desktop.height || 600}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.src}
          alt={alt}
        />
      </Picture>
      {!!action && (!!action.label || !!action.title) && (
        <div
          class={clx(
            "w-full px-3 py-6",
            "font-bold font-montserrat",
            "flex flex-col gap-2 justify-center items-center",
            "md:absolute md:left-1/2 md:-translate-x-1/2",
            "md:bottom-2 lg:bottom-10",
          )}
        >
          {action.title && (
            <span class="text-xl text-black md:text-[40px]/[36px] md:text-white">
              {action.title}
            </span>
          )}
          {action.label && (
            <button
              class="bg-[#333333] rounded text-white px-3 py-2.5 text-[13px] md:text-[16px] min-w-[200px] tracking-[0.0625rem]"
              aria-label={action.label}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </a>
  );
}
