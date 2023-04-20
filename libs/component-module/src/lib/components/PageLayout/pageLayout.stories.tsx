import { TopBarMenuItems } from '../TopBar/TopBar';
import { Box } from '@mui/material';
import { PageLayout as PageLayoutComponent, INavMenu } from './PageLayout';
import { BrowserRouter } from 'react-router-dom';

const items: TopBarMenuItems[] = [
  { name: 'Logout', onClick: () => console.log('OUT') },
];

const navigationItems: INavMenu[] = [
  {
    type: 'home',
    path: '/home',
  },
  {
    type: 'calendar',
    // This is how storybook
    // manage the pathname
    path: '/iframe.html',
  },
];

const Template = () => (
  <Box sx={{ height: '100vh', width: '100vw' }}>
    <BrowserRouter>
      <PageLayoutComponent
        avatarMenuItems={items}
        avatarFirstName="T"
        navigation={navigationItems}
      >
        <div>Hello world</div>
      </PageLayoutComponent>
    </BrowserRouter>
  </Box>
);

export default {
  title: 'PageLayout',
  component: PageLayoutComponent,
  parameters: {
    docs: {
      page: () => ({}),
    },
  },
};

export const PageLayout = Template.bind({});
