const Footer = () => (
  <footer className="border-t border-slate-800 bg-slate-950">
    <div className="w-full mx-auto px-4 py-6 flex  justify-center gap-3 text-slate-400 text-sm">
      <p>© {new Date().getFullYear()} QuizMaster · AI-powered quiz platform.</p>
    </div>
    <div className="flex justify-center py-10 items-center gap-4">
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noreferrer"
          className="w-15 h-15 rounded-full flex items-center justify-center bg-sky-400 transition"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-12 h-12"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/your-username"
          target="_blank"
          rel="noreferrer"
          className="w-15 h-15 rounded-full bg-sky-500 flex items-center justify-center  transition"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
            alt="LinkedIn"
            className="w-10 h-10"
          />
        </a>
        <a
          href="https://www.instagram.com/your-username"
          target="_blank"
          rel="noreferrer"
          className="w-15 h-15 rounded-full bg-sky-500 flex items-center justify-center  transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            className="w-10 h-10 rounded"
          />
        </a>
      </div>
  </footer>
);

export default Footer;
