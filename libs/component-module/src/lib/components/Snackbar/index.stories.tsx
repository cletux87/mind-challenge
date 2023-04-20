import SnackGallery from './snackbarGallery';

const Template = () => <SnackGallery />;

export default {
  title: 'Snackbar',
  component: SnackGallery,
  parameters: {
    docs: {
      page: () => ({}),
    },
  },
};

export const SnackbarGallery = Template.bind({});
