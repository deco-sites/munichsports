import { useDevice, useScript } from "@deco/deco/hooks";
import { MINICART_DRAWER_ID } from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import Icon from "../../ui/Icon.tsx";
import Button from "./Button.tsx";
import { clx } from "../../../sdk/clx.ts";

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;
    if (!counter) {
      return;
    }
    counter.innerText = count > 9 ? "9+" : count.toString();
  });

export default function BasketButton() {
  const id = useId();
  const isMobile = useDevice() !== "desktop";

  const Clickable = isMobile ? Button : "a";
  const props = isMobile ? { for: MINICART_DRAWER_ID } : { href: "/checkout" };

  return (
    <>
      <Clickable
        {...props}
        aria-label="open cart"
        class="md:!w-[auto] md:!p-2"
      >
        <span class="relative">
          <span
            id={id}
            class={clx(
              "absolute top-[-9px] right-[-9px] md:-right-4 size-5 rounded-full",
              "flex items-center justify-center",
              "text-xs font-thin",
              "bg-black text-white",
            )}
          />
          <Icon id="basket" class="size-6 md:size-4" />
        </span>
      </Clickable>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}
