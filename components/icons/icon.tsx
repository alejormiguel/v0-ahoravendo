
import type { FC } from "react"

interface IconProps {
  icon?: string; // svg file
  color?: string; // CSS color or Tailwind class
  size?: string | number; // width and height in pixels
  className?: string;
  alt?: string; // alt text for the image
}

export const Icon: FC<IconProps> = ({
  icon = "",
  color = "",
  size = 16,
  className = "",
  alt = "icon",
}) => {
  // If color is a Tailwind class, add it to className. If it's a CSS color, use style.
  const isTailwind = color.startsWith("bg-") || color.startsWith("text-") || color.startsWith("filter-");
  const imgClass = [isTailwind ? color : "", className].filter(Boolean).join(" ");
  const style = !isTailwind && color ? { filter: `drop-shadow(0 0 0 ${color})` } : undefined;
  const src = "/images/icons/" + icon + ".svg";

  return (
    <img
      //src={sizeToSrc[size] || sizeToSrc[16]}
      src={src}
      className={imgClass}
      style={style}
      width={size}
      height={size}
      alt={[icon, alt].join(" ")}
    />
  );
};
