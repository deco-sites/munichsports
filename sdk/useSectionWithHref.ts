import { useSection } from "deco/hooks/useSection.ts";
import { SectionContext } from "deco/components/section.tsx";
import { useContext } from "preact/hooks";

export default function useSectionWithHref(
  props: Parameters<typeof useSection>[0],
) {
  if (!props?.href) return useSection(props);

  const ctx = useContext(SectionContext);

  if (!ctx) {
    throw new Error(
      "ctx not found, useSectionWithHref is VERY SAD with that :((((((((",
    );
  }

  let [_, lang] = new URL(ctx.request.url).pathname.split("/");

  const supportedLanguages = JSON.parse(
    ctx.request.headers.get("__supported_languages") || "[]",
  );
  const defaultLanguage = ctx.request.headers.get(
    "__default_language",
  ) as string;

  if (!supportedLanguages.includes(lang)) lang = defaultLanguage;

  const url = new URL(props.href, "https://deco.cx");
  const path = url.pathname.split("/");

  path.splice(1, 0, lang);
  url.pathname = path.join("/");

  return useSection({
    ...props,
    href: url.href.replace(url.origin, ""),
  });
}
