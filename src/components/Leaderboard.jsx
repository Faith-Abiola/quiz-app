function Leaderboard({ list }) {
  if (list.length === 0) return null;
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="board">
      <h3>🏆 Leaderboard</h3>
      {list.map((s, i) => (
        <div className="board-row" key={i}>
          <span>
            {medals[i] || `#${i + 1}`} {s.name}
          </span>
          <span>
            {s.score}/{s.total} ({s.percent}%)
          </span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;