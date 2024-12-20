import { LoadingFallbackProps } from "@deco/deco";

/**
 * @title {{{size}}}
 */
interface Sizes {
  size: string;
  url: string;
}

interface SizeGroup {
  sizes: Sizes[];
}

interface Props {
  /**
   * @format textarea
   */
  title: string;
  groups: SizeGroup[];
}

export default function ProductSizes({ title, groups }: Props) {
  return (
    <div class="font-montserrat font-bold flex flex-col py-6 gap-2.5 mb-11">
      <p class="text-xl md:text-2xl md:leading-[26px] text-center leading-[30px] px-2">
        {title}
      </p>
      <div class="flex items-center flex-col md:flex-row md:flex-wrap md:justify-center gap-1 text-white max-w-[100vw] overflow-x-clip md:px-6">
        {groups.map((group, index) => (
          <div class="flex bg-[#333333] rounded w-fit">
            {group.sizes.map(({ size, url }) => (
              <a
                key={size + index}
                href={url}
                class="flex items-center justify-center p-3 text-[13px] h-[47px] w-[46px] tracking-[0.0625rem]"
              >
                {size}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => {
  // deno-lint-ignore no-explicit-any
  return <ProductSizes {...props as any} />;
};
