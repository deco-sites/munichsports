import Image from "apps/website/components/Image.tsx";
import { JSX } from "preact/jsx-runtime";
import { clx } from "../../../sdk/clx.ts";
import { FirstLevelItem } from "../menu/Item.tsx";

interface Props {
  item: FirstLevelItem;
  seeAllLabel: string;
}

function Item(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      class={clx(
        "transition-colors duration-300 ease-in-out h-7 flex items-center",
        props.class,
        props.className,
      )}
    />
  );
}

export default function CategoriesDropdown({ item, seeAllLabel }: Props) {
  return (
    <div class="w-screen absolute top-full left-0 bg-white opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:pointer-events-auto border-t border-[#ececec]">
      <div class="relative z-0">
        <Image
          src="https://data.decoassets.com/munichsports/be0e2e9f-e22c-4b0f-be4f-693e67d9ebc2/menu-bg.png"
          width={1369}
          height={332}
          fit="cover"
          alt="Menu background"
          class="absolute top-0 left-0 w-full h-full -z-[1]"
          loading="lazy"
        />
        <div class="flex flex-wrap container-md py-3 xl:py-7">
          <ul
            class={clx(
              "columns-3 [column-gap:1.5rem] text-[13px] leading-5 font-montserrat",
              item.image && "w-3/4 flex-[0_0_auto]",
            )}
          >
            {item.children?.map((child) => (
              <li>
                <Item
                  href={child.url}
                  class="font-bold hover:text-[#dc0727]"
                >
                  {child.label}
                </Item>
                {!!child.children?.length && (
                  <ul>
                    <li>
                      <Item
                        href={child.url}
                        class="text-[#9d9d9d] hover:text-black"
                      >
                        {seeAllLabel}
                      </Item>
                    </li>
                    {child.children.map((subchild) => (
                      <li>
                        <Item
                          href={subchild.url}
                          class="hover:text-[#dc0727]"
                        >
                          {subchild.label}
                        </Item>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {item.image && (
            <Image
              class="w-1/4 flex-[0_0_auto] px-3 py-[7px] object-contain"
              src={item.image.src || ""}
              width={item.image.width || 0}
              height={item.image.height || 0}
              alt={item.image.alt || item.label}
              fit="contain"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}
