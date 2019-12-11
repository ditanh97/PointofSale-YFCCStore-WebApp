// import React from 'react';
// import MaterialTable from 'material-table';
// import {makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   toolbar: theme.mixins.toolbar,
//   content: {
//     width: '100vw',
//     height: '100vh',
//     backgroundColor: 'yellow'
//   }
// }))

//  const Table = () => {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     columns: [
//       { title: 'Name', field: 'name' },
//       { title: 'Surname', field: 'surname' },
//       { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//       {
//         title: 'Birth Place',
//         field: 'birthCity',
//         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//       },
//     ],
//     data: [
//       { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//       {
//         name: 'Zerya Betül',
//         surname: 'Baran',
//         birthYear: 2017,
//         birthCity: 34,
//       },
//     ],
//   });

//   return (
//     <div className={classes.content}>
//       <div className={classes.toolbar} />
//         <MaterialTable
//           title="Editable Example"
//           columns={state.columns}
//           data={state.data}
//           editable={{
//             onRowAdd: newData =>
//               new Promise(resolve => {
//                 setTimeout(() => {
//                   resolve();
//                   setState(prevState => {
//                     const data = [...prevState.data];
//                     data.push(newData);
//                     return { ...prevState, data };
//                   });
//                 }, 600);
//               }),
//             onRowUpdate: (newData, oldData) =>
//               new Promise(resolve => {
//                 setTimeout(() => {
//                   resolve();
//                   if (oldData) {
//                     setState(prevState => {
//                       const data = [...prevState.data];
//                       data[data.indexOf(oldData)] = newData;
//                       return { ...prevState, data };
//                     });
//                   }
//                 }, 600);
//               }),
//             onRowDelete: oldData =>
//               new Promise(resolve => {
//                 setTimeout(() => {
//                   resolve();
//                   setState(prevState => {
//                     const data = [...prevState.data];
//                     data.splice(data.indexOf(oldData), 1);
//                     return { ...prevState, data };
//                   });
//                 }, 600);
//               }),
//           }}
//         />
//     </div>
//   );
// }

// export default Table;


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Button, TextField, Dialog, DialogActions,
DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center', },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'yellow'
  }
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  // TABLE
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //DIALOG
  const [open, setOpen] = React.useState(false);

  //TABLE
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //DIALOG
  const handleClickOpen = (title) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DialogAddEdit = () => {
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add your product here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Product Name"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="stock"
          label="Stock"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Category"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="image"
          label="Image"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
    )
  }

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {/* ADD BUTTON */}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ADD PRODUCT
      </Button>
      {/* TABLE */}
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return column.id === "action" ?
                        <TableCell key={column.id} align={column.align}>
                          <Button variant="outlined" color="primary">Del</Button>
                          {' '}
                          <Button variant="outlined" color="primary" onClick={handleClickOpen}>Edit</Button>
                        </TableCell> :
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* DIALOG */}
      {DialogAddEdit()}

    </div>
  );
}