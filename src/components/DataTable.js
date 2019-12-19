import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Paper, Table, TableBody, TableCell,
TableHead, TablePagination, TableRow, Avatar
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
    const {data, colStyle, type, add, update} = props
    console.log(type, 'productsss');

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
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((datum, index) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {colStyle.map(column => {
                        const value = datum[column.id];
                        return column.id === "action" ?
                        <TableCell key={column.id} align={column.align} className={classes.actionCell}>
                            <AddUpdate label="Edit" type={type} data={datum} action={update} page={page}/>
                            <div style={{width: 4}}></div>
                            <Button variant="contained" color="secondary" onClick={()=> props.del(datum.id)}>Del</Button>
                        </TableCell> : 
                        column.id === "image" ?
                        <TableCell key={column.id} align={column.align}>
                            <Avatar alt={value} src={value} /> 
                        </TableCell> :
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    })}
                    </TableRow>
                );
            })}
            <TableRow><TableCell>
                <AddUpdate label="Add" type={type} action={add}/>
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