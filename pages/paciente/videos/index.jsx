import React from "react";
import { GridContainerVideos, LoaderPatient } from "../../../Components";
import { useGetVideos } from "../../../Components/Videos/Hooks";
import { PatientLayout } from "../../../Layouts";

const PageVideos = () => {
  const { isLoading, videos } = useGetVideos();
  return (
    <PatientLayout currentUser urlBackground="fondo2.png">
      {isLoading ? (
        <LoaderPatient fullScreen />
      ) : (
        <GridContainerVideos videos={videos || []} />
      )}
    </PatientLayout>
  );
};

export default PageVideos;
