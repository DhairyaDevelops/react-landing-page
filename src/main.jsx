import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrief, priorities, projectTypes } from "./brief.js";
import "./styles.css";

function Arrow({ diagonal = false, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a
      className={`brand${light ? " brand-light" : ""}`}
      href="#home"
      aria-label="Fieldnote Studio home"
    >
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        fieldnote<span className="brand-sub">STUDIO</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const nav = useRef(null);
  useEffect(() => {
    if (!open) return;
    function onKey(event) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(event) {
      if (
        !nav.current?.contains(event.target) &&
        !menuButton.current?.contains(event.target)
      )
        setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);
  function goToSection(event, id) {
    setOpen(false);
    // Move keyboard focus to the destination when mobile navigation collapses.
    if (window.matchMedia("(max-width: 720px)").matches) {
      event.preventDefault();
      const destination = document.getElementById(id);
      destination?.focus({ preventScroll: true });
      destination?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      history.replaceState(null, "", `#${id}`);
    }
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span
            className={open ? "menu-icon is-open" : "menu-icon"}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
        <nav
          id="main-navigation"
          ref={nav}
          aria-label="Main navigation"
          className={open ? "main-nav is-open" : "main-nav"}
        >
          <a href="#work" onClick={(event) => goToSection(event, "work")}>
            The work
          </a>
          <a
            href="#approach"
            onClick={(event) => goToSection(event, "approach")}
          >
            The approach
          </a>
          <a
            href="#brief"
            className="nav-cta"
            onClick={(event) => goToSection(event, "brief")}
          >
            Try the brief <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="hero container"
      tabIndex="-1"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" />A fictional studio. A real working
          demo.
        </p>
        <h1 id="hero-title">
          A thoughtful
          <br />
          first <em>impression.</em>
        </h1>
        <p className="hero-description">
          Clear stories. Considered design. A little room to be different.
          Explore a landing page made to turn a good idea into a memorable
          introduction.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#work">
            Explore the work <Arrow />
          </a>
          <span className="hero-note">
            Built in React.
            <br />
            Designed with intention.
          </span>
        </div>
        <div className="hero-capabilities">
          <span>Strategy & structure</span>
          <span>Responsive design</span>
          <span>Clean handover</span>
        </div>
      </div>
      <div
        className="hero-visual"
        aria-label="Original fictional landing-page design concept"
      >
        <div className="visual-topline">
          <span>FROM IDEA TO INTERFACE</span>
          <span>CONCEPT / 01</span>
        </div>
        <div className="preview-window">
          <div className="window-chrome">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>an idea, brought to life</span>
            <Arrow diagonal />
          </div>
          <div className="concept-page">
            <div className="concept-nav">
              <span className="concept-wordmark">
                little by little<span>✳</span>
              </span>
              <span className="concept-menu" aria-hidden="true">
                ☰
              </span>
            </div>
            <div className="concept-body">
              <p className="micro-label">A CONCEPT FOR SLOWER LIVING</p>
              <p className="concept-headline">
                Good things
                <br />
                take <em>shape.</em>
              </p>
              <p className="concept-text">
                A little less noise.
                <br />A little more possibility.
              </p>
              <span className="concept-pill">
                Find your rhythm <Arrow />
              </span>
              <div className="sculpture" aria-hidden="true">
                <div className="sculpture-arch" />
                <div className="sculpture-orb" />
                <div className="sculpture-base" />
              </div>
            </div>
            <div className="concept-bottom">
              <span>MADE FOR THE EVERYDAY</span>
              <span>01 — 03</span>
            </div>
          </div>
        </div>
        <div className="visual-bottomline">
          <span className="visual-note">
            Small details.
            <br />
            <em>Lasting impressions.</em>
          </span>
          <span className="round-stamp" aria-hidden="true">
            DESIGNED
            <br />
            <span>✳</span>
            <br />
            TO FEEL RIGHT
          </span>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    id: "editorial",
    title: "Room to breathe",
    type: "EDITORIAL / LIFESTYLE",
    description:
      "An expressive layout that gives a simple story space to unfold.",
    number: "01",
  },
  {
    id: "product",
    title: "Clarity comes first",
    type: "PRODUCT / SOFTWARE",
    description:
      "A focused introduction built around the product and its purpose.",
    number: "02",
  },
  {
    id: "service",
    title: "A personal touch",
    type: "SERVICE / INDEPENDENT",
    description:
      "A warm, structured starting point for a service-led business.",
    number: "03",
  },
];

function ConceptArtwork({ type }) {
  if (type === "editorial")
    return (
      <div className="artwork editorial-art" aria-hidden="true">
        <div className="tiny-nav">
          STILL / HERE<span>Take a moment ↗</span>
        </div>
        <p>
          A slower
          <br />
          <em>kind of day.</em>
        </p>
        <div className="editorial-sun" />
        <div className="editorial-hill" />
        <span className="artwork-caption">SPACE FOR WHAT MATTERS</span>
      </div>
    );
  if (type === "product")
    return (
      <div className="artwork product-art" aria-hidden="true">
        <div className="tiny-nav">
          FOLD<span>↗</span>
        </div>
        <p>
          Less noise.
          <br />
          <em>More flow.</em>
        </p>
        <div className="tiny-board">
          <div>
            <span>TO EXPLORE</span>
            <i />
            <i />
          </div>
          <div>
            <span>IN PROGRESS</span>
            <i />
            <i className="tiny-card-light" />
          </div>
          <div>
            <span>READY</span>
            <i className="tiny-card-light" />
          </div>
        </div>
      </div>
    );
  return (
    <div className="artwork service-art" aria-hidden="true">
      <div className="tiny-nav">
        THE GOOD FORM<span>About &nbsp; Work</span>
      </div>
      <div className="service-arch">
        <span>
          Ideas with
          <br />
          <em>good bones.</em>
        </span>
        <div className="service-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
      <span className="artwork-caption">
        A LITTLE STRUCTURE. A LOT OF POSSIBILITY.
      </span>
    </div>
  );
}

function Work() {
  return (
    <section
      id="work"
      className="work section-border"
      tabIndex="-1"
      aria-labelledby="work-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / DESIGN EXPLORATIONS</p>
            <h2 id="work-title">
              Different ideas.
              <br />
              <em>The same care.</em>
            </h2>
          </div>
          <p>
            Three original visual directions, imagined for different kinds of
            businesses. Fictional concepts, not client commissions.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project" key={project.id}>
              <ConceptArtwork type={project.id} />
              <div className="project-meta">
                <span>{project.type}</span>
                <span>{project.number}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
        <div className="work-note">
          <span className="note-star" aria-hidden="true">
            ✳
          </span>
          <p>
            Good design isn't decoration. It's helping someone understand
            <br className="desktop-break" /> what you do, why it matters, and
            where to go next.
          </p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Is Fieldnote Studio a real business?",
    "No. Fieldnote Studio is a fictional brand created for this independent portfolio demonstration. The layouts are original concepts, not client work, and no commercial results are claimed.",
  ],
  [
    "What actually works in this demo?",
    "The responsive navigation, keyboard-friendly FAQ accordion and local project-brief preview are functional. The miniature design explorations are visual examples rather than separate websites.",
  ],
  [
    "What happens to the project brief?",
    "Nothing is sent or saved. The brief is validated and displayed only in React memory in this browser tab. It disappears when you refresh. Please use fictional, non-sensitive information.",
  ],
  [
    "What would a production launch need?",
    "Approved content and asset rights, a real contact workflow and privacy review, deployment, and testing in the target browsers. This demo does not include a backend, analytics, hosting or a live enquiry service.",
  ],
];

function Approach() {
  const [expanded, setExpanded] = useState(null);
  return (
    <section
      id="approach"
      className="approach container"
      tabIndex="-1"
      aria-labelledby="approach-title"
    >
      <div className="approach-intro">
        <p className="eyebrow">02 / THE APPROACH</p>
        <h2 id="approach-title">
          Simple on purpose.
          <br />
          <em>Considered throughout.</em>
        </h2>
        <p>
          A useful page starts with a clear idea. Every detail should help carry
          it forward.
        </p>
        <div className="approach-steps">
          {[
            [
              "01",
              "Find the focus",
              "One audience. One clear message. One meaningful next step.",
            ],
            [
              "02",
              "Give it form",
              "Shape the story with intentional type, spacing and responsive layouts.",
            ],
            [
              "03",
              "Check the details",
              "Review the interactions, keyboard experience and smaller screens.",
            ],
          ].map(([n, title, body]) => (
            <div className="approach-step" key={n}>
              <span>{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="faq-card">
        <p className="eyebrow">A FEW GOOD QUESTIONS</p>
        <h3>Before you explore.</h3>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <h4>
                <button
                  id={`faq-button-${index}`}
                  type="button"
                  aria-expanded={expanded === index}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  {question}
                  <span className="faq-symbol" aria-hidden="true">
                    {expanded === index ? "−" : "+"}
                  </span>
                </button>
              </h4>
              <div
                role="region"
                id={`faq-panel-${index}`}
                aria-labelledby={`faq-button-${index}`}
                hidden={expanded !== index}
              >
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="faq-footnote">
          <span aria-hidden="true">↳</span> Transparent by design. No hidden
          functionality.
        </p>
      </div>
    </section>
  );
}

const blankBrief = { projectType: "", priority: "", goal: "" };

function ProjectBrief() {
  const [values, setValues] = useState(blankBrief);
  const [errors, setErrors] = useState({});
  const [brief, setBrief] = useState(null);
  const resultRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    if (brief) resultRef.current?.focus();
  }, [brief]);
  function change(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }
  function submit(event) {
    event.preventDefault();
    const result = createBrief(values);
    setErrors(result.errors);
    if (result.brief) setBrief(result.brief);
    else {
      const firstInvalid = Object.keys(result.errors)[0];
      formRef.current.elements.namedItem(firstInvalid)?.focus();
    }
  }
  function reset() {
    setBrief(null);
    setValues(blankBrief);
    setErrors({});
    requestAnimationFrame(() =>
      formRef.current?.elements.namedItem("projectType")?.focus(),
    );
  }
  return (
    <section
      id="brief"
      className="brief-section"
      tabIndex="-1"
      aria-labelledby="brief-title"
    >
      <div className="container brief-grid">
        <div className="brief-copy">
          <p className="eyebrow">03 / TRY SOMETHING REAL</p>
          <h2 id="brief-title">
            Every good page
            <br />
            starts with
            <br />
            <em>a little clarity.</em>
          </h2>
          <p>
            Turn a fictional idea into a simple page outline. Try the
            interaction and see how a thoughtful form can feel.
          </p>
          <div className="privacy-note">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3 4 6v6c0 4 4 7 8 9 4-2 8-5 8-9V6l-8-3Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="m8 12 3 3 5-6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p>
              <strong>Demo only. Nothing is submitted.</strong>
              <br />
              No server, no storage, no tracking. Please use fictional,
              non-sensitive information.
            </p>
          </div>
        </div>
        <div className="brief-card">
          {brief ? (
            <div
              className="brief-result"
              ref={resultRef}
              tabIndex="-1"
              aria-labelledby="result-title"
            >
              <span className="result-check" aria-hidden="true">
                ✓
              </span>
              <p className="eyebrow">YOUR LOCAL PREVIEW</p>
              <h3 id="result-title">An idea, with direction.</h3>
              <p className="result-intro">
                Here's a starting structure for your{" "}
                <strong>{brief.projectType.toLowerCase()}</strong>.
              </p>
              <dl className="brief-summary">
                <div>
                  <dt>MAIN PRIORITY</dt>
                  <dd>{brief.priority}</dd>
                </div>
                <div>
                  <dt>SAMPLE GOAL</dt>
                  <dd>{brief.goal}</dd>
                </div>
              </dl>
              <h4 className="outline-title">A possible four-section page</h4>
              <ol className="outline-list">
                {brief.sections.map((section) => (
                  <li key={section}>{section}</li>
                ))}
              </ol>
              <p className="result-notice" role="status">
                Preview created locally. Nothing was sent or saved.
              </p>
              <button
                className="button button-dark"
                type="button"
                onClick={reset}
              >
                Try another idea <Arrow />
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate>
              <div className="form-heading">
                <h3>Your project, in a few words.</h3>
                <span>LOCAL DEMO</span>
              </div>
              <p className="form-instructions">
                All fields are required. Use an imaginary project.
              </p>
              <div className="form-field">
                <label htmlFor="projectType">What are you making?</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={change}
                  required
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={
                    errors.projectType ? "projectType-error" : undefined
                  }
                >
                  <option value="">Choose a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="field-error" id="projectType-error">
                    {errors.projectType}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="priority">What should the page do best?</label>
                <select
                  id="priority"
                  name="priority"
                  value={values.priority}
                  onChange={change}
                  required
                  aria-invalid={Boolean(errors.priority)}
                  aria-describedby={
                    errors.priority ? "priority-error" : undefined
                  }
                >
                  <option value="">Choose a main priority</option>
                  {priorities.map((priority) => (
                    <option key={priority}>{priority}</option>
                  ))}
                </select>
                {errors.priority && (
                  <p className="field-error" id="priority-error">
                    {errors.priority}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="goal">Give the idea a little context</label>
                <textarea
                  id="goal"
                  name="goal"
                  value={values.goal}
                  onChange={change}
                  required
                  minLength="12"
                  maxLength="180"
                  rows="3"
                  placeholder="Example: Introduce a planning tool for independent designers."
                  aria-invalid={Boolean(errors.goal)}
                  aria-describedby={`goal-hint${errors.goal ? " goal-error" : ""}`}
                />
                <div className="field-hint" id="goal-hint">
                  <span>12–180 characters. No personal information.</span>
                  <span>{values.goal.length}/180</span>
                </div>
                {errors.goal && (
                  <p className="field-error" id="goal-error">
                    {errors.goal}
                  </p>
                )}
              </div>
              {Object.values(errors).some(Boolean) && (
                <p className="form-error-summary" role="alert">
                  Please check the highlighted fields.
                </p>
              )}
              <button
                className="button button-dark submit-button"
                type="submit"
              >
                Preview my project outline <Arrow />
              </button>
              <p className="submit-note">
                Creates an on-screen preview, not an enquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="demo-bar">
        <span>INDEPENDENT PORTFOLIO DEMONSTRATION</span>
        <span>Fictional brand · No live submissions</span>
      </div>
      <Header />
      <main id="main" tabIndex="-1">
        <Hero />
        <Work />
        <Approach />
        <ProjectBrief />
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Brand light />
          <p>A little intention goes a long way.</p>
          <a href="#home" className="back-top">
            Back to top <Arrow diagonal />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>Original portfolio concept by Dhairya Sharma.</span>
          <span>AI-assisted development · Local-only interactions</span>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
