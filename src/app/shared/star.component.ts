import {Component, OnChanges, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'md-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent  implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    onClick() {
        this.ratingClicked.emit('Rating: ' + this.rating);
    }

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
        // this.starWidth = 5;
    }

}