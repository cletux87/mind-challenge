import React, { FC, useMemo } from 'react';
import { useTable, useExpanded, useSortBy } from 'react-table';

import MaUTable from '@mui/material/Table';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { ChevronRight, ChevronLeft, ExpandMore } from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { withStyles } from '@mui/styles';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Types

import { ColumnInstance, Row } from 'react-table';
import { TableColumnProps, TableDataProps } from './types';

export const blue_link = '#0000EE';

export interface DataTableExpandableProps {
  columns: TableColumnProps[];
  data: TableDataProps[];
  hiddenColumns?: string[];
  autoExpandRows?: boolean;
  onCellClick?: any;
}

interface DataColumnInstance extends TableColumnProps, ColumnInstance {
  isKeyColumn?: boolean;
  isSubColumn?: boolean;
  isCollapsed?: boolean;
  toggleSubcolumns?: () => void;
}

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Styles

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: '#5A72F614',
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    '&.isSubColumn': {
      backgroundColor: 'hsla(200,44%,66%,0.1)',
    },
    '&.isSubRow': {
      backgroundColor: 'hsla(200,44%,66%,0.1)',
    },
    '&.isSubRow.isKeyColumn': {
      paddingLeft: '2rem',
    },
    '&.isTotalRow>*': {
      fontWeight: 'bolder',
    },
    '&.isLink': {
      color: blue_link,
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
}))(TableCell);

const StyledTableHead = withStyles((theme) => ({
  root: {
    // borderBottom: '2px solid red',
  },
}))(TableHead);

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Renders

const renderColumnTitle = (column: DataColumnInstance) => {
  const classes = [...(column.isSubColumn ? ['isSubColumn'] : [])].join(' ');
  if (column['isFeature'])
    return <TableCell padding="checkbox" {...column['getHeaderProps']()} />;
  return (
    <StyledTableCell
      {...column['getHeaderProps'](column['getSortByToggleProps']())}
      align={column['textAlign'] || 'right'}
      className={classes}
    >
      <TableSortLabel
        active={column['isSorted']}
        direction={column['isSortedDesc'] ? 'asc' : 'desc'}
        title=""
      >
        <Tooltip placement="top" title={column.textTooltip || ''} arrow>
          <Box
            component="span"
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {column.chartColor && (
              <AssessmentIcon style={{ color: column.chartColor }} />
            )}
            <Typography noWrap variant="subtitle2">
              {column['render']('Header')}
            </Typography>
          </Box>
        </Tooltip>
      </TableSortLabel>
    </StyledTableCell>
  );
};

