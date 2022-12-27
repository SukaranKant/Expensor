import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";

const formatDate = date => {
    return dayjs(date).format("DD/MM/YYYY");
}

let transactions = [
    { amount: 1000, description: "some description", date : Date.now()},
    { amount: 1000, description: "some description", date : Date.now()},
    { amount: 1000, description: "some description", date : Date.now()},
    { amount: 1000, description: "some description", date : Date.now()},
    { amount: 1000, description: "some description", date : Date.now()},
];

export default function TransactionsList() {

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 10 }}>
        <Typography variant="h6" sx={{ marginLeft: 2 }}>
          List of Transactions
        </Typography>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {transaction.amount}
                </TableCell>
                <TableCell align="center">{transaction.description}</TableCell>
                <TableCell align="center">{formatDate(transaction.date)}</TableCell>
                <TableCell align="center">

                  <IconButton component="label">
                    <EditIcon color="success" />
                  </IconButton>

                  <IconButton
                    component="label"
                  >
                    <DeleteIcon sx={{ color: red[500] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
