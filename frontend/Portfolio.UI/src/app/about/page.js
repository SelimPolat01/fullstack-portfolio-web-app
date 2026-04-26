import Image from "next/image";
import classes from "./About.module.css";

export default function About() {
  const tectNames = [
    "python",
    "js",
    "csharp",
    "sql",
    "typescript",
    "nodejs",
    "dotnet",
    "react",
    "pytorch",
    "nextjs",
    "redux",
    "html",
    "css",
    "git",
  ];
  return (
    <main className={classes.main}>
      <h1 className={classes.aboutMe}>About Me</h1>
      <div className={classes.aboutText}>
        <p>
          I am a Computer Engineering student and a software developer focused
          on full-stack web development with a strong emphasis on .NET and
          modern JavaScript frameworks. I build scalable backend systems using
          ASP.NET Core and design responsive frontend applications with React
          and Angular. I have experience developing RESTful APIs, authentication
          systems (JWT-based), and CRUD-based applications, and I actively apply
          clean architecture and modular design principles in my projects. In
          addition to web development, I have worked on machine learning
          projects using Python and PyTorch, particularly in image
          classification and regression tasks, which strengthened my
          problem-solving and analytical thinking skills. I am continuously
          improving my skills by building real-world projects and exploring
          backend architecture, system design, and AI integration in web
          applications.
        </p>
      </div>
      <div className={classes.logoDiv}>
        {tectNames.map((logoPath) => (
          <div key={logoPath}>
            <Image
              className={classes.logo}
              src={`/${logoPath}.svg`}
              alt={logoPath}
              width={30}
              height={30}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
