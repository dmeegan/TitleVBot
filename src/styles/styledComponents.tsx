import { Card, Grid } from "@material-ui/core";
import { styled } from "@material-ui/styles";

export const InputCard = styled(Card)({
  padding: 16,
  width: "100%",
  height: "100%",
  borderRadius: 8,
});
export const OutputCard = styled(Card)({
  padding: 16,
  borderRadius: 8,
  borderColor: "rgb(255, 100, 146)",
});

export const CustomGridContainer = styled(Grid)({
  padding: 16,
  width: "100%",
  height: "100%",
  borderRadius: 16,
  backgroundColor: "#FFFFFF",
});
