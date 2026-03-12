import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export default function ServerErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <nav className="text-sm text-gray-500 mb-20">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">500 Error</span>
      </nav>

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-medium text-black mb-6">
          500 Server Error
        </h1>
        <p className="text-base text-gray-700 mb-10">
          Whoops! Something went wrong on our end. Please try again later.
        </p>

        <Button onClick={() => navigate("/")}>Back to home page</Button>
      </div>
    </div>
  );
}
