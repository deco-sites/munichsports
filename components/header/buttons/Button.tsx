import { JSX } from "preact";
import { clx } from "../../../sdk/clx.ts";

function isAnchor(
  props:
    | JSX.HTMLAttributes<HTMLLabelElement>
    | JSX.HTMLAttributes<HTMLAnchorElement>,
): props is JSX.HTMLAttributes<HTMLAnchorElement> {
  return "href" in props || "download" in props || "target" in props ||
    "rel" in props;
}

type Props =
  | JSX.HTMLAttributes<HTMLLabelElement>
  | JSX.HTMLAttributes<HTMLAnchorElement>;

export default function Button({
  class: _class,
  className,
  ...props
}: Props) {
  if (isAnchor(props)) {
    const _props = props as JSX.HTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        class={clx(
          "w-[54px] h-full flex justify-center items-center",
          _class,
          className,
        )}
        {..._props}
      />
    );
  }

  return (
    <label
      class={clx(
        "w-[54px] h-full flex justify-center items-center",
        _class,
        className,
      )}
      {...props as JSX.HTMLAttributes<HTMLLabelElement>}
    />
  );
}
