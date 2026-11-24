import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  GraduationCap,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { categories, opportunities } from "./data.js";
import {
  readState,
  selectOpportunities,
  validateListing,
  writeState,
} from "./model.js";

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const emptyForm = {
  title: "",
  organisation: "",
  category: "Internship",
  location: "",
  deadline: "",
  description: "",
  commitment: "",
  remote: false,
};
const dateLabel = (value) =>
  new Date(value + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function App() {
  const [state, setState] = useState(() => readState(browserStorage()));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [notice, setNotice] = useState("");
  const [detail, setDetail] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const detailDialog = useRef(null);
  const formDialog = useRef(null);
  const all = [...state.listings, ...opportunities];
  const visible = selectOpportunities(all, {
    query,
    category,
    savedOnly,
    saved: state.saved,
    remoteOnly,
    sort,
  });

  useEffect(() => {
    if (detail) detailDialog.current.showModal();
    else detailDialog.current.close();
  }, [detail]);
  useEffect(() => {
    if (formOpen) formDialog.current.showModal();
    else formDialog.current.close();
  }, [formOpen]);

  function persist(next, message) {
    setState(next);
    const stored = writeState(browserStorage(), next);
    setNotice(
      stored
        ? message
        : "Browser storage is unavailable. Changes last for this visit only.",
    );
  }

  function toggleSave(item) {
    const wasSaved = state.saved.includes(item.id);
    const saved = wasSaved
      ? state.saved.filter((id) => id !== item.id)
      : [...state.saved, item.id];
    persist(
      { ...state, saved },
      wasSaved
        ? "Removed from saved opportunities."
        : "Opportunity saved in this browser.",
    );
  }

  function submit(event) {
    event.preventDefault();
    const problems = validateListing(form);
    setErrors(problems);
    if (Object.keys(problems).length) return;
    const item = { ...form, id: crypto.randomUUID() };
    for (const field of [
      "title",
      "organisation",
      "location",
      "description",
      "commitment",
    ])
      item[field] = item[field].trim();
    persist(
      { ...state, listings: [item, ...state.listings] },
      "Opportunity added in this browser.",
    );
    setFormOpen(false);
    setForm(emptyForm);
    setQuery("");
    setCategory("All");
    setSavedOnly(false);
    setRemoteOnly(false);
    setSort("recommended");
  }

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setRemoteOnly(false);
    setSavedOnly(false);
    setSort("recommended");
  }

  return (
    <>
      <a className="skip" href="#opportunities">
        Skip to opportunities
      </a>
      <header className="site-header">
        <a href="/" className="brand" aria-label="CampusConnect home">
          CampusConnect<span aria-hidden="true">✳</span>
        </a>
        <nav aria-label="Main navigation">
          <button
            className={!savedOnly ? "nav-link active" : "nav-link"}
            onClick={() => setSavedOnly(false)}
          >
            Explore
          </button>
          <button
            className={savedOnly ? "nav-link active" : "nav-link"}
            onClick={() => setSavedOnly(true)}
          >
            Saved <span className="count">{state.saved.length}</span>
          </button>
        </nav>
        <button
          className="primary small"
          onClick={() => {
            setErrors({});
            setFormOpen(true);
          }}
        >
          <Plus size={18} /> Add opportunity
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">A little curiosity. A new possibility.</p>
            <h1>
              Your next step
              <br />
              starts <em>here.</em>
            </h1>
            <p className="intro">
              Find a place to learn, a chance to contribute,
              <br className="desktop" /> and something worth getting excited
              about.
            </p>
            <a className="hero-link" href="#opportunities">
              Explore opportunities <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" />
            <div className="art-label">
              MAKE ROOM FOR
              <br />
              WHAT COMES NEXT.
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-star">✳</div>
            <div className="art-foot">LEARN / BUILD / BELONG</div>
          </div>
        </section>

        <div className="sample-note">
          <GraduationCap size={19} />
          <span>
            Workshop edition. All listings are fictional. Your saved items and
            added opportunities stay in this browser.
          </span>
        </div>
        <section
          id="opportunities"
          className="board"
          aria-labelledby="board-title"
        >
          <div className="section-top">
            <div>
              <p className="eyebrow">Find your direction</p>
              <h2 id="board-title">
                {savedOnly ? "Your saved opportunities" : "Open a new door."}
              </h2>
            </div>
            <p className="results" aria-live="polite">
              {visible.length}{" "}
              {visible.length === 1 ? "opportunity" : "opportunities"}
            </p>
          </div>
          <div className="toolbar">
            <label className="search">
              <Search size={20} />
              <span className="sr-only">Search opportunities</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search roles, organisations or locations"
              />
            </label>
            <label className="sort">
              <SlidersHorizontal size={17} />
              <span className="sr-only">Sort opportunities</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="deadline">Deadline first</option>
                <option value="title">Title A–Z</option>
              </select>
            </label>
          </div>
          <div className="filter-row">
            <div className="tabs" aria-label="Filter by category">
              {["All", ...categories].map((name) => (
                <button
                  key={name}
                  aria-pressed={category === name}
                  className={category === name ? "tab selected" : "tab"}
                  onClick={() => setCategory(name)}
                >
                  {name === "All" ? "All opportunities" : name}
                </button>
              ))}
            </div>
            <label className="remote">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(event) => setRemoteOnly(event.target.checked)}
              />{" "}
              Remote friendly
            </label>
          </div>
          {visible.length ? (
            <div className="card-grid">
              {visible.map((item) => (
                <article
                  className={"card category-" + item.category.toLowerCase()}
                  key={item.id}
                >
                  <div className="card-top">
                    <span className="category">{item.category}</span>
                    <button
                      className="icon-button"
                      aria-label={
                        (state.saved.includes(item.id) ? "Unsave " : "Save ") +
                        item.title
                      }
                      aria-pressed={state.saved.includes(item.id)}
                      onClick={() => toggleSave(item)}
                    >
                      <Bookmark
                        size={20}
                        fill={
                          state.saved.includes(item.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>
                  <p className="organisation">{item.organisation}</p>
                  <h3>
                    <button onClick={() => setDetail(item)}>
                      {item.title}
                    </button>
                  </h3>
                  <p className="description">{item.description}</p>
                  <div className="card-meta">
                    <span>
                      <MapPin size={15} />
                      {item.location}
                    </span>
                    <span>
                      <CalendarDays size={15} />
                      {dateLabel(item.deadline)}
                    </span>
                  </div>
                  <div className="card-bottom">
                    <span>{item.commitment}</span>
                    <button
                      onClick={() => setDetail(item)}
                      aria-label={"View " + item.title}
                    >
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty">
              <Search size={32} />
              <h3>
                {savedOnly
                  ? "No saved opportunities match."
                  : "No matches just yet."}
              </h3>
              <p>
                Try another search or category. Save an opportunity using its
                bookmark button.
              </p>
              <button className="primary" onClick={resetFilters}>
                Explore all opportunities
              </button>
            </div>
          )}
        </section>
      </main>

      <footer>
        <a href="/" className="brand">
          CampusConnect<span aria-hidden="true">✳</span>
        </a>
        <p>Built to explore. Made to make your own.</p>
        <span>Workshop by Olamide Kosile · Tek Tribe</span>
      </footer>
      <div className="notice" role="status">
        {notice && (
          <>
            <Check size={18} />
            {notice}
            <button
              className="icon-button"
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X size={16} />
            </button>
          </>
        )}
      </div>

      <dialog
        ref={detailDialog}
        onCancel={() => setDetail(null)}
        onClose={() => setDetail(null)}
      >
        {detail && (
          <div className="dialog-content">
            <button
              className="icon-button close"
              aria-label="Close details"
              onClick={() => setDetail(null)}
            >
              <X />
            </button>
            <span className="category">{detail.category}</span>
            <p className="organisation">{detail.organisation}</p>
            <h2>{detail.title}</h2>
            <p>{detail.description}</p>
            <dl>
              <dt>Location</dt>
              <dd>
                {detail.location}
                {detail.remote ? " · Remote friendly" : ""}
              </dd>
              <dt>Deadline</dt>
              <dd>{dateLabel(detail.deadline)}</dd>
              <dt>Commitment</dt>
              <dd>{detail.commitment}</dd>
            </dl>
            <p className="dialog-note">
              This is a fictional workshop listing. Practise saving it or create
              your own sample opportunity.
            </p>
            <button className="primary" onClick={() => toggleSave(detail)}>
              <Bookmark size={18} />
              {state.saved.includes(detail.id)
                ? "Remove from saved"
                : "Save opportunity"}
            </button>
          </div>
        )}
      </dialog>

      <dialog
        ref={formDialog}
        onCancel={() => setFormOpen(false)}
        onClose={() => setFormOpen(false)}
      >
        <form className="dialog-content" onSubmit={submit} noValidate>
          <button
            type="button"
            className="icon-button close"
            aria-label="Close form"
            onClick={() => setFormOpen(false)}
          >
            <X />
          </button>
          <p className="eyebrow">Share a possibility</p>
          <h2>Add an opportunity</h2>
          <p className="dialog-note">
            Use fictional details for this workshop. This listing will be stored
            on your device.
          </p>
          {Object.keys(errors).length > 0 && (
            <p role="alert" className="error">
              Please check the highlighted fields.
            </p>
          )}
          {[
            ["title", "Opportunity title", "text", 100],
            ["organisation", "Organisation", "text", 80],
            ["location", "Location", "text", 80],
            ["deadline", "Application deadline", "date"],
            ["commitment", "Commitment or award", "text", 80],
          ].map(([field, label, type, maxLength]) => (
            <label className="field" key={field}>
              {label}
              <input
                required
                type={type}
                value={form[field]}
                maxLength={maxLength}
                aria-invalid={Boolean(errors[field])}
                aria-describedby={errors[field] ? field + "-error" : undefined}
                onInput={(event) =>
                  setForm((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
              />
              {errors[field] && (
                <span id={field + "-error"} className="error">
                  {errors[field]}
                </span>
              )}
            </label>
          ))}
          <label className="field">
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value })
              }
            >
              {categories.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Description
            <textarea
              required
              rows={4}
              maxLength={1500}
              value={form.description}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
            {errors.description && (
              <span id="description-error" className="error">
                {errors.description}
              </span>
            )}
          </label>
          <label className="remote">
            <input
              type="checkbox"
              checked={form.remote}
              onChange={(event) =>
                setForm({ ...form, remote: event.target.checked })
              }
            />{" "}
            Remote friendly
          </label>
          <button type="submit" className="primary">
            Add opportunity
          </button>
        </form>
      </dialog>
    </>
  );
}
