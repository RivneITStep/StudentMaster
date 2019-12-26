import * as fromHomeworks from './homeworks.reducer';
import * as fromLoader from './loader.reducer';
import * as fromNews from './news.reducer';
import * as fromMarks from './marks.reducer';
import * as fromTeacher from './teacher.reducer';
import * as fromAuth from './auth.reducer';

export const reducers = {
  homeworks: fromHomeworks.homeworksReducer,
  loader: fromLoader.loaderReducer,
  news: fromNews.newsReducer,
  marks: fromMarks.marksReducer,
  teacher: fromTeacher.teacherReducer,
  auth: fromAuth.authReducer,
};
