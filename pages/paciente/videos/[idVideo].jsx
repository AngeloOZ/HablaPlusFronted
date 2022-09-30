import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, ButtonBase } from "@mui/material";
import ReactPlayer from "react-player";

import css from "../../../styles/VideosPaciente.module.scss";
import { PatientLayout } from "../../../Layouts";
import { VideosYoutube } from "../../../helpers";

const PageIdVideo = () => {
  const router = useRouter();
  const [listVideos, setListVideos] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [titlePage, setTitlePage] = useState("Habla+");
  const [videos, setVideos] = useState({
    currentVideo: undefined,
    previousVideo: undefined,
    nextVideo: undefined,
  });
  const [idVideo, setIdVideo] = useState(router.query.idVideo);
  const [playVideo, setPlayVideo] = useState(true);

  const handleTogglePlayVideo = () => {
    setPlayVideo(!playVideo);
  };

  const redirectTo = (id) => {
    setIdVideo(id);
    router.push({
      pathname: "/paciente/videos/[idVideo]",
      query: { idVideo: id },
    });
  };

  useEffect(() => {
    const list = localStorage.getItem("listVideos");
    setListVideos(JSON.parse(list));
  }, [idVideo]);

  useEffect(() => {
    if (videos.currentVideo) {
      setCurrentUrl(VideosYoutube.getUrlVideo(videos.currentVideo?.link));
      setTitlePage(`Habla+ ${videos.currentVideo?.description}`);
    }
  }, [videos]);

  useEffect(() => {
    listVideos.forEach((video, index) => {
      if (video.id_unique === idVideo) {
        setVideos({
          currentVideo: video,
          previousVideo: listVideos[index - 1],
          nextVideo: listVideos[index + 1],
        });
      }
    });
  }, [listVideos]);

  return (
    <PatientLayout
      currentUser
      urlToProfile="/paciente/videos"
      urlBackground="fondo2.png"
      title={titlePage}
    >
      <Box component={"div"} className={css.contenedorVideosDinamicos}>
        <Box component={"div"} className={css.contenedorVideo}>
          <ReactPlayer
            url={currentUrl}
            width="100%"
            height="100%"
            playing={playVideo}
            onReady={() => setPlayVideo(true)}
            onPause={() => setPlayVideo(false)}
          />
        </Box>
        <Box component={"div"} className={css.contenedorControls}>
          <ButtonBase
            className={`${css.btnControls} ${
              !videos.previousVideo ? css.disable : ""
            }`}
            disabled={videos.previousVideo ? false : true}
            onClick={() => redirectTo(videos.previousVideo?.id_unique)}
          >
            <Box
              component={"img"}
              src={`${process.env.NEXT_PUBLIC_URL}img/botones/btn-preview.png`}
              alt="Habla+ botones"
            />
          </ButtonBase>
          <ButtonBase
            className={css.btnControls}
            onClick={handleTogglePlayVideo}
          >
            <Box
              component={"img"}
              src={`${process.env.NEXT_PUBLIC_URL}img/botones/btn-play.png`}
              alt="Habla+ botones"
            />
          </ButtonBase>
          <ButtonBase
            className={`${css.btnControls} ${
              !videos.nextVideo ? css.disable : ""
            }`}
            disabled={videos.nextVideo ? false : true}
            onClick={() => redirectTo(videos.nextVideo?.id_unique)}
          >
            <Box
              component={"img"}
              src={`${process.env.NEXT_PUBLIC_URL}img/botones/btn-next.png`}
              alt="Habla+ botones"
            />
          </ButtonBase>
        </Box>
      </Box>
    </PatientLayout>
  );
};

export default PageIdVideo;

export const getServerSideProps = async ({req}) => {
  return {
    props: {
      
    }
  }
}
