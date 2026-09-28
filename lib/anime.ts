export type Anime = {
  mal_id: number;
  title: string;
  score: number | null;
  year: number | null;
  episodes: number | null;
  synopsis: string;
  imageUrl: string;
  genres: string[];
};

export function normalizeAnime(item: any): Anime {
  return {
    mal_id: Number(item.mal_id),
    title: String(item.title ?? 'Untitled anime'),
    score: typeof item.score === 'number' ? item.score : null,
    year: item.year ?? item.aired?.prop?.from?.year ?? null,
    episodes: item.episodes ?? null,
    synopsis: String(item.synopsis ?? 'No synopsis available.'),
    imageUrl: String(item.images?.jpg?.large_image_url ?? item.images?.jpg?.image_url ?? ''),
    genres: Array.isArray(item.genres) ? item.genres.map((g: any) => String(g.name)).slice(0, 4) : []
  };
}
