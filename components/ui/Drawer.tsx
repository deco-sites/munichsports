import { useScript } from "@deco/deco/hooks";
import { type ComponentChildren, JSX } from "preact";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  input?: ComponentChildren;
  side?: "left" | "right";
  aside: ComponentChildren;
  id: string;
}

const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    input.checked = false;
  };
  addEventListener("keydown", handler);
};

function Drawer({
  children,
  aside,
  open,
  input,
  side = "left",
  class: _class = "",
  id,
}: Props) {
  return (
    <div class="contents">
      {/* <div class={clx("drawer", _class, side === "right" && "drawer-end")}> */}
      {input || (
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="peer hidden"
          aria-label={open ? "open drawer" : "closed drawer"}
        />
      )}
      <div
        class={clx(
          "fixed top-0 bottom-0 w-screen max-w-[500px] z-40 h-dvh transition-all duration-300 ease-in-out",
          side === "right" &&
            "right-0 translate-x-full peer-checked:translate-x-0",
          side === "left" &&
            "left-0 -translate-x-full peer-checked:translate-x-0",
          _class,
        )}
      >
        {
          /* {input || (
          <input
            id={id}
            name={id}
            checked={open}
            type="checkbox"
            class="drawer-toggle"
            aria-label={open ? "open drawer" : "closed drawer"}
          />
        )} */
        }

        {/* <div class="drawer-content"> */}
        {children}
        {/* </div> */}

        <aside
          data-aside
          class={clx(
            "h-full overflow-hidden",
            "[[data-aside]&_section]:contents",
          )}
        >
          <label for={id} class="drawer-overlay" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </div>
  );
}

function Aside({
  class: _class,
  className,
  ...props
}: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-aside
      class={clx(
        "grid grid-rows-[auto_1fr] h-full max-w-[100vw]",
        _class,
        className,
      )}
    />
  );
}

function Button({
  class: _class,
  className,
  ...props
}: JSX.HTMLAttributes<HTMLLabelElement>) {
  return <label class={clx("btn btn-ghost", _class, className)} {...props} />;
}

function Loading({ id }: { id: string }) {
  return (
    <div
      id={id}
      class="h-full flex items-center justify-center"
      style={{ minWidth: "100vw" }}
    >
      <span class="loading loading-spinner" />
    </div>
  );
}

Drawer.Button = Button;
Drawer.Aside = Aside;
Drawer.Loading = Loading;

export default Drawer;
