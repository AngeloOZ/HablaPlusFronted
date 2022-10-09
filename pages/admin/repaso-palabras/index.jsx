import { Box, Button } from "@mui/material";
import Link from "next/link";
import { AdminLayouts } from "../../../Layouts";

const PageAdminRepaso = () => {
  return (
    <AdminLayouts titlePage={"Oraciones de repaso"}>
      <Box
        component={"div"}
        width="100%"
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Link href="/admin/repaso-palabras/agregar">
          <Button>Agregar categoria</Button>
        </Link>
      </Box>
    </AdminLayouts>
  );
};

export default PageAdminRepaso;
