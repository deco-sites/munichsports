import { ComponentChildren } from "preact";
import { useId } from "../../../sdk/useId.ts";
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
}

function Li({ children }: { children: ComponentChildren }) {
  return (
    <li class="h-[50px] w-full px-5 font-montserrat text-[13px]/[22px] font-bold text-[#333333] hover:text-[#9a9a9a]">
      {children}
    </li>
  );
}

export default function MenuItem({
  item,
}: { item: FirstLevelItem | SecondLevelItem | ThirdLevelItem }) {
  if ("children" in item && !!item.children?.length) {
    const id = useId();
    return (
      <Li>
        <input type="checkbox" id={id} class="hidden peer" />
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
    <Li>
      <a
        href={item.url}
        class="collapse collapse-plus font-montserrat h-full flex justify-start items-center"
      >
        {item.label}
      </a>
    </Li>
  );
}
