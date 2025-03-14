import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-white text-center">
      
      <div className="p-8 mt-10">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl mb-10">Oops! The page you're looking for doesn't exist.</p>
        
        <Link to="/" className="bg-blue-500 px-6 py-3 rounded-md hover:bg-blue-600 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
