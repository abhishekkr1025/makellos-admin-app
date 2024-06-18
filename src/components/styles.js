// styles.js (or any other file where you consolidate styles)
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  tableCell: {
    fontSize: 14,
  },
});