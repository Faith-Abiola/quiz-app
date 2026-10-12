function Sidebar({ current, total, answers, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <span>
          Question {current + 1}/{total}
        </span>
        <span>Need Help ?</span>
      </div>

      <div className="grid">
        {answers.map((a, i) => {
          let cls = "circle";
          if (i === current) cls += " current";
          else if (a !== null) cls += " answered";
          return (
            <button
              key={i}
              className={cls}
              onClick={() => onSelect(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;