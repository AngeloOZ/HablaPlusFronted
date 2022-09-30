import { useEffect } from "react";

import css from "../../../styles/VideosPaciente.module.scss";
import { GridItemVideo } from "./GridItemVideo";

export const GridContainerVideos = ({ videos }) => {
  useEffect(() => {
    localStorage.setItem("listVideos", JSON.stringify(videos));
  }, []);

  return (
    <div className={css.contenedorVideosPage}>
      <div className={css.subContenedorVideos}>
        {videos.map((video) => (
          <GridItemVideo key={video.id_unique} video={video} />
        ))}
      </div>
    </div>
  );
};
