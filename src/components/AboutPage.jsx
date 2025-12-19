
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400 mb-3">
              About QuizMaster
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight">
              AI-powered quizzes  
              <span className="text-sky-400"> that actually challenge you.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-4">
              QuizMaster is a next‑gen quiz platform where every question is generated on the fly
              using AI. No more repeating the same static question sets—each round feels fresh,
              fast, and unpredictable.
            </p>
            <p className="text-sm md:text-base text-slate-300">
              With 60‑second timers, three difficulty levels, and detailed performance tracking,
              QuizMaster turns casual practice into a serious skill‑building experience.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-sky-500 via-cyan-400 to-fuchsia-500 opacity-50 blur-2xl" />
            <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800/80 p-6 md:p-7 shadow-2xl">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                What makes QuizMaster different?
              </h2>
              <ul className="space-y-2 text-sm md:text-base text-slate-300">
                <li>• AI‑generated questions for every subject and difficulty.</li>
                <li>• 10‑question rounds with strict 60‑second timers.</li>
                <li>• Subject‑wise leaderboards and personal stats.</li>
                <li>• Clean, fast, mobile‑first interface.</li>
              </ul>
              <p className="mt-4 text-xs text-slate-400">
                Built with React, Tailwind CSS, Node.js, Express, MongoDB, and Gemini AI.
              </p>
            </div>
          </div>
        </section>

        
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Designed for serious practice and fun competition
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-6 max-w-3xl">
            Whether you are preparing for exams, sharpening your fundamentals, or just testing
            yourself for fun, QuizMaster combines speed, variety, and analytics to keep you
            engaged and improving.
          </p>

          <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-900/80 border border-sky-500/20 p-5">
              <h3 className="text-lg font-semibold text-sky-300 mb-2">
                Multiple Subjects
              </h3>
              <p className="text-sm text-slate-300">
                English, Maths, Science, Fun & Entertainment, Programming, Computer Basics,
                GK & Current Affairs—switch between them anytime.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-emerald-500/20 p-5">
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Smart Difficulty
              </h3>
              <p className="text-sm text-slate-300">
                Choose between Low, Medium, and Hard. Gradually move up as your accuracy and
                confidence improve.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-fuchsia-500/20 p-5">
              <h3 className="text-lg font-semibold text-fuchsia-300 mb-2">
                Leaderboard & Profile
              </h3>
              <p className="text-sm text-slate-300">
                Track your scores, see your best subjects, and compare your rank with other
                players on the leaderboard.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">How it works</h2>
          <div className="grid gap-4 md:grid-cols-4 text-sm md:text-base">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <p className="text-xs text-sky-400 mb-1">Step 1</p>
              <h3 className="font-semibold mb-1">Sign up / Login</h3>
              <p className="text-slate-300">
                Create an account to save your progress and sync your scores.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <p className="text-xs text-sky-400 mb-1">Step 2</p>
              <h3 className="font-semibold mb-1">Pick subject & difficulty</h3>
              <p className="text-slate-300">
                Choose from multiple subjects and set the challenge level.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <p className="text-xs text-sky-400 mb-1">Step 3</p>
              <h3 className="font-semibold mb-1">Play 10 questions</h3>
              <p className="text-slate-300">
                Answer each question within 60 seconds and try to maintain accuracy.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
              <p className="text-xs text-sky-400 mb-1">Step 4</p>
              <h3 className="font-semibold mb-1">Review & compete</h3>
              <p className="text-slate-300">
                View your score, learn from mistakes, and climb the leaderboard.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl bg-slate-900/80 border border-sky-500/30 p-6 md:p-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Ready to try QuizMaster?
            </h2>
            <p className="text-sm md:text-base text-slate-300">
              Head to the home page, pick a subject, and see how you perform under the clock.
            </p>
          </div>
          <a
            href="/"
            className="px-6 py-2.5 rounded-full bg-sky-400 text-slate-950 text-sm md:text-base font-semibold hover:bg-sky-300 transition"
          >
            Go to Home
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