const renderColumnToggler = (column: DataColumnInstance) => {
  return (
    <TableCell {...column['getHeaderProps']()} align="left" padding="checkbox">
      <IconButton size="small" onClick={column.toggleSubcolumns}>
        {column.isCollapsed ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </TableCell>
  );
};

const renderHeadCell = (column: DataColumnInstance, colIndex: number) => {
  return (
    <React.Fragment key={colIndex}>
      {column['toggleColumns']
        ? renderColumnToggler(column)
        : renderColumnTitle(column)}
    </React.Fragment>
  );
};

const renderHeadRow = (row: any) => (
  <TableRow {...row.getHeaderGroupProps()}>
    {row.headers.map(renderHeadCell)}
  </TableRow>
);

const renderBodyCell = (cell: any, columnIndex: number, onCellClick?: any) => {
  const isTotal = (row: any) => !!row.isTotal;
  const classes = [
    ...(cell.column.isSubColumn ? ['isSubColumn'] : []),
    ...(cell.column.isKeyColumn ? ['isKeyColumn'] : []),
    ...(cell.row.depth > 0 ? ['isSubRow'] : []),
    ...(isTotal(cell.row.original) ? ['isTotalRow'] : []),
    ...(cell.column.isLink && !isTotal(cell.row.original) ? ['isLink'] : []),
  ].join(' ');
  return (
    <StyledTableCell
      key={`${cell.column.id}_${cell.row.id}`}
      {...cell.getCellProps()}
      align={cell.column.textAlign || 'right'}
      padding={cell.column.isFeature ? 'none' : 'normal'}
      className={classes}
      onClick={() => {
        if (
          onCellClick &&
          cell.column.isClickable &&
          !isTotal(cell.row.original)
        ) {
          onCellClick(cell);
        }
      }}
    >
      {cell.column.customCell ? (
        cell.column.customCell(cell.value)
      ) : (
        <Typography noWrap variant="body2">
          {cell.render('Cell')}
        </Typography>
      )}
    </StyledTableCell>
  );
};

const renderBodyRow = (row: Row, onCellClick?: any) => {
  return (
    <StyledTableRow {...row.getRowProps()}>
      {row.cells.map((cell: any, columnIndex: number) => {
        return renderBodyCell(cell, columnIndex, onCellClick);
      })}
    </StyledTableRow>
  );
};

const renderRowExpandButton = (row: any) => {
  const Icon = row.isExpanded ? ExpandMore : ChevronRight;
  return (
    row.canExpand && (
      <IconButton size="small" {...row.getToggleRowExpandedProps()}>
        <Icon />
      </IconButton>
    )
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Content modifyers

const getRowTogglerColumn = (): TableColumnProps => ({
  accessor: 'SubRowsToggler',
  Header: () => null,
  SubCell: () => null,
  Cell: ({ row }: any) => renderRowExpandButton(row),
  isSubRowsToggler: true,
  isFeature: true,
  disableSortBy: true,
});

const prepareColumns = (columns: TableColumnProps[]) => {
  const dataSourceColumns: TableColumnProps[] = [];
  const dataSourceUpdate1 = (c: TableColumnProps) => {
    dataSourceColumns.push({
      Header: c.text || '',
      ...c,
    });
  };
  [getRowTogglerColumn(), ...columns].map(dataSourceUpdate1);
  return dataSourceColumns;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Component

const DataTableExpandable: FC<DataTableExpandableProps> = ({
  onCellClick,
  columns,
  data,
  hiddenColumns,
  autoExpandRows,
}) => {
  const tableContent = useMemo(() => {
    return {
      columns: [...prepareColumns(columns)],
      data: [...data],
      initialState: {
        hiddenColumns: hiddenColumns || [],
        expanded: data.reduce(
          (o: any, r: any, i: number) => ({ ...o, [`${i}`]: autoExpandRows }),
          {}
        ),
      },
    };
  }, [columns, data, hiddenColumns, autoExpandRows]);

  const tableInstance = useTable(tableContent, useSortBy, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = tableInstance;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Additional Logic

  const headerProcessor = (headerGroup: any, headerGroupIndex: number) => {
    const toggleSubcolumns = (column: any) => () => {
      const subColumnsIds = column.toggleColumns || [];
      const forSubColumns = (column: any) =>
        subColumnsIds.indexOf(column.id) >= 0;
      const subColumnToggle = (column: any) => column.toggleHidden();
      allColumns.filter(forSubColumns).map(subColumnToggle);
      column.isCollapsed = !column.isCollapsed;
    };
    headerGroup.headers.map((column: any, i: number) => {
      headerGroup.headers[i].toggleSubcolumns = toggleSubcolumns(column);
      return true;
    });
    return (
      <React.Fragment key={headerGroupIndex}>
        {renderHeadRow(headerGroup)}
      </React.Fragment>
    );
  };

  const rowProcessor = (row: Row, rowIndex: number) => {
    prepareRow(row);
    return (
      <React.Fragment key={rowIndex}>
        {renderBodyRow(row, onCellClick)}
      </React.Fragment>
    );
  };

  const displayRows = (rows: Row[]) => {
    const isTotal = (row: Row) =>
      Object.prototype.hasOwnProperty.call(row.original, 'isTotal');
    const noTotal = (row: Row) =>
      !Object.prototype.hasOwnProperty.call(row.original, 'isTotal');
    return (
      <>
        {rows.filter(isTotal).map(rowProcessor)}
        {rows.filter(noTotal).map(rowProcessor)}
      </>
    );
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Render Table

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'auto' }}>
      <MaUTable {...getTableProps()}>
        <StyledTableHead>{headerGroups.map(headerProcessor)}</StyledTableHead>
        <TableBody {...getTableBodyProps()}>{displayRows(rows)}</TableBody>
      </MaUTable>
    </Box>
  );
};

export default DataTableExpandable;
