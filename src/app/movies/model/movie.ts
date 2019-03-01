import { IGenre } from './genre';

export interface IMovie {
    id: number;
    title: string;
    year: number;
    duration: number;
    description: string;
    watchPriority: number;
    rating: number;
    review: string;
    plotSummary: string;
    reviewDate: string;
    genres: IGenre[];
}
