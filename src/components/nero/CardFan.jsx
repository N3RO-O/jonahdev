import { useEffect, useRef, useState } from "react";
import useScrollProgress from "../../hooks/useScrollProgress";
import PixelIcon from "./PixelIcon";
import Scramble from "./Scramble";

const CARDS = [
  {
    icon: "ear",
    title: "Listen first",
    text: "Every system starts with the people who will use it — their words, their workflow, their pain points.",
  },
  {
    icon: "build",
    title: "Build it right",
    text: "Clean schemas, role-based access, and interfaces that stay readable for non-technical users.",
  },
  {
    icon: "spark",
    title: "Make it clear",
    text: "Documentation, handoffs and visuals that help the work keep working after launch.",
  },
];

/*
  Three cards start stacked and fan out as you scroll through the section,
  echoing the reference's "starts here" card stack.
*/
export default function CardFan() {
  const section = useRef(null);
  const progress = useScrollProgress(section);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setAnimate(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const p = animate ? Math.min(1, Math.max(0, (progress - 0.08) / 0.6)) : 1;
  const ease = 1 - (1 - p) ** 3;

  return (
    <section className={animate ? "card-fan is-animated" : "card-fan"} ref={section}>
      <div className="card-fan-sticky">
        <div className="wrap card-fan-head">
          <p className="kicker">How I work</p>
          <Scramble as="h2" className="pixel-display" text="Starts here" />
          <p className="lede">
            Human ideas, purposeful code. A simple process that keeps projects
            honest from the first conversation to the last commit.
          </p>
        </div>
        <div className="card-fan-stage">
          {CARDS.map((card, index) => {
            const side = index - 1;
            const style = animate
              ? {
                  transform: `translate3d(${side * 330 * ease}px, ${Math.abs(side) * 26 * ease}px, 0) rotate(${side * 9 * ease + (1 - ease) * (index - 1) * 3}deg)`,
                  zIndex: index === 1 ? 3 : 2 - Math.abs(side),
                }
              : undefined;
            return (
              <article className="fan-card" key={card.title} style={style}>
                <span className="fan-card-index">0{index + 1}</span>
                <PixelIcon name={card.icon} size={72} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
