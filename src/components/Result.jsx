import { useEffect, useRef, useState } from "react";
import Leaderboard from "./Leaderboard";
import { addScore } from "../leaderboard";

const COLORS = ["#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#ff9ff3"];

function Result({ score, total, name, onRestart }) {
  const pct = score / total;
  const percent = Math.round(pct * 100);
  const [board, setBoard] = useState([]);
  const [rank, setRank] = useState(null);
  const saved = useRef(false);

  const [pieces] = useState(() =>
    pct >= 0.7
      ? Array.from({ length: 30 }, (_, i) => ({
          left: Math.random() * 100,
          delay: Math.random() * 1.5,
          color: COLORS[i % COLORS.length],
        }))
      : []
  );

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    const entry = {
      name,
      score,
      total,
      percent,
      date: new Date().toLocaleDateString(),
    };
    const list = addScore(entry);
    setBoard(list);
    setRank(list.indexOf(entry));
  }, [name, score, total, percent]);

  let emoji = "💪";
  let title = "Keep going!";
  let msg = "Practice makes perfect. Try again!";

  if (pct === 1) {
    emoji = "🏆";
    title = "Perfect score!";
    msg = "You're a genius. Flawless run!";
  } else if (pct >= 0.7) {
    emoji = "🔥";
    title = "Great job!";
    msg = "You really know your stuff.";
  } else if (pct >= 0.4) {
    emoji = "😎";
    title = "Not bad!";
    msg = "You're getting there. One more round?";
  }

  return (
    <div className="quiz">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="result-card">
        <div className="big-emoji">{emoji}</div>
        <h2>{title}</h2>

        <div
          className="ring"
          style={{
            background: `conic-gradient(#ff9f43 ${pct * 360}deg, #eceaf5 0deg)`,
          }}
        >
          <div className="ring-inner">
            {score}/{total}
          </div>
        </div>

        <p>{msg}</p>

        {rank !== null && (
          <p className="best">
            {rank === -1
              ? "Didn't make the top 5 this time"
              : `🎉 You're #${rank + 1} on the leaderboard!`}
          </p>
        )}

        <Leaderboard list={board} />

        <button className="restart" onClick={onRestart}>
          Play again 🔁
        </button>
      </div>
    </div>
  );
}

export default Result;