import { useState } from "react";
import Leaderboard from "./Leaderboard";
import { getScores } from "../leaderboard";

function Start({ onStart, loading, error }) {
  const [name, setName] = useState(localStorage.getItem("quiz-name") || "");
  const [amount, setAmount] = useState(8);
  const [minutes, setMinutes] = useState(5);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const board = getScores();

  return (
    <div className="quiz">
      <div className="result-card setup">
        <div className="big-emoji">🧠</div>
        <h2>Brain Boost</h2>
        <p>Set up your quiz</p>

        <label>
          Your name
          <input
            className="name-input"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Number of questions
          <select value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
            {[5, 8, 10, 15, 20].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <label>
          Time limit
          <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
            <option value={0}>No timer</option>
            <option value={2}>2 minutes</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
          </select>
        </label>

        <label>
          Difficulty
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </label>

        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Any</option>
            <option value="Programming">Programming</option>
            <option value="DevOps">DevOps</option>
          </select>
        </label>

        <button
          className="restart"
          disabled={loading}
          onClick={() => {
            const player = name.trim() || "Player";
            localStorage.setItem("quiz-name", player);
            onStart({ name: player, amount, minutes, difficulty, category });
          }}
        >
          {loading ? "Loading..." : "Start quiz 🚀"}
        </button>

        {error && <p className="error">{error}</p>}

        <Leaderboard list={board} />
      </div>
    </div>
  );
}

export default Start;