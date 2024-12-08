import { ImageProps } from "../../../sdk/widgets.ts";
import MenuHeader from "./Header.tsx";
import MenuItem, { FirstLevelItem } from "./Item.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import Link, { type Props as LinkProps } from "./Link.tsx";

export interface Props {
  items: FirstLevelItem[];
  links: LinkProps[];
  /**
   * This prop is already defined in the parent component
   * @ignore
   */
  logo?: ImageProps;
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
  logo,
  language,
  supportedLanguages,
}: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "100vw" }}
    >
      <MenuHeader logo={logo} />
      <ul class="bg-[#f4f4f4] flex flex-col divide-y divide-black/15 overflow-y-auto border-b border-black/15">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>

      {links.length > 0 && (
        <ul class="flex flex-col">
          {links.map((link) => <Link {...link} />)}
        </ul>
      )}
      <LanguageSelector
        language={language}
        supportedLanguages={supportedLanguages}
      />
    </div>
  );
}

export default Menu;
