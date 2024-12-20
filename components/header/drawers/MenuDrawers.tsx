import { SIDEMENU_DRAWER_ID } from "../../../constants.ts";
import { getIdFromObject } from "../../../sdk/hash.ts";
import { $t } from "../../../sdk/i18n.ts";
import { ImageProps } from "../../../sdk/widgets.ts";
import Drawer from "../../ui/Drawer.tsx";
import MenuHeader from "../menu/Header.tsx";
import Menu, { type Props as MenuProps } from "../menu/Menu.tsx";

interface Props {
  menu?: MenuProps;
  logo?: ImageProps;
  language?: string;
  supportedLanguages?: string[];
}

export default function MenuDrawers({
  menu,
  logo,
  language,
  supportedLanguages,
}: Props) {
  const { seeAll } = $t(language);
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
            {menu
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
      {menu?.items?.map((item) => {
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
                  items={[
                    ...(item.url
                      ? [{
                        label: seeAll,
                        url: item.url,
                      }]
                      : []),
                    ...(item.children || []),
                  ]}
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
                      items={[
                        ...(child.url
                          ? [{
                            label: seeAll,
                            url: child.url,
                          }]
                          : []),
                        ...(child.children || []),
                      ]}
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
    </>
  );
}
