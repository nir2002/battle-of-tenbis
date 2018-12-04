import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

export const CustomizedTableCell = color => {
  const tableColors = theme => ({
    backgroundColor: theme.palette.common[color],
    color: theme.palette.common[color === "white" ? "black" : "white"]
  });

  const defaultTableStyles = theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  });

  const tableStyles = theme => ({
    head: {
      ...tableColors(theme)
    },
    body: {
      ...tableColors(theme),
      fontSize: 14
    }
  });

  const styles = theme =>
    color ? tableStyles(theme) : defaultTableStyles(theme);

  return withStyles(theme => styles(theme))(TableCell);
};
