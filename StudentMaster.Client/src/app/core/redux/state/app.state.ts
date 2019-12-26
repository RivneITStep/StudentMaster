import { HomeworksSate } from './reducers-state/homeworks.state';
import { LoaderState } from './reducers-state/loader.state';
import { NewsState } from './reducers-state/news.state';
import { MarksState } from './reducers-state/marks.state';
import { TeacherState } from './reducers-state/teacher.state';
import { AuthState } from './reducers-state/auth.state';
import { AccountState } from '@core/redux/state/reducers-state/account.state';

export interface IAppState {
  homeworks: HomeworksSate;
  loader: LoaderState;
  news: NewsState;
  teacher: TeacherState;
  marks: MarksState;
  auth: AuthState;
  account: AccountState;
}
