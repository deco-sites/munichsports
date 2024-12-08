import { type LoadingFallbackProps } from "@deco/deco";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import BasketButton from "../../components/header/buttons/Basket.tsx";
import MenuButton from "../../components/header/buttons/Menu.tsx";
import SearchButton from "../../components/header/buttons/Search.tsx";
import UserButton from "../../components/header/buttons/User.tsx";
import Menu, {
  type Props as MenuProps,
} from "../../components/header/menu/Menu.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { extractLanguagesProps } from "../../sdk/i18n.ts";
import { ImageProps } from "../../sdk/widgets.ts";

export interface SectionProps {
  menu?: MenuProps;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /**
   * @title Logo
   */
  logo: ImageProps;
  /**
   * @ignore
   */
  loading?: "eager" | "lazy";
}

type Props = SectionProps & {
  language?: string;
  supportedLanguages?: string[];
};

const Desktop = (
  { logo, searchbar, loading }: Props,
) => (
  <>
    <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container"
        style={{ marginTop: HEADER_HEIGHT_MOBILE }}
      >
        {loading === "lazy"
          ? (
            <div class="flex justify-center items-center">
              <span class="loading loading-spinner" />
            </div>
          )
          : <Searchbar {...searchbar} />}
      </div>
    </Modal>

    <div class="flex flex-col gap-4 pt-5 container border-b border-gray-300">
      <div class="grid grid-cols-3 place-items-center">
        <div class="place-self-start">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 23}
            />
          </a>
        </div>

        <label
          for={SEARCHBAR_POPUP_ID}
          class="input input-bordered flex items-center gap-2 w-full"
          aria-label="search icon button"
        >
          <Icon id="search" />
          <span class="text-base-400 truncate">
            Search products, brands...
          </span>
        </label>

        <div class="flex gap-4 place-self-end">
          <BasketButton />
        </div>
      </div>

      <div class="flex justify-between items-center">
        {
          /* <ul class="flex">
          {menu?.items?.slice(0, 10).map((item) => <NavItem item={item} />)}
        </ul> */
        }
        <div>
          {/* ship to */}
        </div>
      </div>
    </div>
  </>
);
const Mobile = ({
  logo,
  searchbar,
  menu,
  loading,
  language,
  supportedLanguages,
}: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Search">
          <div class="w-screen overflow-y-auto">
            {loading === "lazy"
              ? (
                <div class="h-full w-full flex items-center justify-center">
                  <span class="loading loading-spinner" />
                </div>
              )
              : <Searchbar {...searchbar} />}
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside class="bg-white">
          {loading === "lazy"
            ? <Drawer.Loading id={SIDEMENU_DRAWER_ID} />
            : menu
            ? (
              <Menu
                {...menu}
                logo={logo}
                language={language}
                supportedLanguages={supportedLanguages}
              />
            )
            : null}
        </Drawer.Aside>
      }
    />

    <div
      class="grid place-items-center w-screen h-full px-3 text-[#888888]"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content min-content auto min-content min-content",
      }}
    >
      <MenuButton />
      <SearchButton />

      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 100}
            height={logo.height || 13}
          />
        </a>
      )}

      <UserButton />
      <BasketButton />
    </div>
  </>
);

function Header({
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: SectionProps) {
  const { language, supportedLanguages } = extractLanguagesProps(props);
  const device = useDevice();
  return (
    <header class="bg-white w-full h-[60px] border-b border-[#ececec] sticky top-0 z-40">
      {device === "desktop"
        ? (
          <Desktop
            logo={logo}
            {...props}
            language={language}
            supportedLanguages={supportedLanguages}
          />
        )
        : (
          <Mobile
            logo={logo}
            {...props}
            language={language}
            supportedLanguages={supportedLanguages}
          />
        )}
    </header>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);

export default Header;
