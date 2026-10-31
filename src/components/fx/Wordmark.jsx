// The NERO letterforms from the brand lockup (public/assets/brand), drawn
// at display size with the surname set vertically beside them.
const LETTERS =
  "M128.736 74V26.832H140.448L157.728 57.36V26.832H167.392V74H157.408L140.32 43.728H138.4V74Z M174.368 74V26.832H208.416V35.344H184.352V45.456H206.176V53.648H184.352V65.488H208.416V74Z M213.856 74V26.832H243.68L250.784 33.936V50.192L244.832 56.08L252.448 74H241.888L235.104 57.296H223.84V74ZM223.84 49.232H238.432L240.992 46.736L240.928 37.392L238.432 34.896H223.84Z M263.072 74 255.968 66.896V33.936L263.072 26.832H288.416L295.584 33.936V66.896L288.416 74ZM268.512 65.936H283.04L285.6 63.376V37.392L282.976 34.896H268.512L265.952 37.392V63.376Z";

export default function Wordmark({ className = "" }) {
  return (
    <div className={`wordmark ${className}`} aria-hidden="true">
      <svg viewBox="128.7 26.8 166.9 47.2" preserveAspectRatio="xMinYMid meet">
        <path d={LETTERS} fill="currentColor" />
      </svg>
      <span className="wordmark-side">Tabuzo</span>
    </div>
  );
}
