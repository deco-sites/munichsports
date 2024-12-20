import Image from "apps/website/components/Image.tsx";
import { ImageProps } from "../../../sdk/widgets.ts";
import Icon from "../../ui/Icon.tsx";

interface Props {
  logo?: ImageProps;
  title?: string;
  backButtonCloses?: string;
}

export default function MenuHeader({ logo, title, backButtonCloses }: Props) {
  return (
    <div class="flex justify-center items-center relative h-14">
      {backButtonCloses && (
        <button
          aria-label="Close menu"
          class="size-14 flex justify-center items-center absolute left-0"
          hx-on:click={`document.getElementById('${backButtonCloses}').checked = false`}
        >
          <Icon id="angle-left" size={16} />
        </button>
      )}
      {logo?.src && (
        <Image
          src={logo.src}
          width={logo.width || 64}
          height={logo.height}
          alt={logo.alt || "Logo"}
          loading="lazy"
          class="w-[42.5px]"
        />
      )}
      {title && <h2 class="text-[13px] font-bold font-montserrat">{title}</h2>}
      <button
        aria-label="Close menu"
        class="size-14 flex justify-center items-center absolute right-0"
        hx-on:click="document.querySelectorAll('[data-drawer-input]').forEach(input => input.checked = false)"
      >
        <Icon id="close" size={16} />
      </button>
    </div>
  );
}
