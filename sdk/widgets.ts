import type { ImageWidget } from "apps/admin/widgets.ts";

export interface ImageProps {
  src: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}
