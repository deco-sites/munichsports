import { type MatchContext } from "@deco/deco/blocks";

/**
 * @title Language {{{language}}}
 */
export interface Props {
  /**
   * @format dynamic-options
   * @options site/loaders/languages.ts
   */
  language: string;
}
/**
 * @title Language
 * @description Target users that have a specific language
 * @icon world
 */
const MatchLanguage = (props: Props, ctx: MatchContext) => {
  const path = new URL(ctx.request.url).pathname;
  const [_, language] = path.split("/");
  return language === props.language;
};

export default MatchLanguage;
