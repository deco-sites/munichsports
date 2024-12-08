import Icon from "../../ui/Icon.tsx";
import Button from "./Button.tsx";

export default function UserButton() {
  return (
    <Button aria-label="open user menu" href="/user">
      <Icon id="user" size={24} />
    </Button>
  );
}
