import {
  type App as A,
  type AppContext as AC,
  type AppMiddlewareContext as AMC,
} from "@deco/deco";
import { type Section } from "@deco/deco/blocks";
import { setCookie } from "@std/http/cookie";
import commerce from "apps/commerce/mod.ts";
import { color as linx } from "apps/linx/mod.ts";
import { color as nuvemshop } from "apps/nuvemshop/mod.ts";
import { color as logicommerce } from "apps/logicommerce/mod.ts";
import { color as shopify } from "apps/shopify/mod.ts";
import { color as vnda } from "apps/vnda/mod.ts";
import { color as vtex } from "apps/vtex/mod.ts";
import { color as wake } from "apps/wake/mod.ts";
import { Props as WebsiteProps } from "apps/website/mod.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "../manifest.gen.ts";

export interface Props extends WebsiteProps {
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  theme?: Section;
  /**
   * @title Supported Languages
   * @description List of supported languages
   */
  supportedLanguages?: string[];
  /**
   * @title Default Language
   * @default es
   */
  defaultLanguage?: string;
}

export type Platform =
  | "vtex"
  | "vnda"
  | "shopify"
  | "wake"
  | "linx"
  | "nuvemshop"
  | "logicommerce"
  | "custom";

export let _platform: Platform = "custom";

export type App = ReturnType<typeof Site>;

// @ts-ignore somehow deno task check breaks, I have no idea why
export type AppContext = AC<App>;
export type AppMiddlewareContext = AMC<App>;

const color = (platform: string) => {
  switch (platform) {
    case "vtex":
      return vtex;
    case "vnda":
      return vnda;
    case "wake":
      return wake;
    case "shopify":
      return shopify;
    case "linx":
      return linx;
    case "nuvemshop":
      return nuvemshop;
    case "logicommerce":
      return logicommerce;
    case "deco":
      return 0x02f77d;
    default:
      return 0x212121;
  }
};

let firstRun = true;

/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(
  { ...state }: Props,
): A<Manifest, Props, [ReturnType<typeof commerce>]> {
  _platform = state.platform || "custom";
  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
    console.info(
      ` ${rgb24("Storefront", color("deco"))} | ${
        rgb24(_platform, color(_platform))
      } \n`,
    );
  }
  return {
    state,
    manifest,
    dependencies: [commerce(state)],
    middleware: (_props: unknown, req: Request, ctx: AppMiddlewareContext) => {
      const supportedLanguages = ctx.supportedLanguages || [];
      const defaultLanguage = ctx.defaultLanguage || "es";

      // Accessible from useSectionWithHref
      req.headers.set(
        "__supported_languages",
        JSON.stringify(supportedLanguages),
      );
      req.headers.set("__default_language", defaultLanguage);

      const url = new URL(req.url);

      const path = url.pathname;
      const search = url.search;

      const [_, language] = path.split("/");

      const IGNORE_PATHS = ["/deco", "/api", "/live"];
      const IS_FILE = /\.[^.]+$/;

      if (
        IGNORE_PATHS.some((p) => path.startsWith(p)) ||
        path.startsWith("/_") ||
        IS_FILE.test(path) ||
        search.includes("__cb") // Admin preview uses __cb to override props and matchers
      ) {
        return ctx.next!();
      }

      if (language && supportedLanguages.includes(language)) {
        setCookie(ctx.response.headers, {
          name: "language",
          value: language,
          path: "/",
          httpOnly: true,
        });
      } else {
        ctx.response.status = 302;
        ctx.response.headers.set(
          "Location",
          `/${defaultLanguage}${path}${search}`,
        );
      }

      if (_props && typeof _props === "object") {
        Object.assign(_props, {
          _language: language,
          _supportedLanguages: supportedLanguages,
          url: req.url,
        });
      }

      return ctx.next!();
    },
  };
}
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
