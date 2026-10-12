export type Review = {
    name: string;
    company: string;
    quote: string;
    rating: number; // Can also use 1 | 2 | 3 | 4 | 5 if you want strict ratings
    avatar: string;
    index?: number;

};