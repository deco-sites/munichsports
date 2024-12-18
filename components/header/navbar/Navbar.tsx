import { clx } from "../../../sdk/clx.ts";
import { type Props as MenuProps } from "../menu/Menu.tsx";

interface Props {
  menu?: MenuProps;
}

export default function Navbar({ menu }: Props) {
  return (
    <nav class="h-full">
      <ul class="flex items-center justify-center gap-5 h-full">
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
              <div class="w-screen absolute top-full left-0 bg-white opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:pointer-events-auto">
                <ul class="columns-3 [column-gap:1.5rem]">
                  {item.children.map((child) => (
                    <li class="h-full group flex flex-col">
                      <a href={child.url}>{child.label}</a>
                      {!!child.children?.length && (
                        <ul class="flex flex-col">
                          {child.children.map((subchild) => (
                            <li class="h-full group flex items-center">
                              <a href={subchild.url}>{subchild.label}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
