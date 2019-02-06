export interface IMovie {
    id: number;
    title: string;
    year: number;
    duration: number;
    watchPriority: number;
    rating?: number;
    genres: any[];
}

export class Movie implements IMovie {
    id: number;
    title: string;
    year: number;
    duration: number;
    watchPriority: number;
    rating?: number;
    genres: any[];

    getSearchText(): string {
        return this.title + ' (' + this.year + ')';
    }
}