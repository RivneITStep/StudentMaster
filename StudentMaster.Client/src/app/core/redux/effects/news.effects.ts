import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NEWS_ACTIONS, GetNewsSuccess, GetNewsError } from '../actions/news.actions';
import { NewsModel } from '@core/models/news-model';
import { NewsService } from '@core/services/news.service';

@Injectable()
export class NewsEffects {
  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(NEWS_ACTIONS.GET_NEWS_REQUEST),
    switchMap(() => this.nS.getNews()),
    switchMap((news: NewsModel[]) => of(new GetNewsSuccess(news))),
    catchError(err => of(new GetNewsError(err)))
  );

  constructor(private nS: NewsService, private actions$: Actions) {}
}
