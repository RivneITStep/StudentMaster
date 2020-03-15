import { Component, OnInit } from '@angular/core';
import { Homework } from '@core/models/homework';
import { HomeworksService } from '@core/services/homeworks.service';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { GetHomeworks } from '@core/redux/actions/homeworks.actions';
import { IMG_API } from '@core/config';
import { ToolsService } from '@core/services/tools.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.css'],
})
export class HomeworksComponent implements OnInit {
  homeworks: Homework[] = [];
  types: string[] = ['OPEN', 'REVIEW', 'CLOSED'];
  selectedType = 'OPEN';
  fileAPI = IMG_API;
  constructor(private hS: HomeworksService, private store: Store<IAppState>, private tools: ToolsService) {}
  ngOnInit() {
   this.hS.getMyHomeworksRedux().subscribe((x) => {
     this.homeworks = x;
   });
  }
  onChange(event) {
    this.selectedType = this.types[event];
    this.hS.getMyHomeworksRedux().subscribe((x) => {
      this.homeworks = x.filter(x => x.status === this.types[event]);
    });
   }

  remove(id) {
    this.hS.removeMyHomework(id).subscribe(() => {
      this.tools.showNotification('Success');
      this.hS.getMyHomeworksRedux().subscribe((x) => {
        this.homeworks = x.filter(x => x.status === this.selectedType)
      });
    });
  }
  upload(id) {
      const selector = document.getElementById('fileSelector') as HTMLInputElement;
      selector.click();
      selector.onchange = (event: any) => {
        console.log(event.target.files[0].type);
        if (
          !event.target.files[0].type.indexOf('image') ||
          !event.target.files[0].type.indexOf('text/plain')
        ) {
          const formdata = new FormData();
          formdata.append('Id', id);
          formdata.append('file', event.target.files[0]);

          this.hS.doHomeWorkAsync(formdata).subscribe(() => {
            this.tools.showNotification('Success');
            this.hS.getMyHomeworksRedux().subscribe((x) => {
              this.homeworks = x.filter(x => x.status === this.selectedType);
            });
          });
        } else {
          this.tools.showNotification('Please select valid file');
        }
      };
  }
}
