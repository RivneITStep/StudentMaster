import { userRole, teacherRole, adminRole } from '@core/config';
import { Menu } from './services/menu.service';

export const Routes: Menu[] = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard',
    role: userRole,
  },
  {
    state: 'teacher',
    name: 'Teacher',
    type: 'sub',
    icon: 'dashboard',
    role: teacherRole,
    children: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
      },
      {
        state: 'Homeworks',
        name: 'Homeworks',
        type: 'link',
      },
    ],
  },
  {
    state: 'admin',
    name: 'Admin',
    type: 'sub',
    icon: 'dashboard',
    role: adminRole,
    children: [
      {
        state: 'classes',
        name: 'Classes',
        type: 'link',
      },
      {
        state: 'users',
        name: 'Users',
        type: 'link',
      },
    ],
  },
  {
    state: 'progress',
    name: 'Progress',
    type: 'link',
    icon: 'bookmark',
    role: userRole,
  },
  {
    state: 'homeworks',
    name: 'Home Works',
    type: 'link',
    icon: 'home_work',
    role: userRole,
  },
  {
    state: 'news',
    name: 'News',
    type: 'link',
    icon: 'new_releases',
  },
  {
    state: 'schedule',
    name: 'Schedule',
    type: 'link',
    icon: 'calendar_today',
  },
  {
    state: 'sessions',
    name: 'Sessions',
    type: 'sub',
    icon: 'question_answer',
    children: [
      {
        state: '403',
        name: '403',
        type: 'link',
      },
      {
        state: '404',
        name: '404',
        type: 'link',
      },
      {
        state: '500',
        name: '500',
        type: 'link',
      },
    ],
  },
];
