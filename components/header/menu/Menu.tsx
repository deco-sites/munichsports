import type { ComponentChildren } from "preact";
import MenuItem, { FirstLevelItem } from "./Item.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import Link, { type Props as LinkProps } from "./Link.tsx";

export interface Props {
  items: FirstLevelItem[];
  links?: LinkProps[];
  /**
   * @ignore
   */
  level?: number;
  /**
   * @ignore
   */
  header?: ComponentChildren;
  /**
   * @ignore
   */
  language?: string;
  /**
   * @ignore
   */
  supportedLanguages?: string[];
}

function Menu({
  items = [],
  links = [],
  level = 0,
  header,
  language,
  supportedLanguages,
}: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto bg-white"
      style={{ minWidth: "100vw" }}
    >
      {header}
      <ul class="bg-[#f4f4f4] flex flex-col divide-y divide-black/15 overflow-y-auto border-b border-black/15">
        {items.map((item) => <MenuItem item={item} level={level} />)}
      </ul>

      {links.length > 0 && (
        <ul class="flex flex-col">
          {links.map((link) => <Link {...link} />)}
        </ul>
      )}
      {language && supportedLanguages?.length && (
        <LanguageSelector
          language={language}
          supportedLanguages={supportedLanguages}
        />
      )}
    </div>
  );
}

export default Menu;
