import { ArrowUpRight } from "lucide-react";
import StageBadge from "./StageBadge";

/*
  Editorial product grid: one large featured product, two medium ones,
  then a balanced row of three. Each card is a real link to the project's
  own URL, so it can be opened in a new tab or shared; a plain click opens
  the case study in place.
*/
export default function ProductGrid({ products, onOpen }) {
  return (
    <ul className="product-grid">
      {products.map((product, index) => (
        <li key={product.id} className={`product product-${product.size || "sm"}`}>
          <a
            className="product-link"
            href={`/work/${product.id}`}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
              event.preventDefault();
              onOpen(product.id);
            }}
          >
            <span className="product-media">
              <img
                src={product.size === "lg" ? product.cover : product.coverSmall}
                srcSet={`${product.coverSmall} 800w, ${product.cover} 1600w`}
                sizes={
                  product.size === "lg"
                    ? "(min-width: 1100px) 66vw, 100vw"
                    : product.size === "md"
                      ? "(min-width: 900px) 50vw, 100vw"
                      : "(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                }
                alt={`${product.title}: ${product.coverNote ? product.coverNote.toLowerCase() : "interface screenshot"}`}
                width="1600"
                height="1000"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={index === 0 ? "high" : undefined}
              />
              {product.coverNote && <span className="product-note">{product.coverNote}</span>}
            </span>
            <span className="product-body">
              <span className="product-meta">
                <StageBadge stage={product.stage} />
                <span>{product.context}</span>
              </span>
              <h3 className="product-title">{product.title}</h3>
              <span className="product-summary">{product.summary}</span>
              <span className="product-stack">{product.tech.slice(0, 3).join(" / ")}</span>
              <span className="product-cta">
                View project <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
