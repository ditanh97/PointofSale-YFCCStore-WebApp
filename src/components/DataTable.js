import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Paper, Table, TableBody, TableCell,
TableHead, TablePagination, TableRow, 
} from '@material-ui/core';

import AddUpdate from './AddUpdateDialog'


const useStyles = makeStyles(theme => ({
  root: {
  },
  tableWrapper: {
  },
  actionCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}));


const DataTable = (props) => {
    const classes = useStyles();
    const {data, colStyle, type} = props
    console.log(type);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };


    return (
        <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {colStyle.map(column => (
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
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(datum => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={datum.code}>
                    {colStyle.map(column => {
                        const value = datum[column.id];
                        return column.id === "action" ?
                        <TableCell key={column.id} align={column.align} className={classes.actionCell}>
                            <AddUpdate label="Edit" type={type}/>
                            <div style={{width: 4}}></div>
                            <Button variant="contained" color="secondary">Del</Button>

                        </TableCell> :
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    })}
                    </TableRow>
                );
            })}
            <TableRow><TableCell>
                <AddUpdate label="Add" type={type}/>
            </TableCell></TableRow>
            </TableBody>
            </Table>
        </div>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default DataTable;