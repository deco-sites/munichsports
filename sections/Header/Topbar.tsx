import { LoadingFallbackProps } from "@deco/deco";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { extractLanguagesProps } from "../../sdk/i18n.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /**
   * @title Stores Button
   */
  stores?: {
    label?: string;
    url?: string;
    icon?: ImageWidget;
  };
  /**
   * @title Instagram Button
   */
  instagram?: {
    label?: string;
    url?: string;
    icon?: ImageWidget;
  };
  /**
   * @title Help Button
   */
  help?: {
    label?: string;
    url?: string;
  };
}

function Topbar({ stores, instagram, help, ...props }: Props) {
  const id = useId();
  const {
    language,
    translations,
    supportedLanguages,
    goTo,
    currentUrl,
  } = extractLanguagesProps(props);

  return (
    <div class="bg-[#f4f4f4] h-10 w-full text-[#454545]" id={id}>
      <div class="container-fluid container-module px-3 h-full">
        <div
          class={clx(
            "max-w-[940px] h-full w-full flex items-center justify-center",
            "md:max-w-full md:justify-between",
          )}
        >
          <ul class="flex items-center justify-center gap-2">
            {!!stores && !!stores.label && (
              <li>
                <a
                  href={stores.url}
                  class="text-sm font-bold flex items-center justify-center gap-1 hover:text-[#9a9a9a] transition-colors duration-300 ease-in-out"
                >
                  {stores.icon && (
                    <Image
                      src={stores.icon}
                      width={16}
                      height={16}
                      alt={stores.label}
                    />
                  )}
                  {stores.label}
                </a>
              </li>
            )}
            {!!instagram && !!instagram.label && (
              <li>
                <a
                  href={instagram.url}
                  class="text-sm flex items-center justify-center gap-1 hover:text-[#9a9a9a] transition-colors duration-300 ease-in-out"
                >
                  {instagram.icon && (
                    <Image
                      src={instagram.icon}
                      width={16}
                      height={16}
                      alt={instagram.label}
                    />
                  )}
                  {instagram.label}
                </a>
              </li>
            )}
          </ul>
          <ul class="hidden md:flex justify-center items-center gap-6 text-[13px]/[13px]">
            <a
              href={goTo("/user")}
              class="hover:text-[#9a9a9a] transition-colors duration-300 ease-in-out"
            >
              {translations?.login}
            </a>
            {!!help && !!help.label && (
              <a
                href={help.url}
                class="hover:text-[#9a9a9a] transition-colors duration-300 ease-in-out"
              >
                {help.label}
              </a>
            )}
            <span class="flex gap-1 items-center underline underline-offset-4">
              <Icon id="country" size={16} />
              {translations?.spain}
            </span>
            <div class="relative">
              <input
                type="checkbox"
                id="language-selector-dropdown"
                class="peer hidden"
              />
              <label
                htmlFor="language-selector-dropdown"
                class="h-full flex gap-1 justify-between items-center cursor-pointer hover:text-[#9a9a9a] transition-colors duration-300 ease-in-out"
              >
                <Icon id="language" size={16} />
                <span class="underline underline-offset-4">
                  {translations?.languages[language || "es"]}
                </span>
              </label>
              <label
                htmlFor="language-selector-dropdown"
                class="fixed inset-0 z-[49] hidden peer-checked:block"
                aria-label="Close language selector"
              />
              <div class="absolute top-[calc(100%+10px)] -right-2 w-fit bg-white z-50 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity duration-300 rounded border border-solid border-black/15 min-w-48 py-2">
                <ul class="flex flex-col text-sm">
                  {supportedLanguages?.map((language) => (
                    <li>
                      <a
                        class="px-[22px] h-8 flex items-center hover:text-[#9a9a9a] transition-colors duration-300"
                        href={currentUrl(language)}
                      >
                        {translations?.languages[
                          language as keyof typeof translations["languages"]
                        ]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Topbar {...props as any} />
);

export default Topbar;
