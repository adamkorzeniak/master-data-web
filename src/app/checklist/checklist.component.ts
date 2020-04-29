import { Component, OnInit } from '@angular/core';
import { IChecklistItem } from './model/checklist-item';
import { CheclistService } from './service/checklist-repository.service';

@Component({
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  public checklist: IChecklistItem[];

  constructor( private checklistService: CheclistService) { }

  public ngOnInit() {
    this.checklistService.getChecklist().subscribe(
      response => this.initializeChecklist(response)
    );
  }

  private initializeChecklist(checklist: IChecklistItem[]) {
    for (var i = 0; i < checklist.length; i++) {
      checklist[i].checked = false;
    }
    this.checklist = checklist;
  }

}
