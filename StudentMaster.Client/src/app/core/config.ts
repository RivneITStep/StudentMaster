import {Server} from './models/server';


// servers

export const Servers: Server[] = [
  {name: 'LATEST', url: 'http://studentmaster.azurewebsites.net', id: 1, status: 'Online'},
  {name: 'LOCALHOST', url: 'https://localhost:44380', id: 2, status: 'Online'},
  {name: 'NEXT', url: 'http://next-studentmaster.azurewebsites.net', id: 3, status: 'Offline'},
];

// API
export let API = Servers[0].url;
// export const API = 'https://studentmastertest.azurewebsites.net';
// export const API = '/';
export const IMG_API = API + '/Images/';

// USER ROLES

export const userRole = 'User';
export const adminRole = 'Admin';
export const teacherRole = 'Teacher';
export const superAdminRole = 'SuperAdmin';
export const supportRole = 'Support';

// LOCAL STORE

export const JWT_TOKEN = 'TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const THEME = 'THEME';
export const CURRENT_USER = 'CURRENT_USER';
export const TOKEN_VALID_TO = 'TOKEN_VALID_TO';
export const SELECTED_SERVER = 'SERVER';

// Notify options

export const NOTIFY_OPTIONS = {
  timeOut: 5000,
  showProgressBar: true,
  pauseOnHover: true,
  clickToClose: true,
  animate: 'fromRight',
  position: ['top', 'right'],
};

export const MAT_NOTIFY_OPTIONS = {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
};

export function changeAPI(url: string) {
  console.log(url);
  API = url;
  localStorage.setItem(SELECTED_SERVER, url);
}
// // Perpmissions SignaLR

// export const ALLOW_ALL = '*';

// export const ALLOW_SEND_MESSAGE = 'chat.sendmessage';
// export const ALLOW_RECIVE_MESSAGE = 'chat.recivemessage';

// export const ALLOW_CREATE_TICKET = 'support.createticket';
// export const ALLOW_CHANGE_TICKET = 'support.changeticket';
// export const ALLOW_CLOSE_TICKET = 'support.closeticket';

// export const ALLOW_CHANGE_STATUS = 'profile.status';

// // APP SETTINGS

// export const DEFAULT_THEME = 'DARK';
// export const COUNT_MARKS = 64;
