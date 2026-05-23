import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] App crashed:", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          background: "#fafafa",
          color: "#111",
        }}
      >
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#555" }}>
            The site failed to load. Try refreshing — if it keeps happening,
            contact{" "}
            <a href="mailto:waseembali2k26@gmail.com" style={{ color: "#288672" }}>
              waseembali2k26@gmail.com
            </a>
            .
          </p>
          <details
            style={{
              textAlign: "left",
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 8,
              padding: "1rem",
              fontSize: 13,
              color: "#666",
            }}
          >
            <summary style={{ cursor: "pointer", marginBottom: 8 }}>
              Technical details
            </summary>
            <code style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {this.state.error.message}
            </code>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1.5rem",
              padding: "0.625rem 1.25rem",
              background: "#288672",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
