import { ProductListingPage } from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";
export type Props = Pick<ProductListingPage, "sortOptions"> & {
  url: string;
};
const getUrl = (href: string, value: string) => {
  const url = new URL(href);
  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);
  return url.href;
};
const labels: Record<string, string> = {
  "id:asc": "ID in ascending order",
  "id:desc": "ID in descending order",
  "pId:asc": "Parent ID in ascending order",
  "pId:desc": "Parent ID in descending order",
  "sku:asc": "SKU in ascending order",
  "sku:desc": "SKU in descending order",
  "name:asc": "Name in ascending order",
  "name:desc": "Name in descending order",
  "priority:asc": "Priority in ascending order",
  "priority:desc": "Priority in descending order",
  "price:asc": "Price in ascending order",
  "price:desc": "Price in descending order",
  "offer:asc": "Offer in ascending order",
  "offer:desc": "Offer in descending order",
  "featured:asc": "Featured in ascending order",
  "featured:desc": "Featured in descending order",
  "publicationDate:asc": "Publication Date in ascending order",
  "publicationDate:desc": "Publication Date in descending order",
};
function Sort({ sortOptions, url }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));
  return (
    <>
      <label for="sort" class="sr-only">
        Sort by
      </label>
      <select
        name="sort"
        class="select w-full max-w-sm rounded-lg"
        hx-on:change={useScript(() => {
          const select = event!.currentTarget as HTMLSelectElement;
          window.location.href = select.value;
        })}
      >
        {options.map(({ value, label }) => (
          <option
            label={labels[label] ?? label}
            value={value}
            selected={value === current}
          >
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
export default Sort;
