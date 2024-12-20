import { $t } from "../../sdk/i18n.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  language?: string;
  supportedLanguages?: string[];
  currentUrl: (language: string) => string | undefined;
}

export default function LanguageSelector({
  language,
  supportedLanguages,
  currentUrl,
}: Props) {
  const { languages, spain } = $t(language);

  return (
    <div class="border-t-2 border-[#ececec] h-[50px] flex items-center px-3 text-[13px] gap-7">
      <span class="flex gap-2 items-center underline underline-offset-4">
        <Icon id="country" size={16} />
        {spain}
      </span>
      <div class="w-[2px] h-[13px] bg-[#dddddd]" />
      <div class="relative">
        <input
          type="checkbox"
          id="footer-language-selector-dropdown"
          class="peer hidden"
        />
        <label
          htmlFor="footer-language-selector-dropdown"
          class="h-full flex gap-1 justify-between items-center cursor-pointer hover:text-[#9a9a9a] transition-colors duration-300 ease-in-out"
        >
          <Icon id="language" size={16} />
          <span class="underline underline-offset-4">
            {languages[language as keyof typeof languages || "es"]}
          </span>
        </label>
        <label
          htmlFor="footer-language-selector-dropdown"
          class="fixed inset-0 z-[49] hidden peer-checked:block"
          aria-label="Close language selector"
        />
        <div class="absolute bottom-[calc(100%+10px)] -left-2 w-fit bg-white z-50 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity duration-300 rounded border border-solid border-black/15 min-w-48 py-2">
          <ul class="flex flex-col text-sm">
            {supportedLanguages?.map((language) => (
              <li>
                <a
                  class="px-[22px] h-8 flex items-center hover:text-[#9a9a9a] transition-colors duration-300"
                  href={currentUrl(language)}
                >
                  {languages[language as keyof typeof languages]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
