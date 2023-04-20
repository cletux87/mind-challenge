import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Skeleton,
} from '@mui/material';
import { TableColumnProps } from './types';

const getRowValues = (headers: string[]) =>
  headers.map((value, index) => (
    <TableCell key={`${value}-${index}`}>
      <Skeleton height={30} width={80} />
    </TableCell>
  ));

const getRow = (headers: string[], index?: number) => {
  return (
    <TableRow key={index && `${headers[index]}-${index}-row`}>
      {getRowValues(headers)}
    </TableRow>
  );
};

const getTableBody = (amountRecords: number, headers: string[]) =>
  Array.from({ length: amountRecords }, (value, index) =>
    getRow(headers, index)
  );

const ReportDataLoading = ({
  columns,
  amountOfRecords,
}: {
  columns: TableColumnProps[];
  amountOfRecords: number;
}) => {
  const headers = columns.reduce<string[]>((acc, newVal) => {
    return newVal['isSubColumn'] ? acc : acc.concat([newVal.accessor]);
  }, []);

  const tableRows = getRow(headers);
  const tableBody = getTableBody(amountOfRecords, headers);
  return (
    <Table data-testid="skeleton-table-loading">
      <TableHead>{tableRows}</TableHead>
      <TableBody>{tableBody}</TableBody>
    </Table>
  );
};

export default ReportDataLoading;
