import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  public currentCardId = 0;
  public uncovered = false;
  public flashcards ;
  public addingCard = false;
  public randomizedOrder = true;

  constructor() { }

  ngOnInit() {
    this.flashcards = this.data;
    if (this.randomizedOrder) {
      this.flashcards.sort(() => Math.random() - 0.5);
    }
  }

  public toogle(): void {
    this.uncovered = !this.uncovered;
  }

  public nextCard(): void {
    this.uncovered = false;
    this.currentCardId++;
  }

  public previousCard(): void {
    this.uncovered = false;
    this.currentCardId--;
  }

  public displayAddingCardForm() {
    this.addingCard = true;
  }

  data = [
    {
      "front": "Adam",
      "back": "Korzeniak"
    },
    {
      "front": "question",
      "back": "answer"
    },
    {
      "front": "XXXXXX",
      "back": "YYYYYYYYYY"
    },
    {
      "front": "hehehehe",
      "back": "dupadupadupas"
    }
  ]
}
