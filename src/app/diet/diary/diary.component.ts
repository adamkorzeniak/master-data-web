import { Component, OnInit } from '@angular/core';
import { IDiaryItem } from '../model/IDiaryItem';
import { DiaryService } from '../service/diary-repository.service';

@Component({
  selector: 'md-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  public diaryItems: IDiaryItem[];
  public diaryDate: Date;
  public calorieGoal: number;
  public calorieSum: number;

  constructor(private diaryService: DiaryService) {  }

  public ngOnInit() {
    this.diaryService.getDiaryItems().subscribe(
      items => this.processItems(items)
    );
    this.calorieGoal = 2300;
    this.calorieSum = 0;
    this.diaryDate = new Date();
  }

  public moveDayBack() {
    this.diaryDate.setDate(this.diaryDate.getDate() - 1);
    this.diaryDate = new Date(this.diaryDate);
    this.diaryService.getDiaryItems().subscribe(
      items => this.diaryItems = items
    );
  }

  public moveDayForward() {
    this.diaryDate.setDate(this.diaryDate.getDate() + 1);
    this.diaryDate = new Date(this.diaryDate);
    this.diaryService.getDiaryItems().subscribe(
      items => this.diaryItems = items
    );
  }

  public deleteItem(index: number) {
    const meal = this.diaryItems[index];
    const message = 'Do you want to remove meal: '
      + meal.productName
      + ' ('
      + meal.amount
      + ' '
      + meal.unitName
      + ')?';
    const toDelete: boolean = confirm(message);
    if (toDelete) {
      this.diaryService.deleteDiaryItem(meal.id).subscribe(
        () => this.diaryItems.splice(index, 1)
      );
    }
  }

  private processItems(items: IDiaryItem[]): void {
    this.diaryItems = items;
    this.calorieSum = items.reduce((a, b) => a + (b.calories || 0), 0);
  }

}
