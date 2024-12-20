import { type LoadingFallbackProps } from "@deco/deco";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import BasketButton from "../../components/header/buttons/Basket.tsx";
import MenuButton from "../../components/header/buttons/Menu.tsx";
import SearchButton from "../../components/header/buttons/Search.tsx";
import UserButton from "../../components/header/buttons/User.tsx";
import WishlistButton from "../../components/header/buttons/Wishlist.tsx";
import Drawers from "../../components/header/drawers/Drawers.tsx";
import { type Props as MenuProps } from "../../components/header/menu/Menu.tsx";
import Navbar from "../../components/header/navbar/Navbar.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_POPUP_ID,
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

type Props = SectionProps;

const Desktop = ({
  logo,
  searchbar,
  loading,
  menu,
  ...props
}: Props) => {
  const { language } = extractLanguagesProps(props);
  return (
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

      <div class="flex items-center gap-6 h-full px-3 container-fluid container-module">
        <a href="/" aria-label="Store logo" class="shrink-0">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 64}
            height={logo.height || 64}
          />
        </a>

        <Navbar menu={menu} language={language} />

        <div class="flex ml-auto gap-2">
          <SearchButton />
          <WishlistButton />
          <BasketButton />
        </div>
      </div>
    </>
  );
};
const Mobile = (props: Props) => {
  const {
    logo,
    menu,
  } = props;
  const { language, supportedLanguages, currentUrl } = extractLanguagesProps(
    props,
  );
  return (
    <>
      <Drawers
        menu={menu}
        logo={logo}
        language={language}
        supportedLanguages={supportedLanguages}
        currentUrl={currentUrl}
      />

      <div
        class="grid place-items-center w-screen h-full px-3 text-[#888888] relative"
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
};

function Header(props: SectionProps) {
  const device = useDevice();
  return (
    <header class="bg-white w-full h-[60px] md:h-[65px] border-b border-[#ececec] sticky top-0 z-40">
      {device === "desktop" ? <Desktop {...props} /> : <Mobile {...props} />}
    </header>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);

export default Header;
