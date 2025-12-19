// QuizStartModal.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

const difficulties = [
  { value: 'low', label: 'Low', desc: 'Basics & easy questions.' },
  { value: 'medium', label: 'Medium', desc: 'Balanced, moderate difficulty.' },
  { value: 'hard', label: 'Hard', desc: 'Challenging & tricky questions.' },
];

const Popup = ({ onStartQuiz }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subjectFromParams = searchParams.get('subject') || 'General Quiz';

  const [open, setOpen] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');

  // Close modal and optionally clear query param
  const handleCancel = () => {
    setOpen(false);
    // If you want to go back to home or previous page:
    // navigate(-1);
    navigate('/home')
  };

  const handleStart = () => {
    if (onStartQuiz) {
      onStartQuiz({ subject: subjectFromParams, difficulty });
    }
    // Optionally close modal
    setOpen(false);
    navigate(`/quiz?subject=${subjectFromParams}&difficulty=${difficulty}`)
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4">
        {/* Glow background */}
        <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-sky-500 via-cyan-400 to-fuchsia-500 opacity-50 blur-2xl" />
        <div className="relative rounded-3xl bg-slate-950/95 border border-slate-800 px-6 py-6 md:px-7 md:py-7 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-400 mb-1">
                Start quiz
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                Ready for {subjectFromParams}?
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                You&apos;ll get 10 questions with 60 seconds per question. Choose your difficulty
                before starting.
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="text-slate-500 hover:text-slate-200 text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Alert style box */}
          <div className="mb-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 px-4 py-3 text-xs md:text-sm text-amber-100 flex gap-2 items-start">
            <span className="mt-0.5 text-base">⚠️</span>
            <p>
              Once the quiz starts, the timer will begin immediately. Do not refresh or close the
              tab while attempting the quiz.
            </p>
          </div>

          {/* Difficulty selection */}
          <div className="mb-4">
            <p className="text-xs md:text-sm text-slate-300 mb-2">
              Select difficulty
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {difficulties.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDifficulty(d.value)}
                  className={`rounded-2xl border px-3 py-2 text-left text-xs md:text-sm transition ${
                    difficulty === d.value
                      ? 'border-sky-400 bg-slate-900 text-sky-100 shadow-lg shadow-sky-500/30'
                      : 'border-slate-700 bg-slate-900/70 text-slate-200 hover:border-sky-500/50 hover:bg-slate-900'
                  }`}
                >
                  <p className="font-semibold">{d.label}</p>
                  <p className="text-[11px] text-slate-400">{d.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-around gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="w-full md:w-auto px-4 py-2 rounded-full border border-slate-700 text-xs md:text-sm text-slate-200 hover:bg-slate-900 transition"
            >
              Cancel Quiz
            </button>
            <button
              onClick={handleStart}
              className="w-full md:w-auto px-5 py-2 rounded-full bg-sky-400 text-slate-950 text-xs md:text-sm font-semibold hover:bg-sky-300 transition"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
