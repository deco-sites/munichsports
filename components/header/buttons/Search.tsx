import { SEARCHBAR_DRAWER_ID } from "../../../constants.ts";
import Icon from "../../ui/Icon.tsx";

export default function SearchButton() {
  return (
    <label for={SEARCHBAR_DRAWER_ID} aria-label="open search" class="p-2">
      <Icon id="search" size={16} />
    </label>
  );
}
