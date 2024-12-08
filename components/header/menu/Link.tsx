/**
 * @title {{{label}}}
 */
export interface Props {
  label: string;
  url: string;
}

export default function Link({ label, url }: Props) {
  return (
    <li>
      <a
        class="h-[50px] w-full px-5 flex items-center text-[15px]/[20px] text-[#606060]"
        href={url}
      >
        {label}
      </a>
    </li>
  );
}
