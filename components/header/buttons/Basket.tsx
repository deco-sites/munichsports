import { useScript } from "@deco/deco/hooks";
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
  return (
    <>
      <Button for={MINICART_DRAWER_ID} aria-label="open cart">
        <span class="relative">
          <span
            id={id}
            class={clx(
              "absolute top-[-9px] right-[-9px] size-5 rounded-full",
              "flex items-center justify-center",
              "text-xs font-thin",
              "bg-black text-white",
            )}
          />
          <Icon id="basket" size={24} />
        </span>
      </Button>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}
