const KEY = "quiz-leaderboard";

export function getScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function addScore(entry) {
  const list = [...getScores(), entry]
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}