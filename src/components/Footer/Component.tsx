import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import classes from "./Component.module.css";

export type Props = Record<string, never>;

export default function Footer() {
  return (
    <footer className={classes.footer}>
      © 2024 Grant Sanderson
      <DarkToggle />
    </footer>
  );
}

/** dark mode toggle */
function DarkToggle() {
  const [dark, setDark] = useLocalStorage("dark-mode", false);

  useEffect(() => {
    document.documentElement.dataset.dark = String(dark);
  });

  return (
    <>
      <input
        type="checkbox"
        className="dark-toggle"
        aria-label="toggle dark mode"
        checked={dark}
        onChange={(event) => setDark(event.target.checked)}
      />
    </>
  );
}
