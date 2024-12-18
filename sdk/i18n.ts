interface Translations {
  myAccount: string;
  languages: {
    es: string;
    en: string;
    ca: string;
    it: string;
  };
  spain: string;
  backToTop: string;
}

const languages = {
  es: "Castellano",
  en: "English",
  ca: "Català",
  it: "Italiano",
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
  ca: {
    myAccount: "La meva compte",
    languages,
    spain: "Espanya",
    backToTop: "Arriba",
  },
  it: {
    myAccount: "Il mio account",
    languages,
    spain: "Spagna",
    backToTop: "Torna su",
  },
};

export function $t(language = "es") {
  return translations[language] || translations["es"];
}

export function extractLanguagesProps(
  props: unknown,
): {
  language?: string;
  supportedLanguages?: string[];
  translations?: Translations;
  currentUrl: (language: string) => string | undefined;
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

    const url = "url" in props && typeof props.url === "string"
      ? props.url
      : undefined;

    return {
      language,
      supportedLanguages,
      translations: $t(language),
      currentUrl: (language: string) => {
        if (!url) {
          return `/${language}`;
        }

        const _url = new URL(url);
        const [_, lang] = _url.pathname.split("/");
        if (supportedLanguages?.includes(lang)) {
          _url.pathname = _url.pathname.replace(`/${lang}`, `/${language}`);
          return _url.pathname + _url.search;
        }

        _url.pathname = `/${language}/${_url.pathname}`;
        return _url.pathname + _url.search;
      },
    };
  }

  return {
    language: undefined,
    supportedLanguages: undefined,
    translations: undefined,
    currentUrl: () => undefined,
  };
}
