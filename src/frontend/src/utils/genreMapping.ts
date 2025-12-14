export const GENRE_IDS: { [key: string]: string } = {
  'acao-e-suspense': '28,53',
  'acao': '28',
  'animacao': '16',
  'comedia': '35',
  'drama': '18',
  'terror': '27',
  'ficcao-cientifica': '878',
  'romance': '10749',
};

export const getGenreIds = (categorySlug: string): string => {
  return GENRE_IDS[categorySlug] || '28';
};
