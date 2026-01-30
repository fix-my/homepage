import BuggyCounter from './components/BuggyCounter';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">에러 경계</h1>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    </div>
  );
}
