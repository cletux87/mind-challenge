import React from 'react';
import { DataTableExpandable, ReportDataLoading, ReportDataEmpty } from './';
import { valueFormat } from './valueFormat';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Models

import { TableColumnProps, TableDataProps, TableComponentProps } from './types';

type TableColsList = TableColumnProps[] | [];
type TableRowsList = TableDataProps[] | [];

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Features

// Mark first column as isKeyColumn

const featureKeyColumn = (cols: TableColsList) => {
  return [...cols].map((col: TableColumnProps, i: number) =>
    i
      ? col
      : {
          ...col,
          isKeyColumn: true,
          textAlign: 'left',
        }
  );
};

// Create columns from subColumns:[]

const featureSubColumns = (cols: TableColsList) => {
  const reduceByAccessor = (a: any[], b: { accessor: string }) => [
    ...a,
    b.accessor,
  ];
  const getColTogglerColumn = (c: TableColumnProps) => {
    const { accessor, subColumns, ...cc } = c;
    return {
      ...cc,
      accessor: `${accessor}SubColumnsToggler`,
      isSubColumn: false,
      isSubColumnToggler: true,
      isFeature: true,
      disableSortBy: true,
      toggleColumns: (subColumns || []).reduce(reduceByAccessor, []),
      Header: () => null,
      Cell: () => null,
    };
  };
  const subColumnReducer = (previous: any[], c: any) => {
    const { subColumns, ...cc } = c;
    const hasSubColumns = subColumns && subColumns.length;
    const markSubColumn = (o: any) => ({ ...o, isSubColumn: true });
    return [
      ...previous,
      cc,
      ...(hasSubColumns ? [getColTogglerColumn(c)] : []),
      ...(hasSubColumns ? subColumns.map(markSubColumn) : []),
    ];
  };
  return [...cols].reduce(subColumnReducer, []);
};

// Array of hidden accessors

const featureAutohideSubColumns = (cols: TableColsList) => {
  return [...cols].reduce(
    (previous: any[], c: any) => [...previous, ...(c.toggleColumns || [])],
    []
  );
};

// Add total row

const featureTotalRow = (rows: TableRowsList, dataTotal?: TableDataProps) => {
  return [...(dataTotal ? [{ ...dataTotal, isTotal: true }] : []), ...rows];
};

// Create subRows array from 'dataChildKey'

const featureSubRows = (rows: TableRowsList, key?: string) => {
  const expandSubRows = (row: TableDataProps) => {
    if (!key || !row[key] || !row[key].length) return row;
    const { [key]: subRows, ...r } = row;
    return { ...r, subRows };
  };
  return [...rows].map(expandSubRows);
};

// Create first column accessor for subRows

const featureSubRowMultiAccessor = (
  rows: TableRowsList,
  cols: TableColsList
) => {
  return [...rows].map((row: TableDataProps) => {
    if (!cols.length || !row['subRows'] || !row['subRows'].length) return row;
    const accessor = cols[0].accessor;
    const accessors = cols[0]['accessors'] || [];
    if (!accessor || !accessors.length) return row;
    const getValue = (item: any, keys: []) =>
      [...keys].reduce((val: any, key: any) => val || item[key] || '', '');
    return {
      ...row,
      subRows: row['subRows'].map((subrow: TableDataProps) => ({
        ...subrow,
        [accessor]: getValue(subrow, accessors),
        propertyName: row['property'],
      })),
    };
  });
};

// Update text values

const featureDataFormat = (rows: TableRowsList, cols: TableColsList) => {
  const updateRowByCol = (row: TableDataProps, col: TableColumnProps) => {
    const formatRequired = !!col.dataFormat && row[col.accessor] !== undefined;
    const key = formatRequired && col.accessor;
    return {
      ...row,
      ...(key ? { [key]: valueFormat(row[key], col.dataFormat) } : {}),
    };
  };
  const updateRows = (row: TableDataProps): TableDataProps => ({
    ...[...cols].reduce(updateRowByCol, row),
    ...(row['subRows'] ? { subRows: row['subRows'].map(updateRows, []) } : {}),
  });
  return [...rows].map(updateRows);
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Component Header

const ReportDataTable: React.FC<TableComponentProps> = ({
  onCellClick,
  columns,
  data,
  dataTotal,
  dataChildKey,
  autoExpandRows,
  loading,
  children,
}) => {
  const [tableCols, setTableCols] = React.useState<TableColsList>([]);
  const [tableRows, setTableRows] = React.useState<TableRowsList>([]);
  const [tableHiddenCols, setTableHiddenCols] = React.useState<string[]>([]);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Component Body

  React.useEffect(() => {
    if (loading) {
      return;
    }
    let cols = columns;
    let rows = data;
    cols = featureKeyColumn(cols);
    cols = featureSubColumns(cols);
    rows = featureTotalRow(rows, dataTotal);
    rows = featureSubRows(rows, dataChildKey);
    rows = featureSubRowMultiAccessor(rows, cols);
    rows = featureDataFormat(rows, cols);
    setTableCols(cols);
    setTableRows(rows);
    setTableHiddenCols(featureAutohideSubColumns(cols));
  }, [columns, data, dataTotal, dataChildKey, loading]);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Component Render

  return (
    <>
      {!loading && tableRows.length > 0 && (
        <DataTableExpandable
          onCellClick={onCellClick}
          columns={tableCols}
          data={tableRows}
          hiddenColumns={tableHiddenCols}
          autoExpandRows={autoExpandRows}
        />
      )}

      {loading && <ReportDataLoading columns={columns} amountOfRecords={10} />}

      {!loading && !tableRows.length && <ReportDataEmpty />}
    </>
  );
};

export default ReportDataTable;
