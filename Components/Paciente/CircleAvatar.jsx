import { Box } from "@mui/material";
import { useRouter } from "next/router";
import css from "../../styles/Components.module.scss";


export const CircleAvatar = ({ srcImage, hrefTo, size = "small", className }) => {
  const router = useRouter();
  
  const sizeClass = size === "large" ? css.large : css.small;
  const hoverClass = hrefTo ? css.hover : "";

  const handleClick = () => {
    if (hrefTo && hrefTo != "") {
      router.push(hrefTo);
    }
  };

  return (
    <div
      className={`${css.circleAvatar} ${sizeClass} ${hoverClass} ${className}`}
      onClick={handleClick}
    >
      <Box
        component={"img"}
        src={srcImage}
        alt="Avatar Habla+"
        className={css.circleAvatarImagen}
      />
    </div>
  );
};
