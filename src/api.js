export async function fetchQuestions({ amount, category, difficulty }) {
  const params = new URLSearchParams({
    limit: amount,
    random: "true",
    type: "MULTIPLE_CHOICE",
  });
  if (category) params.set("category", category);
  if (difficulty) params.set("difficulty", difficulty);

  const res = await fetch(`https://quizapi.io/api/v1/questions?${params}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_QUIZ_API_KEY}` },
  });

  if (!res.ok) throw new Error("Failed to fetch questions");

  const json = await res.json();
  if (!json.data.length) throw new Error("No questions found. Try other settings.");

  return json.data.map((q) => ({
    id: q.id,
    question: q.text,
    options: q.answers.map((a) => a.text),
    correctIndex: q.answers.findIndex((a) => a.isCorrect),
    explanation: q.explanation || "No explanation for this one.",
  }));
}