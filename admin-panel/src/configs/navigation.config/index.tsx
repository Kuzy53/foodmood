import type {NavigationTree} from '@/@types/navigation';
import {IconDashboard, IconUser, IconBuildings, IconShoppingCart} from '@tabler/icons-react';

const navigationConfig: NavigationTree[] = [
  {
    key: 'statistics',
    path: '/statistics',
    title: 'Statistics',
    translateKey: '',
    icon: IconDashboard,
    authority: [],
    subMenu: []
  },
  {
    key: 'restaurant',
    path: '/restaurant',
    title: 'Restaurant',
    translateKey: '',
    icon: IconBuildings,
    authority: [],
    subMenu: []
  },
  {
    key: 'users',
    path: '/users',
    title: 'Users',
    translateKey: '',
    icon: IconUser,
    authority: [],
    subMenu: []
  },
  {
    key: 'menu',
    path: '/menu',
    title: 'Menu',
    translateKey: '',
    icon: IconShoppingCart,
    authority: [],
    subMenu: []
  },
];

export default navigationConfig;
