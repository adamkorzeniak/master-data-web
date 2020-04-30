import { Component, OnInit } from '@angular/core';
import { IChecklistGroup, IChecklistItem } from './model/checklist-item';
import { CheclistService } from './service/checklist-repository.service';

@Component({
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  public checklist: IChecklistGroup[];

  constructor( private checklistService: CheclistService) { }

  public ngOnInit() {
    this.initializeChecklist();
  }

  public initializeChecklist() {
    this.checklistService.getChecklist().subscribe(
      response => this.buildChecklist(response)
    );
  }

  private buildChecklist(checklist: IChecklistGroup[]) {
    this.initializeFalseCheckboxes(checklist)
    this.checklist = checklist;
  }

  private initializeFalseCheckboxes(checklist: IChecklistGroup[]) {
    for (var i = 0; i < checklist.length; i++) {
      var group: IChecklistGroup = checklist[i];
      for (var j = 0; j < group.items.length; j++) {
        var item: IChecklistItem = group.items[j];
        item.checked = false;
      }
    }
  }
}
