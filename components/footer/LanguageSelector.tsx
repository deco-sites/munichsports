import { $t } from "../../sdk/i18n.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  language?: string;
}

export default function LanguageSelector({ language }: Props) {
  const { languages, spain } = $t(language);

  return (
    <div class="border-t-2 border-[#ececec] h-[50px] flex items-center px-3 text-[13px] gap-7">
      <span class="flex gap-2 items-center underline underline-offset-4">
        <Icon id="country" size={16} />
        {spain}
      </span>
      <div class="w-[2px] h-[13px] bg-[#dddddd]" />
      <div class="flex gap-2 items-center justify-center">
        <Icon id="language" size={16} />
        <span class="underline underline-offset-4">
          {languages?.[language as keyof typeof languages || "es"]}
        </span>
      </div>
    </div>
  );
}
