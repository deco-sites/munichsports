import Image from "apps/website/components/Image.tsx";
import { SIDEMENU_DRAWER_ID } from "../../../constants.ts";
import { ImageProps } from "../../../sdk/widgets.ts";
import Icon from "../../ui/Icon.tsx";

interface Props {
  logo?: ImageProps;
}

export default function MenuHeader({ logo }: Props) {
  return (
    <div class="flex justify-center items-center relative h-14">
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
      <label
        for={SIDEMENU_DRAWER_ID}
        aria-label="Close menu"
        class="size-14 flex justify-center items-center absolute right-0"
      >
        <Icon id="close" size={16} />
      </label>
    </div>
  );
}
