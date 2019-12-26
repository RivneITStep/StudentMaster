import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShowNewComponent } from './show-new/show-new.component';
import { NewsModel } from '@core/models/news-model';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';
import { GetNews } from '@core/redux/actions/news.actions';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: NewsModel[] = [];
  constructor(private store: Store<IAppState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch(new GetNews());
    this.store.select('news').subscribe(data => {
      this.news = data.news;
    });
  }
  openDialog(id: string): void {
    const New = this.news.find(x => x.id === id);
    const dialogRef = this.dialog.open(ShowNewComponent, {
      width: '60%',
      data: New,
    });

    dialogRef.afterClosed();
  }
}
