import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Snackbar, SnackbarProps } from './snackbar';

const useStyles = makeStyles(() => {
  return {
    table: {
      minWidth: 550,
      maxWidth: 550,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '70px',
    },
    tableContainer: {
      maxWidth: 550,
    },
    button: {
      width: '100%',
    },
  };
});

interface ISnackbarImplementation extends SnackbarProps {
  id: string;
}

function SnackImplementation({
  variant,
  severity,
  text,
  id,
}: ISnackbarImplementation) {
  const [open, setOpen] = React.useState<boolean>(false);
  const classes = useStyles();

  function appear() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button
        onClick={appear}
        color="primary"
        classes={{ root: classes.button }}
      >
        {id}
      </Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        text={text}
        severity={severity}
        variant={variant}
      />
    </React.Fragment>
  );
}

function createData(
  name: string,
  success: React.ReactElement,
  error: React.ReactElement | null
) {
  return { name, success, error };
}

const rows = [
  createData(
    'Default',
    <SnackImplementation id="Default" text="Default" />,
    null
  ),
  createData(
    'Filled',
    <SnackImplementation
      id="Success filled"
      text="Success filled"
      severity="success"
      variant="filled"
    />,
    <SnackImplementation
      id="Error filled"
      text="Error filled"
      severity="error"
      variant="filled"
    />
  ),
  createData(
    'Outlined',
    <SnackImplementation
      id="Success outlined"
      text="Success outlined"
      severity="success"
      variant="outlined"
    />,
    <SnackImplementation
      id="Error outlined"
      text="Error outlined"
      severity="error"
      variant="outlined"
    />
  ),
  createData(
    'Standard',
    <SnackImplementation
      id="Success standard"
      text="Success standard"
      severity="success"
      variant="standard"
    />,
    <SnackImplementation
      id="Error standard"
      text="Error standard"
      severity="error"
      variant="standard"
    />
  ),
];

function BasicTable() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Success</TableCell>
              <TableCell align="center">Error</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.success}</TableCell>
                <TableCell align="right">{row.error}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function SnackGallery() {
  return (
    <React.Fragment>
      <BasicTable />
    </React.Fragment>
  );
}
