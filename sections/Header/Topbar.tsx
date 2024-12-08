import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../../sdk/useId.ts";
import { LoadingFallbackProps } from "@deco/deco";

export interface Props {
  alerts?: string[];
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
}

function Topbar({ stores, instagram }: Props) {
  const id = useId();

  return (
    <div class="bg-[#f4f4f4] h-10 w-full text-[#454545]" id={id}>
      <div class="max-w-[2540px] px-3 h-full">
        <div class="max-w-[940px] h-full w-full flex items-center justify-center">
          <ul class="flex items-center justify-center gap-2">
            {!!stores && !!stores.label && (
              <li>
                <a
                  href={stores.url}
                  class="text-sm font-bold flex items-center justify-center gap-1"
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
                  class="text-sm flex items-center justify-center gap-1"
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
