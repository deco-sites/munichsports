import { SIDEMENU_DRAWER_ID } from "../../../constants.ts";
import Icon from "../../ui/Icon.tsx";
import Button from "./Button.tsx";

export default function MenuButton() {
  return (
    <Button for={SIDEMENU_DRAWER_ID} aria-label="open menu">
      <Icon id="menu" size={24} />
    </Button>
  );
}
