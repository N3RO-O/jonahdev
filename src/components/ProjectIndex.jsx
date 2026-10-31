import { useMemo, useState } from "react";
import { ArrowUpRight, Minus, Plus, Search, X } from "lucide-react";
import { projectCatalog, catalogCategories } from "../data/projectCatalog";
import StageBadge from "./StageBadge";

// Show a short, scannable list first; searching or filtering reveals everything.
const PREVIEW_COUNT = 10;
const typeLabel = Object.fromEntries(catalogCategories);

export default function ProjectIndex({ onOpen }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const counts = useMemo(
    () =>
      Object.fromEntries(
        catalogCategories.map(([key]) => [
          key,
          key === "all"
            ? projectCatalog.length
            : projectCatalog.filter((project) => project.types.includes(key)).length,
        ]),
      ),
    [],
  );
  const matches = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return projectCatalog.filter((project) => {
      const text = [
        project.title,
        project.subtitle,
        project.description,
        project.status,
        project.stage,
        project.source,
        project.repository?.name,
        ...project.types.map((type) => typeLabel[type]),
        ...project.tech,
        ...project.features,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (category === "all" || project.types.includes(category)) &&
        words.every((word) => text.includes(word))
      );
    });
  }, [query, category]);
  const narrowed = query.trim() !== "" || category !== "all";
  const showAll = expanded || narrowed;
  const visible = showAll ? matches : matches.slice(0, PREVIEW_COUNT);
  const hidden = matches.length - visible.length;
  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="project-index" id="project-index">
      <div className="index-tools">
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
            placeholder="Search by name, technology or feature"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="icon-button"
              aria-label="Clear project search"
              onClick={() => setQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="index-filters" role="group" aria-label="Filter projects by category">
          {catalogCategories.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              {label}
              <span>{counts[key]}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="index-count" role="status">
        {narrowed
          ? `${matches.length} of ${projectCatalog.length} projects match`
          : `Showing ${visible.length} of ${projectCatalog.length} projects`}
      </p>
      <ul className="index-list" id="project-index-list">
        {visible.map((project) => (
          <li key={project.id}>
            <a
              className="index-row"
              href={`/work/${project.id}`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                event.preventDefault();
                onOpen(project.id);
              }}
              aria-label={`Read about ${project.title}`}
            >
              <span className="index-name">
                <strong>{project.title}</strong>
                <span>{project.subtitle}</span>
              </span>
              <span className="index-types">
                {project.types.map((type) => typeLabel[type]).join(", ")}
              </span>
              <span className="index-stack">{project.tech.slice(0, 3).join(" / ")}</span>
              <span className="index-status">
                <StageBadge stage={project.stage} fallback={project.status} />
              </span>
              <span className="index-year">{project.year || "—"}</span>
              <ArrowUpRight className="index-arrow" size={18} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      {!narrowed && matches.length > PREVIEW_COUNT && (
        <button
          type="button"
          className="index-toggle"
          aria-expanded={expanded}
          aria-controls="project-index-list"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show fewer projects" : `Show all ${matches.length} projects (+${hidden})`}
          {expanded ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        </button>
      )}
      {!matches.length && (
        <div className="index-empty">
          <p>No projects match “{query}” in this category. Try a technology such as React or PHP.</p>
          <button type="button" className="text-link" onClick={reset}>
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
