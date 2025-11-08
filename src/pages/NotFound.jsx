import { Link, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 bg-linear-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-gray-800 dark:via-gray-900  dark:to-black
                    text-white dark:text-gray-100 relative"
      >
        <h1
          className="text-[10rem] md:text-[12rem] font-extrabold animate-bounce 
                     text-purple-100 dark:text-gray-300"
        >
          404
        </h1>
        <h2
          className="text-3xl md:text-4xl font-semibold mb-4 
                     text-purple-50 dark:text-gray-100"
        >
          Page Not Found
        </h2>

        <p className="text-center max-w-md mb-8 text-white font-extrabold dark:text-white">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex gap-4">
          <Link to="/">
            <button
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold 
            hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 
            dark:hover:bg-gray-600 transition"
            >
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
