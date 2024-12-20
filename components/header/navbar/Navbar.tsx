import { clx } from "../../../sdk/clx.ts";
import { $t } from "../../../sdk/i18n.ts";
import { type Props as MenuProps } from "../menu/Menu.tsx";
import CategoriesDropdown from "./CategoriesDropdown.tsx";

interface Props {
  menu?: MenuProps;
  language?: string;
}

export default function Navbar({ menu, language }: Props) {
  const { seeAll } = $t(language);
  return (
    <nav class="h-full">
      <ul class="flex items-center justify-center gap-5 lg:gap-8 h-full">
        {menu?.items?.map((item) => (
          <li class="h-full group flex items-center">
            <a
              href={item.url}
              class={clx(
                "text-[13px] font-bold font-montserrat relative",
                "group-hover:text-[#dc0727] transition-colors duration-300 ease-in-out",
                "after:h-0.5 after:left-1/2 after:bg-[#dc0727] after:absolute after:top-full after:right-1/2",
                "before:h-0.5 before:right-1/2 before:bg-[#dc0727] before:absolute before:top-full before:left-1/2",
                "group-hover:after:left-0 group-hover:before:right-0",
                "after:transition-all after:duration-300 after:ease-in-out",
                "before:transition-all before:duration-300 before:ease-in-out",
              )}
            >
              {item.label}
            </a>
            {!!item.children?.length && (
              <CategoriesDropdown
                item={item}
                seeAllLabel={seeAll}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
