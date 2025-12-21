import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

const QUESTION_TIME = 60;

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const subject = (searchParams.get('subject') || 'general').toLowerCase();
  const difficulty = searchParams.get('difficulty') || 'medium';

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedOption, setSelectedOption] = useState(null);
  const [points, setPoints] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [feedback, setFeedback] = useState(null); // true/false for correct/wrong

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const res = await fetch('https://quiz-backend-mwqs.onrender.com/api/v1/users/getQuizQuestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ subject, difficulty }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to load quiz');

        // take only first 10 questions
        setQuestions((data.data.questions || []).slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject, difficulty]);

  const currentQuestion = questions[currentIndex];

  /* ================= TIMER ================= */
  useEffect(() => {
    if (quizOver || loading) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizOver, loading]);

  /* ================= CHECK OPTION ================= */
  const handleOptionClick = async (idx) => {
    if (selectedOption !== null) return; // prevent multiple clicks

    setSelectedOption(idx);

    try {
      const res = await fetch('https://quiz-backend-mwqs.onrender.com/api/v1/users/checkOptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          questionId: currentQuestion.questionsId,
          selectedOption: currentQuestion.options[idx],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Check failed');

      setFeedback(data.data.isCorrect);

      if (data.data.isCorrect) {
        let score = 0;
        if (difficulty === 'easy' || 'low') score = 5;
        else if (difficulty === 'medium') score = 10;
        else if (difficulty === 'hard') score = 15;
        setPoints(p => p + score);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /* ================= NEXT ================= */
  const handleNext = async () => {
    setSelectedOption(null);
    setFeedback(null);
    setTimeLeft(QUESTION_TIME);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      // submit quiz
      try {
        await fetch('https://quiz-backend-mwqs.onrender.com/api/v1/users/submitQuiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            subject,
            userscore: points,
            attempted: questions.length,
          }),
        });
      } catch (err) {
        console.error(err.message);
      }

      setQuizOver(true);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <div className="text-center space-y-3">
          <div className="animate-spin h-8 w-8 border-2 border-sky-400 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm tracking-wide">
            Loading {subject} questions ({difficulty})…
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        {error}
      </div>
    );

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(
    timeLeft % 60
  ).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{subject}</h1>
            <p className="text-sm text-slate-400">
              Difficulty: <span className="text-sky-300">{difficulty}</span> •{' '}
              {currentIndex + 1}/{questions.length}
            </p>
          </div>

          <div className="flex gap-4">
            <div>
              <p className="text-xs text-slate-400">Time</p>
              <p className="text-lg text-sky-300">{formattedTime}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Points</p>
              <p className="text-lg text-emerald-300">{points}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">
          {quizOver ? (
            <div className="text-center space-y-3">
              <h2 className="text-2xl">Quiz finished</h2>
              <p>
                Score: <span className="text-emerald-300">{points}</span>
              </p>
              <button
                onClick={() => navigate('/home')}
                className="px-6 py-2 rounded-full bg-sky-400 text-slate-950"
              >
                Go Home
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">
                {currentQuestion.questionText}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  let bg = 'bg-slate-900 border-slate-700';
                  if (selectedOption === idx) {
                    if (feedback === null) bg = 'bg-slate-800 border-sky-400';
                    else bg = feedback ? 'bg-green-600 border-green-400' : 'bg-red-600 border-red-400';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl border ${bg}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between mt-5">
                <button
                  onClick={() => navigate('/home')}
                  className="px-4 py-2 border border-slate-700 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="px-6 py-2 bg-sky-400 text-slate-950 rounded-full disabled:opacity-50"
                >
                  {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
