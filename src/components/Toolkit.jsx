import { toolkit } from "../data/siteData";
import { projectCatalog } from "../data/projectCatalog";

const skillName = (skill) => (typeof skill === "string" ? skill : skill.name);
const usedIn = (skill) => {
  const names = typeof skill === "string" ? [skill] : skill.match || [skill.name];
  return projectCatalog.filter((project) => project.tech.some((tech) => names.includes(tech))).length;
};
const plural = (count) => `${count} project${count === 1 ? "" : "s"}`;
const pad = (value) => String(value).padStart(2, "0");

/*
  Primary technologies first, each with the number of archive projects
  that use it, then every category in a bordered grid. "Currently
  learning" is kept visibly apart from tools already used in projects.
*/
export default function Toolkit() {
  return (
    <div className="toolkit">
      <ul className="toolkit-primary" aria-label="Primary technologies">
        {toolkit.primary.map((name) => (
          <li key={name} data-reveal>
            <strong>{name}</strong>
            <span className="label">Used in {plural(usedIn(name))}</span>
          </li>
        ))}
      </ul>
      <div className="cells cells-3 toolkit-groups">
        {toolkit.groups.map((group, index) => (
          <section key={group.title} className={group.learning ? "cell is-learning" : "cell"} data-reveal>
            <div className="cell-head">
              <h3 className="label">{group.title}</h3>
              <span className="label">{pad(index + 1)}</span>
            </div>
            <ul className="tags">
              {group.skills.map((skill) => {
                const count = group.learning ? 0 : usedIn(skill);
                const note = group.learning ? "Learning" : count > 0 ? plural(count) : "";
                return (
                  <li key={skillName(skill)} title={note || undefined}>
                    {skillName(skill)}
                    {group.learning ? <em>Learning</em> : count > 0 && <em>{count}</em>}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="toolkit-note">
        Numbers beside a skill are the projects in the archive that use it. Skills without a number are used in
        work and study outside these projects.
      </p>
    </div>
  );
}
