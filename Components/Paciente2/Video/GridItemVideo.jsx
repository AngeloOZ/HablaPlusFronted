import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import css from "../../../styles/VideosPaciente.module.scss";
import { VideosYoutube } from "../../../helpers";

export const GridItemVideo = ({ video }) => {
  const getThumbYoutube = (iframe) => {
    const idVideo = VideosYoutube.getIdVideo(iframe);
    // const url1 = `https://i3.ytimg.com/vi/${idVideo}/maxresdefault.jpg`;
    const url2 = `https://i3.ytimg.com/vi/${idVideo}/hqdefault.jpg`;
    return url2;
  };
  return (
    <Link href={`/paciente/videos/${video.id_unique}`} passHref>
      <ButtonBase className={css.gridItemVideo}>
        <Box
          component={"img"}
          src={getThumbYoutube(video.link)}
          alt={video.description}
        />
      </ButtonBase>
    </Link>
  );
};
