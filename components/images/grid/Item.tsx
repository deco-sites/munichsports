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
    /** @description Image text subtitle */
    subtitle?: string;
    /** @description Title and subtitle colors */
    colors?: "light" | "dark";
    /** @description Button label */
    label?: string;
    /** @description Content alignment */
    alignment?: "left" | "center" | "right";
    /** @description Content position */
    position?: "top" | "middle" | "bottom";
    /** @description Column span */
    columnSpan?: 1 | 2;
    /** @description Row span */
    rowSpan?: 1 | 2;
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

  const colors = action?.colors ?? "dark";
  const alignment = action?.alignment ?? "center";
  const position = action?.position ?? "middle";
  const columnSpan = action?.columnSpan ?? 1;
  const rowSpan = action?.rowSpan ?? 1;

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class={clx(
        "flex flex-col relative",
        columnSpan === 1 && "md:col-span-1",
        columnSpan === 2 && "md:col-span-2",
        rowSpan === 1 && "md:row-span-1",
        rowSpan === 2 && "md:row-span-2",
      )}
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
      {!!action && (!!action.title || !!action.subtitle || !!action.label) && (
        <div
          class={clx(
            "w-full px-3 py-6",
            "font-bold font-montserrat",
            "flex flex-col gap-2 justify-center items-center text-center",
            "md:absolute",
            alignment === "center" && "md:left-1/2 md:-translate-x-1/2",
            alignment === "left" && "md:left-0 md:text-left md:items-start",
            alignment === "right" && "md:right-0 md:text-right md:items-end",
            position === "top" && "md:top-4",
            position === "bottom" && "md:bottom-4",
            position === "middle" && "md:top-1/2 md:-translate-y-1/2",
            colors === "light" && "md:[--tc:white]",
            colors === "dark" && "md:[--tc:black]",
          )}
        >
          {action.title && (
            <span class="text-xl text-black md:text-[40px]/[36px] md:text-[var(--tc)]">
              {action.title}
            </span>
          )}
          {action.subtitle && (
            <span class="text-sm text-black font-normal mb-1 font-nunito md:text-base/6 md:text-[var(--tc)]">
              {action.subtitle}
            </span>
          )}
          {action.label && (
            <button
              class={clx(
                "bg-[#333333] text-white rounded px-3 py-2.5 text-[13px] min-w-[200px] tracking-[0.0625rem] md:text-base/6",
              )}
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </a>
  );
}
