import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });
  
function createData(product, portion, price) {
    return { product, portion, price };
}

export default function ResponseTable({searchResults}) {
  const classes = useStyles();

  const rows = searchResults.map(product => 
    createData(product.pname, product.sizeUnit, product.price)
  );

  console.log(searchResults)
  debugger

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Portion</TableCell>
            <TableCell align="right">price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map(product => (
            <TableRow key={product.productId}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.portion}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
            </TableRow>            
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}