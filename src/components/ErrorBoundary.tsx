import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Class-based ErrorBoundary that catches render errors in any subtree.
 * Wraps every route via the root layout so a crash in one page never blanks the whole app.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  /** React lifecycle: derive next state from a thrown error. */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /** React lifecycle: report the error to Lovable's error pipeline. */
  componentDidCatch(error: Error, info: ErrorInfo): void {
    reportLovableError(error, { boundary: "app_error_boundary", componentStack: info.componentStack });
  }

  /** Reset boundary and let children re-mount. */
  private reset = (): void => this.setState({ hasError: false, error: null });

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return (
      <div role="alert" className="mx-auto max-w-md rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center">
        <h2 className="text-lg font-semibold text-destructive">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">{this.state.error?.message ?? "Unexpected error."}</p>
        <button
          onClick={this.reset}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  }
}
