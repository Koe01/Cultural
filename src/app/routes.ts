import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import StoryDetail from './pages/StoryDetail';
import Explore from './pages/Explore';
import Proverbs from './pages/Proverbs';
import Submit from './pages/Submit';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/story/:id',
    Component: StoryDetail,
  },
  {
    path: '/explore',
    Component: Explore,
  },
  {
    path: '/proverbs',
    Component: Proverbs,
  },
  {
    path: '/submit',
    Component: Submit,
  },
]);
