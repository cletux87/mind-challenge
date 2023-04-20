import { TopBar as TopBarComponent, TopBarMenuItems } from './TopBar';
import { Box } from '@mui/material';

const items: TopBarMenuItems[] = [
  { name: 'Logout', onClick: () => console.log('OUT') },
];

const Template = () => (
  <Box sx={{ width: '800px', height: '800px' }}>
    <TopBarComponent userFirstName="T" menuItems={items} />
  </Box>
);

export default {
  title: 'TopBar',
  component: TopBarComponent,
  parameters: {
    docs: {
      page: () => ({}),
    },
  },
};

export const TopBar = Template.bind({});
