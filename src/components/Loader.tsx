export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div data-testid="loading-spinner" className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
} 