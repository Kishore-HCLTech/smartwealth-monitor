import React from "react";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        role="alert"
        className="p-6 bg-red-100 text-red-700 rounded shadow-md max-w-md text-center"
      >
        <h2 className="font-bold text-xl mb-2">Something went wrong</h2>
        <pre className="whitespace-pre-wrap mb-4">{error.message}</pre>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
