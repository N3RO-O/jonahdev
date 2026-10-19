import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import {
  projectCatalog,
  repositoryCount,
  catalogCategories,
} from "../data/projectCatalog";

export default function ProjectIndex({ onOpen }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const matches = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return projectCatalog.filter((project) => {
      const text = [
        project.title,
        project.subtitle,
        project.description,
        project.status,
        project.source,
        project.repository?.name,
        ...project.tech,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (category === "all" || project.category === category) &&
        words.every((word) => text.includes(word))
      );
    });
  }, [query, category]);

  return (
    <div className="project-index" id="project-index">
      <div className="index-heading">
        <div>
          <span className="eyebrow">
            The full collection / {projectCatalog.length} entries
          </span>
          <h3>
            Every project.
            <br />
            <em>Part of the story.</em>
          </h3>
        </div>
        <p>
          {repositoryCount} GitHub repositories, local tools, earlier editions,
          experiments, and visual work. Follow an idea a little further.
        </p>
      </div>
      <div className="index-search">
        <Search size={17} aria-hidden="true" />
        <label className="sr-only" htmlFor="project-search">
          Search the complete project index
        </label>
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a project, technology, or idea…"
          autoComplete="off"
        />
        {query && (
          <button
            className="icon-button"
            aria-label="Clear project search"
            onClick={() => setQuery("")}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div
        className="index-filters"
        role="group"
        aria-label="Project index categories"
      >
        {catalogCategories.map(([key, label]) => (
          <button
            key={key}
            aria-pressed={category === key}
            onClick={() => setCategory(key)}
            className={category === key ? "active" : ""}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="index-count" role="status">
        Showing {matches.length} of {projectCatalog.length} projects
      </div>
      <div className="index-list">
        {matches.map((project) => (
          <button
            key={project.id}
            className="index-row"
            onClick={() => onOpen(project)}
            aria-label={`Read about ${project.title}`}
          >
            <span className="row-index">
              {String(projectCatalog.indexOf(project) + 1).padStart(2, "0")}
            </span>
            <span className="index-project-name">
              <strong>{project.title}</strong>
              <span>{project.subtitle}</span>
            </span>
            <span className="index-project-stack">
              {project.tech.slice(0, 3).join(" / ")}
            </span>
            <span className="index-project-status">{project.status}</span>
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      {!matches.length && (
        <div className="index-empty">
          <p>No projects match that combination.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Show every project <ArrowUpRight size={15} />
          </button>
        </div>
      )}
      <p className="index-footnote">
        A working archive, including prototypes and forks. Project notes
        identify their status and original contributors.
      </p>
    </div>
  );
}
