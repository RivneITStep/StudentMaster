import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news/news.component';
import { ShowNewComponent } from './components/news/show-new/show-new.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [NewsComponent, ShowNewComponent],
  imports: [CommonModule, NewsRoutingModule, SharedModule, NgxSpinnerModule],
  entryComponents: [ShowNewComponent],
})
export class NewsModule {}
