import { NextRequest, NextResponse } from 'next/server';
import { normalizeAnime } from '@/lib/anime';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = params.get('q')?.trim() ?? '';
  const limit = Math.min(Math.max(Number(params.get('limit') ?? 12), 1), 24);
  const genre = params.get('genre') ?? '';
  const minScore = Math.max(Number(params.get('minScore') ?? 0), 0);
  const genreMap: Record<string, number> = { action: 1, comedy: 4, mystery: 7, dark: 10, romance: 22, scifi: 24, sports: 30, psychological: 40, isekai: 62 };
  const source = query ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=${limit}&sfw=true&order_by=score&sort=desc` : `https://api.jikan.moe/v4/anime?genres=${genreMap[genre] ?? 1}&limit=${limit}&sfw=true&order_by=score&sort=desc`;
  try {
    const response = await fetch(source, { next: { revalidate: 300 } });
    if (!response.ok) return NextResponse.json({ error: `Research service returned ${response.status}` }, { status: response.status });
    const body = await response.json();
    const data = (body.data ?? []).map(normalizeAnime).filter((item: ReturnType<typeof normalizeAnime>) => !item.score || item.score >= minScore);
    return NextResponse.json({ data, source: 'jikan', retrievedAt: new Date().toISOString() });
  } catch { return NextResponse.json({ error: 'Research service is temporarily unavailable.' }, { status: 502 }); }
}
