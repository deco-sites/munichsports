import { type LoadingFallbackProps } from "@deco/deco";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import BasketButton from "../../components/header/buttons/Basket.tsx";
import MenuButton from "../../components/header/buttons/Menu.tsx";
import SearchButton from "../../components/header/buttons/Search.tsx";
import UserButton from "../../components/header/buttons/User.tsx";
import MenuHeader from "../../components/header/menu/Header.tsx";
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
  SEARCHBAR_POPUP_ID,
  SIDEMENU_DRAWER_ID,
  SIDEMENU_LANGUAGE_ID,
} from "../../constants.ts";
import { getIdFromObject } from "../../sdk/hash.ts";
import { $t, extractLanguagesProps } from "../../sdk/i18n.ts";
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
const Mobile = (props: Props) => {
  const {
    logo,
    menu,
    loading,
  } = props;
  const { language, supportedLanguages, currentUrl } = extractLanguagesProps(
    props,
  );
  return (
    <>
      <Drawer
        class="[body:has([data-drawer-input='1']:checked)_&]:-translate-x-[50%]"
        id={SIDEMENU_DRAWER_ID}
        input={
          <input
            id={SIDEMENU_DRAWER_ID}
            name={SIDEMENU_DRAWER_ID}
            type="checkbox"
            class="hidden peer"
            aria-label="toggle drawer"
            data-drawer-input="0"
          />
        }
        aside={
          <Drawer.Aside class="bg-white">
            {loading === "lazy"
              ? <Drawer.Loading id={SIDEMENU_DRAWER_ID} />
              : menu
              ? (
                <>
                  <Menu
                    {...menu}
                    header={<MenuHeader logo={logo} />}
                    language={language}
                    supportedLanguages={supportedLanguages}
                  />
                </>
              )
              : null}
          </Drawer.Aside>
        }
      />
      {loading !== "lazy" && menu?.items?.map((item) => {
        const id = getIdFromObject(item);
        return (
          <>
            <Drawer
              class="[body:has([data-drawer-input='2']:checked)_&]:-translate-x-[50%] z-[41]"
              side="right"
              id={id}
              input={
                <input
                  id={id}
                  name={id}
                  type="checkbox"
                  class="hidden peer"
                  aria-label="toggle drawer"
                  data-drawer-input="1"
                />
              }
              aside={
                <Menu
                  level={1}
                  items={item.children || []}
                  header={
                    <MenuHeader title={item.label} backButtonCloses={id} />
                  }
                />
              }
            />
            {item.children?.map((child) => {
              const id = getIdFromObject(child);
              return (
                <Drawer
                  class="z-[42]"
                  side="right"
                  id={id}
                  input={
                    <input
                      id={id}
                      name={id}
                      type="checkbox"
                      class="hidden peer"
                      aria-label="toggle drawer"
                      data-drawer-input="2"
                    />
                  }
                  aside={
                    <Menu
                      level={2}
                      items={child.children || []}
                      header={
                        <MenuHeader title={child.label} backButtonCloses={id} />
                      }
                    />
                  }
                />
              );
            })}
          </>
        );
      })}
      {loading !== "lazy" && (
        <Drawer
          side="right"
          id={SIDEMENU_LANGUAGE_ID}
          input={
            <input
              id={SIDEMENU_LANGUAGE_ID}
              name={SIDEMENU_LANGUAGE_ID}
              type="checkbox"
              class="hidden peer"
              aria-label="toggle drawer"
              data-drawer-input="1"
            />
          }
          aside={
            <Drawer.Aside class="bg-white">
              <Menu
                level={2}
                items={supportedLanguages?.map((lang) => {
                  const languages = $t(lang).languages;
                  return {
                    label: languages[lang as keyof typeof languages],
                    url: currentUrl(lang),
                  };
                }) || []}
                header={<MenuHeader backButtonCloses={SIDEMENU_LANGUAGE_ID} />}
              />
            </Drawer.Aside>
          }
        />
      )}

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
};

function Header(props: SectionProps) {
  const device = useDevice();
  return (
    <header class="bg-white w-full h-[60px] border-b border-[#ececec] sticky top-0 z-40">
      {device === "desktop" ? <Desktop {...props} /> : <Mobile {...props} />}
    </header>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);

export default Header;
