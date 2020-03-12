import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowNewComponent } from './show-new/show-new.component';
import { NewsModel } from '@core/models/news-model';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';
import { GetNews } from '@core/redux/actions/news.actions';
import { AdminService } from '@core/services/admin.service';
import { AuthenticationService, adminRole } from '@core';
import { AddNewComponent } from '../add-new/add-new.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: NewsModel[] = [];
  isAdmin = false;
  constructor(private store: Store<IAppState>, public dialog: MatDialog, private adminService: AdminService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.isAdmin = this.authService.HasRole(adminRole);
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

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(new GetNews());
    });
  }
  addNew() {
    const dialogRef = this.dialog.open(AddNewComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(new GetNews());
    });
  }
}
