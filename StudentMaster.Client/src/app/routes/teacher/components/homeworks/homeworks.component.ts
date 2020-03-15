import { Component, OnInit } from '@angular/core';
import { TeacherHomework } from '@core/models/teacherhomework.model';
import { HomeworksService } from '@core/services/homeworks.service';
import { ToolsService } from '@core/services/tools.service';
import { IMG_API } from '@core';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.scss']
})
export class HomeworksComponent implements OnInit {

  homeworks: TeacherHomework[] = [];
  file_url = '';
  constructor(private hs: HomeworksService, private tools: ToolsService) { }

  ngOnInit(): void {
    this.file_url = IMG_API;
    this.hs.getTeacherHomeworks().subscribe((data) => {
      this.homeworks = data;
    });
  }
  changeSelection(id, event) {
    this.hs.reviewHomeWork(id, event.value).subscribe(() => {
      this.tools.showNotification('Success');
    });
  }

}
