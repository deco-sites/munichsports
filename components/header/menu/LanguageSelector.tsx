import { ComponentChildren } from "preact";
import { SIDEMENU_LANGUAGE_ID } from "../../../constants.ts";
import { $t } from "../../../sdk/i18n.ts";
import Icon from "../../ui/Icon.tsx";

function Li({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <li class="h-[50px] w-full px-5 flex items-center text-[15px]/[20px] text-[#606060]">
      {children}
    </li>
  );
}

export default function LanguageSelector({
  language,
  // supportedLanguages,
}: {
  language?: string;
  supportedLanguages?: string[];
}) {
  const { languages, spain } = $t(language);

  return (
    <ul class="flex flex-col">
      <Li>
        <label
          htmlFor={SIDEMENU_LANGUAGE_ID}
          class="h-full w-full flex justify-between items-center"
        >
          <span class="flex gap-3 items-center">
            <Icon id="language" size={19} />
            <span class="underline underline-offset-4">
              {languages[language as keyof typeof languages || "es"]}
            </span>
          </span>
          <Icon id="angle-right" size={16} class="text-[#dc0727]" />
        </label>
      </Li>
      <Li>
        <span class="flex gap-3 items-center underline underline-offset-4">
          <Icon id="country" size={19} />
          {spain}
        </span>
      </Li>
    </ul>
  );
}
