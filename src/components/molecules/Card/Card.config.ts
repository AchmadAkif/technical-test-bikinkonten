export interface CardProps {
  imgUrl: string;
  title: string;
  popularity: number;
  year: number;
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}
