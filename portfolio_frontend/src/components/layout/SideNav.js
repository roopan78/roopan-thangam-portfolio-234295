import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sticky navigation for section links with active highlighting.
 */
export function SideNav({ brand, items, activeId, onNavigate }) {
  return (
    <nav className="sideNav" aria-label="Section navigation">
      <div className="brandBlock" aria-label="Brand">
        <div className="brandMark" aria-hidden="true">
          {brand?.markText ?? "RT"}
        </div>
        <div>
          <p className="brandTitle">{brand?.title ?? "Portfolio"}</p>
          <p className="brandSubtitle">{brand?.subtitle ?? ""}</p>
        </div>
      </div>

      <ul className="navList" aria-label="Sections">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`navLink ${isActive ? "navLinkActive" : ""}`}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Go to ${item.label}`}
              >
                <span>{item.label}</span>
                {isActive ? <span className="navPill">Active</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
