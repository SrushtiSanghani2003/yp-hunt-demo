import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const RouteErrorPage = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Please refresh the page and try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = typeof error.data === "string" ? error.data : message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-sm text-white"
        >
          Refresh page
        </button>
      </div>
    </div>
  );
};

export default RouteErrorPage;
