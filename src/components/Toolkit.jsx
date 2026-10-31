import { Minus, Plus } from "lucide-react";
import { toolkit } from "../data/siteData";
import { projectCatalog } from "../data/projectCatalog";

const skillName = (skill) => (typeof skill === "string" ? skill : skill.name);
const usedIn = (skill) => {
  const names = typeof skill === "string" ? [skill] : skill.match || [skill.name];
  return projectCatalog.filter((project) => project.tech.some((tech) => names.includes(tech))).length;
};
const plural = (count) => `${count} project${count === 1 ? "" : "s"}`;

/*
  Primary technologies first, each with the number of archive projects
  that use it. Everything else sits in expandable categories, with
  "currently learning" kept visibly separate from tools already used.
*/
export default function Toolkit() {
  return (
    <div className="toolkit">
      <ul className="toolkit-primary" aria-label="Primary technologies">
        {toolkit.primary.map((name) => (
          <li key={name}>
            <strong>{name}</strong>
            <span>Used in {plural(usedIn(name))}</span>
          </li>
        ))}
      </ul>
      <div className="toolkit-groups">
        {toolkit.groups.map((group) => (
          <details key={group.title} className={group.learning ? "toolkit-group is-learning" : "toolkit-group"}>
            <summary>
              <h3>{group.title}</h3>
              <span className="toolkit-count">{group.skills.length}</span>
              <Plus className="expand-plus" size={16} aria-hidden="true" />
              <Minus className="expand-minus" size={16} aria-hidden="true" />
            </summary>
            <ul>
              {group.skills.map((skill) => {
                const count = group.learning ? 0 : usedIn(skill);
                return (
                  <li key={skillName(skill)}>
                    {skillName(skill)}
                    {group.learning ? (
                      <span>Learning</span>
                    ) : (
                      count > 0 && <span>{plural(count)}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
      <p className="toolkit-note">
        Project counts come from the stacks listed in the archive. Skills without a count are used in work and
        study outside these projects.
      </p>
    </div>
  );
}
