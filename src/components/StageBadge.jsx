// Development status, shown the same way on cards, the archive and case
// studies. The tone only colours the dot; the words carry the meaning.
const tones = {
  Released: "done",
  Deployed: "done",
  Completed: "done",
  Testing: "test",
  MVP: "test",
  "In development": "dev",
};

export default function StageBadge({ stage, fallback }) {
  const label = stage || fallback;
  if (!label) return null;
  return (
    <span className={`stage stage-${tones[label] || "neutral"}`}>
      <i aria-hidden="true" />
      {label}
    </span>
  );
}
