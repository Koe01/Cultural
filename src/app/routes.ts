import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import StoryDetail from './pages/StoryDetail';
import Explore from './pages/Explore';
import Proverbs from './pages/Proverbs';
import Submit from './pages/Submit';
import Search from './pages/Search';
import Library from './pages/Library';
import More from './pages/More';
import IdiomDetail from './pages/IdiomDetail';
import FolkPoemDetail from './pages/FolkPoemDetail';
import FolkSongDetail from './pages/FolkSongDetail';
import LullabyDetail from './pages/LullabyDetail';
import FolkBeliefDetail from './pages/FolkBeliefDetail';

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
  {
    path: '/search',
    Component: Search,
  },
  {
    path: '/library',
    Component: Library,
  },
  {
    path: '/more',
    Component: More,
  },
  {
    path: '/idiom/:id',
    Component: IdiomDetail,
  },
  {
    path: '/folk-poem/:id',
    Component: FolkPoemDetail,
  },
  {
    path: '/folk-song/:id',
    Component: FolkSongDetail,
  },
  {
    path: '/lullaby/:id',
    Component: LullabyDetail,
  },
  {
    path: '/folk-belief/:id',
    Component: FolkBeliefDetail,
  },
]);
