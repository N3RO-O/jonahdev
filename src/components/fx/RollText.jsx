// Link text that rolls up to a second copy of itself on hover.
export default function RollText({ children }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}
