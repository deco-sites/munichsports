import { SEARCHBAR_DRAWER_ID } from "../../../constants.ts";
import Icon from "../../ui/Icon.tsx";
import Button from "./Button.tsx";

export default function SearchButton() {
  return (
    <Button for={SEARCHBAR_DRAWER_ID} aria-label="open search">
      <Icon id="search" size={24} />
    </Button>
  );
}
