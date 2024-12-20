import { ComponentChildren } from "preact";
import { clx } from "../../../sdk/clx.ts";
import { getIdFromObject } from "../../../sdk/hash.ts";
import { ImageProps } from "../../../sdk/widgets.ts";
import Icon from "../../ui/Icon.tsx";

// TODO: improve this because i'm too tired to think a proper way to do this
/**
 * @title {{{label}}}
 */
interface ThirdLevelItem {
  label: string;
  url: string;
}

/**
 * @title {{{label}}}
 */
interface SecondLevelItem {
  label: string;
  url?: string;
  children?: ThirdLevelItem[];
}

/**
 * @title {{{label}}}
 */
export interface FirstLevelItem {
  label: string;
  url?: string;
  children?: SecondLevelItem[];
  image?: ImageProps & { href?: string };
}

function Li({
  children,
  class: _class = "",
}: {
  children: ComponentChildren;
  class?: string;
}) {
  return (
    <li
      class={clx(
        "h-[50px] w-full px-5 font-montserrat text-[13px]/[22px] text-[#333333] hover:text-[#9a9a9a]",
        _class,
      )}
    >
      {children}
    </li>
  );
}

export default function MenuItem({
  item,
  level,
}: { item: FirstLevelItem | SecondLevelItem | ThirdLevelItem; level: number }) {
  if ("children" in item && !!item.children?.length) {
    const id = getIdFromObject(item);
    return (
      <Li class={clx(level === 0 && "font-bold")}>
        <label
          for={id}
          class="flex items-center justify-between h-full font-montserrat"
        >
          {item.label}
          <Icon id="angle-right" size={16} class="text-[#dc0727]" />
        </label>
      </Li>
    );
  }

  return (
    <Li class={clx(level === 0 && "font-bold")}>
      <a
        href={item.url}
        class="font-montserrat h-full flex justify-start items-center"
      >
        {item.label}
      </a>
    </Li>
  );
}
