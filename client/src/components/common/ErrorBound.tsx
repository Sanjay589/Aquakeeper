import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-rose-500/20 bg-rose-950/10 rounded-2xl flex flex-col items-center gap-3 max-w-md mx-auto my-8 text-center">
          <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-lg font-semibold text-slate-200">Something went wrong</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {this.state.error?.message || "An unexpected rendering error occurred."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 hover:border-rose-500/40 rounded-xl text-sm font-medium transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
