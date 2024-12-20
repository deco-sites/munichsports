import { ImageProps } from "../../../sdk/widgets.ts";
import { type Props as MenuProps } from "../menu/Menu.tsx";
import LanguageSelectorDrawer from "./LanguageSelector.tsx";
import MenuDrawers from "./MenuDrawers.tsx";

interface Props {
  menu?: MenuProps;
  logo?: ImageProps;
  language?: string;
  supportedLanguages?: string[];
  currentUrl?: (lang: string) => string | undefined;
}

export default function Drawers({
  menu,
  logo,
  language,
  supportedLanguages,
  currentUrl,
}: Props) {
  return (
    <>
      <MenuDrawers
        menu={menu}
        logo={logo}
        language={language}
        supportedLanguages={supportedLanguages}
      />
      <LanguageSelectorDrawer
        supportedLanguages={supportedLanguages}
        currentUrl={currentUrl}
      />
    </>
  );
}
