import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'md-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnInit {
    @Input() rating: number;
    @Input() maxRating: number;

    stars: boolean[] = [];

    ngOnInit(): void {

        for (let i = 0; i < this.maxRating; i++) {
            this.stars[i] = (this.rating > i);
        }
    }

}
