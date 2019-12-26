import { GetNews, GetNewsSuccess, GetNewsError, NEWS_ACTIONS } from '../actions/news.actions';
import { NewsModel } from '@core/models/news-model';
import { NewsState } from '../state/reducers-state/news.state';

export const initialState: NewsState = {
  news: new Array<NewsModel>(),
};

export function newsReducer(state = initialState, action: GetNews | GetNewsSuccess | GetNewsError) {
  switch (action.type) {
    case NEWS_ACTIONS.GET_NEWS_REQUEST:
      return {
        ...state,
      };
    case NEWS_ACTIONS.GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
      };
    case NEWS_ACTIONS.GET_NEWS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
