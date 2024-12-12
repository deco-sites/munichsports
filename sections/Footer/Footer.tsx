import Image from "apps/website/components/Image.tsx";
import BackToTop from "../../components/footer/BackToTop.tsx";
import LanguageSelector from "../../components/footer/LanguageSelector.tsx";
import { extractLanguagesProps } from "../../sdk/i18n.ts";
import type { ImageProps } from "../../sdk/widgets.ts";

/** @titleBy label */
interface Item {
  label: string;
  href: string;
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: Omit<ImageProps, "alt">;
}

/** @titleBy label */
interface App extends Item {
  image: ImageProps;
}

interface Props {
  social?: Social[];
  links?: Item[];
  apps?: App[];
  copyright?: string;
  policies?: Item[];
}

export default function Footer(props: Props) {
  const {
    links = [],
    social = [],
    apps = [],
    policies = [],
    copyright,
  } = props;

  const { translations, language } = extractLanguagesProps(
    props,
  );

  return (
    <>
      <BackToTop label={translations?.backToTop || ""} />
      <footer
        class="px-5 flex flex-col py-6"
        style={{ backgroundColor: "#ffffff" }}
      >
        <ul class="flex justify-center w-full items-center gap-2">
          {social.map(({ image, alt, href }) => (
            <li>
              <a href={href}>
                <Image
                  src={image.src}
                  alt={alt || "Social icon"}
                  width={image.width || 0}
                  height={image.height}
                  loading="lazy"
                />
              </a>
            </li>
          ))}
        </ul>
        <ul class="flex flex-col py-6 items-center justify-center text-[13px] font-bold text-[#454545] leading-[13px]">
          {links.map(({ href, label }) => (
            <li>
              <a href={href} class="px-4 py-2 inline-block w-full">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <ul class="flex flex-col justify-center items-center gap-4">
          {apps.map(({ image, label }) => (
            <li class="flex flex-col items-center justify-center gap-4">
              <Image
                src={image.src}
                alt={image.alt || "App icon"}
                width={image.width || 0}
                height={image.height}
                loading="lazy"
              />
              <span class="text-sm/[14px] font-bold text-[#9a9a9a]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </footer>
      <LanguageSelector language={language} />
      <div class="h-11 bg-[#ececec] text-[#9a9a9a] text-[13px] px-3 flex items-center font-bold">
        {copyright}
      </div>
      <ul class="flex flex-col gap-1 items-center py-2">
        {policies.map(({ label, href }) => (
          <li>
            <a class="text-xs font-semibold h-[26px] inline-block" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export const LoadingFallback = (props: Props) => <Footer {...props} />;
