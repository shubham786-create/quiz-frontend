
import React, { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
   
  const [feedback, setFeedback]=useState('')
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/users/api/v1/users/createFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message)
        throw new Error(data.message || "Failed to send message");
      }
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setFeedback("feedback submitted successfully !")
       setTimeout(() => {
        setFeedback('')
      }, 2000);


    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        <section>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400 mb-3">
            Contact us
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight">
            Have feedback, ideas,
            <span className="text-sky-400"> or found a bug?</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 mb-4">
            QuizMaster is constantly evolving. If you have suggestions, want a new subject,
            spotted an issue, or just want to say hi, send a message. Every piece of feedback
            helps improve the experience for everyone.
          </p>

          <div className="mt-6 space-y-4 text-sm md:text-base text-slate-300">
            <div>
              <h2 className="text-sm font-semibold text-sky-300 mb-1">
                Types of messages you can send
              </h2>
              <ul className="list-disc list-inside text-slate-300">
                <li>Feature requests or improvement ideas.</li>
                <li>Bug reports or wrong questions/answers.</li>
                <li>Collaboration or project-related queries.</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3">
                <p className="text-slate-400">Support email</p>
                <p className="font-semibold text-sky-300">
                  support@quizmaster.app
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3">
                <p className="text-slate-400">Response time</p>
                <p className="font-semibold text-emerald-300">
                  Typically within 24–48 hours
                </p>
              </div>
            </div>
          </div>
        </section>


        <section className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-sky-500 via-cyan-400 to-fuchsia-500 opacity-50 blur-2xl" />
          <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800/80 p-6 md:p-7 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Send a message
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mb-4">
              Fill in the form below and share as much detail as you can.
            </p>
            <p className='p-2 text-sky-400 font-semibold'>{feedback}</p>

            <form className="space-y-4"  onSubmit={submitHandler}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name='name'
                    value={form.name}
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Your name"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name='email'
                    value={form.email}
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="you@example.com"
                    onChange={changeHandler}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name='subject'
                  value={form.subject}
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Feature request, bug report, feedback, etc."
                  onChange={changeHandler}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  name='message'
                  value={form.message}
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Describe your idea, issue, or question..."
                  onChange={changeHandler}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full rounded-xl bg-sky-400 text-slate-950 text-sm font-semibold py-2.5 hover:bg-sky-300 transition"
               
              >
                Submit Feedback
              </button>

              <p className="text-[11px]  text-slate-500 mt-2">
                By submitting, you agree that your message may be used to improve QuizMaster.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
