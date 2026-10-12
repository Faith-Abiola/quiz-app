function QuestionCard({ number, question, options, correctIndex, chosen, onPick }) {
  return (
    <>
      <div className="question-card">
        <h4>Question {number}</h4>
        <p>{question}</p>
      </div>

      {options.map((opt, i) => {
        let status = "";
        if (chosen !== null) {
          if (i === correctIndex) status = "correct";
          else if (i === chosen) status = "wrong";
        }
        return (
          <button
            key={i}
            className={`option ${status}`}
            onClick={() => onPick(i)}
          >
            {opt}
          </button>
        );
      })}
    </>
  );
}

export default QuestionCard;