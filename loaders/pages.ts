import type { Route } from "apps/website/flags/audience.ts";
import { removeTrailingSlash } from "apps/website/loaders/redirectsFromCsv.ts";
import Page from "apps/website/pages/Page.tsx";
import type { AppContext } from "../apps/site.ts";

async function getAllPages(ctx: AppContext): Promise<Route[]> {
  const allPages = await ctx.get<Record<string, Parameters<typeof Page>[0]>>({
    type: "pages",
    __resolveType: "blockSelector",
  });

  const routes: Route[] = [];

  for (
    const [pageId, { path: pathTemplate }] of Object.entries(allPages ?? {})
  ) {
    if (!pathTemplate) {
      continue;
    }

    routes.push({
      pathTemplate,
      handler: {
        value: {
          __resolveType: "website/handlers/fresh.ts",
          page: {
            __resolveType: pageId,
          },
        },
      },
    });

    for (const language of ctx.supportedLanguages || []) {
      routes.push({
        pathTemplate: removeTrailingSlash(`/${language}${pathTemplate}`),
        handler: {
          value: {
            __resolveType: "website/handlers/fresh.ts",
            page: {
              __resolveType: pageId,
            },
          },
        },
      });
    }
  }

  return routes;
}
/**
 * @title Pages with localization
 */
export default async function Pages(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Route[]> {
  const allPages = await ctx.get<Route[]>({
    func: () => getAllPages(ctx),
    __resolveType: "once",
  });

  return allPages;
}
