import Icon from "../ui/Icon.tsx";

interface Props {
  label: string;
}

export default function BackToTop({ label }: Props) {
  return (
    <button
      hx-on:click="window.scrollTo({ top: 0, behavior: 'smooth' })"
      class="w-full h-10 flex justify-between items-center bg-[#a5a5a5] text-white px-3 hover:bg-black transition-colors"
    >
      <span class="uppercase text-[13px] font-bold font-montserrat tracking-[0.0625rem]">
        {label}
      </span>
      <Icon id="to-top-arrow" size={20} />
    </button>
  );
}
