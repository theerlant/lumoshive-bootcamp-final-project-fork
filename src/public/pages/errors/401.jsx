import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="text-sm text-gray-500 mb-20">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">401 Unauthorized</span>
      </nav>

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-medium text-black mb-6">
          401 Unauthorized
        </h1>
        <p className="text-base text-gray-700 mb-10">
          You don't have permission to access this page. Please login first.
        </p>

        <Button onClick={() => navigate("/")}>Back to home page</Button>
      </div>
    </>
  );
}
