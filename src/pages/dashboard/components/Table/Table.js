import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, LOCATION, VIEWS, SALES, CONVERSION, TOTAL}) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{LOCATION}</TableCell>
            <TableCell>{VIEWS}</TableCell>
            <TableCell>{SALES}</TableCell>
            <TableCell>{CONVERSION}</TableCell>
            <TableCell>{TOTAL}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
