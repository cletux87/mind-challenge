import { Link } from '@mui/material';
import Table from '.';

const MovkLinkInCell = <Link>Link or anything</Link>;
const mockLongTooltip =
  'Variable width: The Tooltip wraps long text by default to make it readable.';

const dataChildKey = 'childrens';

const columns = [
  {
    text: 'First column',
    accessor: 'name',
    accessors: ['subChildName'],
    textTooltip: mockLongTooltip,
  },
  {
    text: 'Column with sub-columns',
    accessor: 'subParent',
    textTooltip: mockLongTooltip,
    subColumns: [
      {
        text: 'Sub-column A',
        accessor: 'subChildA',
        textTooltip: mockLongTooltip,
      },
      {
        text: 'Sub-column B',
        accessor: 'subChildB',
        textTooltip: mockLongTooltip,
      },
    ],
  },
  {
    text: 'Chart color',
    accessor: 'propertyA',
    chartColor: '#FFBB00',
    textTooltip: '#FFCC00',
  },
  {
    text: 'Format percent',
    accessor: 'propertyB',
    dataFormat: 'percent',
    textTooltip: 'percent',
  },
  {
    text: 'Format decimal',
    accessor: 'propertyC',
    dataFormat: 'decimal',
    textTooltip: 'decimal',
  },
];

const dataTotal = {
  name: 'Total row',
  propertyA: 100,
  propertyB: 1,
  propertyC: 77,
  subParent: 100,
  subChildA: 100,
  subChildB: 100,
  subChildC: 7,
};

const data = [
  {
    name: 'Row with subrows',
    propertyA: 30,
    propertyB: 0.3,
    subParent: 30,
    subChildA: 30,
    subChildB: 30,
    propertyC: 7,
    childrens: [
      {
        subChildName: 'Subrow A',
        propertyA: 20,
        propertyB: 0.2,
        subParent: 20,
        subChildA: 20,
        subChildB: 20,
        propertyC: 7,
      },
      {
        subChildName: 'Subrow B',
        propertyA: 10,
        propertyB: 0.1,
        subParent: 10,
        subChildA: 10,
        subChildB: 10,
        propertyC: 7,
      },
    ],
  },
  {
    name: 'Single row with link',
    propertyA: 70,
    propertyB: 0.7,
    subParent: MovkLinkInCell,
    subChildA: 70,
    subChildB: 70,
    propertyC: 7,
  },
];

const Template = () => (
  <Table
    data={data}
    columns={columns}
    dataChildKey={dataChildKey}
    dataTotal={dataTotal}
  />
);

/*
const Story: Meta<typeof Table> = {
  component: Template,
  title: 'Table',
};

export default Story;
*/

export default {
  title: 'Table',
  component: Table,
  parameters: {
    docs: {
      page: () => ({}),
    },
  },
};

export const TableExample = Template.bind({});
