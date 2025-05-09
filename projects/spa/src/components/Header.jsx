import "./Header.css";

export default function Header() {
  return (
    <header>
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li>
            <a href="#" className="main-nav__links">
              Home
            </a>
          </li>

          <li>
            <a href="#" className="main-nav__links" aria-current="page">
              Projects
            </a>
          </li>

          <li>
            <a href="#" className="main-nav__links">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
