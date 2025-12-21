import React, { useEffect, useState } from 'react';

const SUBJECT_LABELS = {
  generalKnowledge: 'General Knowledge',
  currentAffairs: 'Current Affairs',
  mathematics: 'Mathematics',
  science: 'Science',
  computerBasics: 'Computer Basics',
  logicalReasoning: 'Logical Reasoning',
  english: 'English',
};

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [topRes, userRes] = await Promise.all([
          fetch('https://quiz-backend-mwqs.onrender.com/api/v1/users/getTopUsers', {
            credentials: 'include',
          }),
          fetch('https://quiz-backend-mwqs.onrender.com/api/v1/users/getUserScore', {
            credentials: 'include',
          }),
        ]);

        const topData = await topRes.json();
        const userData = await userRes.json();

        if (!topRes.ok) throw new Error('Failed to load leaderboard');
        if (!userRes.ok) throw new Error('Failed to load user stats');
        console.log(topData);
        console.log(userData)
        setLeaderboard(topData.data || []);
        setUserStats(userData.data);
      } catch (err) {
        setError("failed to load leaderboard or user's stats");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= DERIVED USER DATA ================= */
  const subjectStats = userStats
    ? Object.entries(userStats).map(([key, val]) => ({
        subject: SUBJECT_LABELS[key] || key,
        quizzes: val.totalQuiz,
        points: val.totalScore,
        accuracy:
          val.totalQuiz > 0
            ? Math.round((val.totalCorrect / val.totalAttempted || 0) * 100)
            : 0,
      }))
    : [];

  const totalPoints = subjectStats.reduce((a, b) => a + b.points, 0);
  const totalQuizzes = subjectStats.reduce((a, b) => a + b.quizzes, 0);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        Loading leaderboard…
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        {error}
      </div>
    );

  /* ================= UI ================= */
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <section>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Leaderboard</h1>
          <p className="text-slate-300">
            Top performers based on total quiz scores.
          </p>
        </section>

        {/* TOP 3 */}
        <section className="grid md:grid-cols-3 gap-4">
          {leaderboard.slice(0, 3).map((u, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-5 border bg-slate-900 border-slate-800"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Rank #{idx + 1}</span>
                <span>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
              </div>

              <h2 className="text-xl font-semibold">
                {u.fullname || u.username}
              </h2>

              <p className="text-xs text-slate-400 mb-3">
                Best subject:{' '}
                <span className="text-sky-300">
                  {SUBJECT_LABELS[u.subject] || u.subject}
                </span>
              </p>

              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-slate-400">Points</p>
                  <p className="text-lg text-sky-300">{u.totalScore}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Quizzes</p>
                  <p className="text-lg text-emerald-300">{u.totalQuiz}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* FULL TOP 5 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Top 5 Players</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
            <table className="min-w-full text-sm">
              <thead className="text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">Rank</th>
                  <th className="px-4 py-2 text-left">Player</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((u, idx) => (
                  <tr key={idx} className="border-t border-slate-800">
                    <td className="px-4 py-2">#{idx + 1}</td>
                    <td className="px-4 py-2">{u.fullname || u.username}</td>
                    <td className="px-4 py-2">
                      {SUBJECT_LABELS[u.subject] || u.subject}
                    </td>
                    <td className="px-4 py-2 text-right">{u.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* USER STATS */}
        <section className="rounded-3xl bg-slate-900 border border-emerald-500/30 p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <p className="text-xs text-slate-400">Total Points</p>
              <p className="text-xl text-sky-300">{totalPoints}</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <p className="text-xs text-slate-400">Quizzes Played</p>
              <p className="text-xl text-sky-300">{totalQuizzes}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full text-sm">
              <thead className="text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-right">Quizzes</th>
                  <th className="px-4 py-2 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {subjectStats.map((s) => (
                  <tr key={s.subject} className="border-t border-slate-800">
                    <td className="px-4 py-2">{s.subject}</td>
                    <td className="px-4 py-2 text-right">{s.quizzes}</td>
                    <td className="px-4 py-2 text-right">{s.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeaderboardPage;
