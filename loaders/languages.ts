import { allowCorsFor } from "@deco/deco";
import { AppContext } from "../apps/site.ts";

export default function languages(
  _props: unknown,
  req: Request,
  ctx: AppContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  return ctx.supportedLanguages || ["No languages found"];
}
