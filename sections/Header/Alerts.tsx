import { LoadingFallbackProps } from "@deco/deco";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

interface Props {
  alerts: string[];
  autoPlay?: {
    active?: boolean;
    /**
     * @title Interval
     * @description Time in seconds between each alert
     */
    interval?: number;
  };
  /**
   * @ignore
   */
  loading?: "lazy" | "eager";
}

export default function Alerts({ alerts, autoPlay, loading = "eager" }: Props) {
  const rootId = useId();

  return (
    <div id={rootId} class="h-[30px] md:h-[37px] w-full">
      <Slider class="carousel h-full w-full">
        {alerts.map((alert, index) => (
          <Slider.Item
            class={clx(
              "carousel-item w-screen h-full",
              "flex justify-center items-center shrink-0",
              "font-montserrat text-sm font-bold text-[#606060]",
            )}
            index={index}
          >
            {alert}
          </Slider.Item>
        ))}
      </Slider>
      {loading === "eager" && (
        <Slider.JS
          rootId={rootId}
          interval={autoPlay?.active && autoPlay.interval
            ? autoPlay.interval * 1000
            : undefined}
          infinite
        />
      )}
    </div>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Alerts {...props as any} loading="lazy" />
);
