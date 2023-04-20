import { ReactNode } from 'react';

export interface TableColumnProps {
  [key: string]: any;
  accessor: string;
  text?: string | any;
  textTooltip?: string | any;
  chartColor?: string;
  dataFormat?: 'number' | 'decimal' | 'percent' | string;
  subColumns?: TableColumnProps[] | [];
}

export interface TableDataProps {
  [key: string]: any;
}

export interface TableComponentProps {
  onCellClick?: any;
  children?: ReactNode;
  columns: TableColumnProps[] | [];
  data: TableDataProps[] | [];
  dataTotal?: TableDataProps;
  dataChildKey?: string;
  autoExpandRows?: boolean;
  loading?: boolean;
}
