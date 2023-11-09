export default function Spinner() {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
      <p>Loading ...</p>
    </div>
  );
}
