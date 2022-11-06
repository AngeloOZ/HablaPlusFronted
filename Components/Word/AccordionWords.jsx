import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { TableWord } from "./";

export const AccordionWords = ({ category }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
      >
        <Typography textTransform={"capitalize"}>
          {category.description}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
          <TableWord category={category} />
      </AccordionDetails>
    </Accordion>
  );
};
