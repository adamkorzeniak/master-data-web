import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'md-star',
  styleUrls: ['./star.component.css'],
  templateUrl: './star.component.html'
})

export class StarComponent implements OnInit {
  protected stars: boolean[] = [];
  @Input() protected rating: number;
  @Input() private maxRating: number;

  public ngOnInit(): void {
    for (let i = 0; i < this.maxRating; i++) {
      this.stars[i] = (this.rating > i);
    }
  }

}
