import Image from "next/image";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <main className={classes.main}>
      <div className={classes.textWrapper}>
        <h1>Hi, I'm Selim</h1>
        <h2>Full Stack & ML Developer</h2>
        <p>
          I’m a software developer focused on building modern web applications
          with Next.js, React, and .NET technologies. I also have experience in
          machine learning and deep learning using Python, PyTorch, CNNs, and
          Vision Transformers (ViT). I enjoy working on both frontend/backend
          systems and AI-based projects, combining them when possible. I’m
          continuously improving my skills in full-stack development and deep
          learning, and exploring new technologies. Currently, I’m building
          projects to strengthen my portfolio and deepen my knowledge in both
          software engineering and AI. My goal is to become a strong full-stack
          and AI developer, working on impactful and real-world solutions.
        </p>
      </div>
      <div className={classes.imgWrapper}>
        <Image
          className={classes.img}
          src="/pp.png"
          alt="profile"
          fill
          sizes="250px"
          priority
        />
      </div>
    </main>
  );
}
