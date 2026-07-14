import React from "react";

/** Props for the ErrorBoundary component */
interface ErrorBoundaryProps {
  /** Child components to render inside the error boundary */
  children: React.ReactNode;
  /** Optional custom error message displayed when an error is caught */
  fallbackMessage?: string;
}

/** Internal state for the ErrorBoundary component */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The caught error, if any */
  error: Error | null;
}

/**
 * React Error Boundary component that catches JavaScript errors in its child
 * component tree and displays a fallback UI instead of crashing the whole app.
 *
 * Implements React's `componentDidCatch` lifecycle for error logging and
 * `getDerivedStateFromError` for graceful fallback rendering.
 *
 * @example
 * <ErrorBoundary fallbackMessage="This section failed to load.">
 *   <SomeComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state so the next render shows the fallback UI.
   * @param {Error} error - The error that was thrown
   * @returns {ErrorBoundaryState} Updated state with error details
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Logs error details for diagnostics.
   * @param {Error} error - The caught error
   * @param {React.ErrorInfo} errorInfo - Component stack trace info
   * @returns {void}
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("[StadiumIQ] Uncaught component error:", error, errorInfo);
  }

  /**
   * Resets the error state, allowing the component tree to re-render.
   * @returns {void}
   */
  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center"
        >
          <div className="text-4xl" aria-hidden="true">
            🏟️
          </div>
          <h2 className="text-lg font-bold text-destructive">Something went wrong</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            {this.props.fallbackMessage ?? "StadiumIQ encountered an error. Please try again."}
          </p>
          <button
            onClick={this.handleReset}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            aria-label="Retry loading this section"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
