import { SIDEMENU_LANGUAGE_ID } from "../../../constants.ts";
import { $t } from "../../../sdk/i18n.ts";
import Drawer from "../../ui/Drawer.tsx";
import MenuHeader from "../menu/Header.tsx";
import Menu from "../menu/Menu.tsx";

interface Props {
  supportedLanguages?: string[];
  currentUrl?: (lang: string) => string | undefined;
}

export default function LanguageSelectorDrawer({
  supportedLanguages,
  currentUrl,
}: Props) {
  return (
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
                url: currentUrl?.(lang) ?? "#",
              };
            }) || []}
            header={<MenuHeader backButtonCloses={SIDEMENU_LANGUAGE_ID} />}
          />
        </Drawer.Aside>
      }
    />
  );
}
