import { opportunities } from "./data.js";

// Start the workshop here with npm run dev:starter.
// Ask your AI assistant to add one feature at a time, then explain and test it.
export default function Starter() {
  return (
    <main className="starter">
      <a className="brand" href="/">
        CampusConnect<span>✳</span>
      </a>
      <p className="eyebrow">Student starter</p>
      <h1>
        Your next step
        <br />
        starts here.
      </h1>
      <p>
        All listings are fictional workshop examples. Start by displaying the
        first opportunity, then build a board.
      </p>
      <article className="card">
        <p className="category">{opportunities[0].category}</p>
        <h2>{opportunities[0].title}</h2>
        <p>{opportunities[0].description}</p>
      </article>
      <p>
        Follow docs/STUDENT_GUIDE.md. The complete reference application runs
        with npm run dev.
      </p>
    </main>
  );
}
