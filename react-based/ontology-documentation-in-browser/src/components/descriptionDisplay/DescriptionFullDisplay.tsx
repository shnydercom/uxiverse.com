import { FunctionComponent } from "react";
import { DescriptionIconDisplay } from "./DescriptionIconDisplay";
import { Box, Typography } from "@mui/material";

interface DescriptionFullDisplayProps {
  termToDisplay: string;
  descriptionText: string;
}

export const DescriptionFullDisplay: FunctionComponent<DescriptionFullDisplayProps> = ({ termToDisplay, descriptionText }) => {
  return (<Box>
    <DescriptionIconDisplay termToDisplay={termToDisplay} />
    <Typography>{descriptionText}</Typography>
  </Box>);
}