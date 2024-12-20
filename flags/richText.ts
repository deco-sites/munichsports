export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import { type MultivariateFlag } from "@deco/deco/blocks";
import { RichText as RichTextWidget } from "apps/admin/widgets.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";

/**
 * @title RichText Variants
 */
export default function RichText(
  props: MultivariateProps<RichTextWidget>,
): MultivariateFlag<RichTextWidget> {
  return multivariate(props);
}
