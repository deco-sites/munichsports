interface Translations {
  myAccount: string;
  languages: {
    es: string;
    en: string;
  };
  spain: string;
  backToTop: string;
}

const languages = {
  es: "Castellano",
  en: "English",
};

const translations: Record<string, Translations> = {
  en: {
    myAccount: "My account",
    languages,
    spain: "Spain",
    backToTop: "Back to top",
  },
  es: {
    myAccount: "Mi cuenta",
    languages,
    spain: "España",
    backToTop: "Volver arriba",
  },
};

export function $t(language?: string) {
  return translations[language || "es"];
}

export function extractLanguagesProps(
  props: unknown,
): {
  language?: string;
  supportedLanguages?: string[];
  translations?: Translations;
} {
  if (
    typeof props === "object" &&
    props !== null &&
    props !== undefined &&
    !Array.isArray(props) &&
    ("_supportedLanguages" in props || "_language" in props)
  ) {
    const language = "_language" in props && typeof props._language === "string"
      ? props._language
      : undefined;

    const supportedLanguages =
      "_supportedLanguages" in props && Array.isArray(props._supportedLanguages)
        ? props._supportedLanguages
        : undefined;

    return {
      language,
      supportedLanguages,
      translations: $t(language),
    };
  }

  return {
    language: undefined,
    supportedLanguages: undefined,
    translations: undefined,
  };
}
