
import React from 'react';
import { Link } from 'react-router';

const subjects = [
  { id: 1, name: 'English', desc: 'Grammar, vocabulary, and comprehension.' },
  { id: 2, name: 'Mathematics', desc: 'Numbers, logic, and problem-solving.' },
  { id: 3, name: 'Science', desc: 'Physics, chemistry, and biology basics.' },
  { id: 4, name: 'Entertainment', desc: 'Movies, music, games, and pop culture.' },
  { id: 5, name: 'Programming', desc: 'Code, algorithms, and debugging.' },
  { id: 6, name: 'Computer', desc: 'Hardware, software, and digital skills.' },
  { id: 7, name: 'GK', desc: 'World events, facts, and general knowledge.' },
  { id: 8, name: 'General', desc:'Mixed questions of all quizzes.'}
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
     
      <section className="max-w-6xl mx-auto px-4 md:px-0 pt-10 pb-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400 mb-3">
            Welcome to QuizMaster
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Beat the clock.  
            <span className="text-sky-400"> Own the leaderboard.</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 mb-6">
            Play fast-paced quizzes across multiple subjects with AI-generated questions,
            60-second timers, and smart difficulty levels. Track your performance and
            compete with learners worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#subjects"
              className="px-6 py-2.5 rounded-full border border-sky-400 text-sm md:text-base hover:bg-slate-900 transition"
            >
              Browse Subjects
            </a>
          </div>
        </div>

       
        <div className="flex-1 w-full">
          <div className="rounded-3xl border border-sky-500/40 bg-slate-900/80 p-5 shadow-[0_0_40px_rgba(56,189,248,0.35)]">
            <p className="text-xs text-sky-300 mb-2">Quick Stats </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-slate-950/80 p-3">
                <p className="text-xl font-semibold text-sky-400">10</p>
                <p className="text-[11px] text-slate-400">Questions / round</p>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-3">
                <p className="text-xl font-semibold text-sky-400">60s</p>
                <p className="text-[11px] text-slate-400">Per question</p>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-3">
                <p className="text-xl font-semibold text-sky-400">3</p>
                <p className="text-[11px] text-slate-400">Difficulty levels</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              save your scores and keep climbing the leaderboard.
            </p>
          </div>
        </div>
      </section>

      <section
        id="subjects"
        className="max-w-6xl mx-auto px-4 md:px-0 pb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Subjects</h2>
          <span className="text-xs md:text-sm text-slate-400">
            Choose a subject to start a quiz.
          </span>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <div
              key={s.id}
              className="rounded-3xl bg-slate-900/80 border border-sky-500/20 p-6 md:p-7 shadow-lg hover:-translate-y-1 hover:shadow-sky-500/30 transition flex flex-col justify-between min-h-45"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-sky-300 mb-2">
                  {s.name}
                </h3>
                <p className="text-sm md:text-base text-slate-300">
                  {s.desc}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to={`/popup?subject=${encodeURIComponent(s.name)}`}
                  className="inline-block text-xs md:text-sm px-5 py-2 rounded-full bg-sky-400 text-slate-950 font-semibold hover:bg-sky-300 transition"
                >
                  Start {s.name} Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

     
      <section className="max-w-6xl mx-auto px-4 md:px-0 pb-12">
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Climb the leaderboard
            </h2>
            <p className="text-sm md:text-base text-slate-300">
              Play more quizzes, score higher, and see how you rank against other players.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-400">
              View full rankings and your position.
            </span>
            <Link
              to="/leaderboard"
              className="px-5 py-2 rounded-full bg-sky-400 text-slate-950 text-sm font-semibold hover:bg-sky-300 transition"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
