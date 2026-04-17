import React from "react";
import { brandingAssets } from "../assets";

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Intranet template boundary error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-screen items-center justify-center px-6 py-10"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(190, 252, 0, 0.08), transparent 18%), radial-gradient(circle at top left, rgba(46, 103, 59, 0.18), transparent 28%), var(--usa-surface)",
          }}
        >
          <div className="clean-panel flex w-full max-w-xl flex-col items-center rounded-[2rem] px-10 py-10 text-center">
            <img
              src={brandingAssets.brandMark}
              alt="Company"
              className="h-16 w-16 rounded-2xl object-cover shadow-sm"
            />
            <h1 className="mt-6 text-2xl font-semibold" style={{ color: "var(--usa-heading)" }}>
              Intranet Template
            </h1>
            <p className="mt-4 text-sm leading-7" style={{ color: "var(--usa-muted)" }}>
              We could not load the current screen safely. Please refresh the page or try again in a few
              seconds.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

