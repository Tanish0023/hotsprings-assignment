import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full md:mt-20 flex flex-col justify-center items-center text-white text-center" >
      <div className="p-15">
        <h1 className="text-6xl font-bold mb-4">Welcome to Event Finder</h1>
        <p className="text-2xl mb-10">Discover and track your favorite events with ease.</p>
        
        <div className="flex items-center justify-center gap-6">
          <Link to="/search" className="bg-blue-500 px-6 sm:py-3 rounded-md hover:bg-blue-600 transition">
            Find Events
          </Link>
          <Link to="/favorites" className="bg-gray-500 px-6 sm:py-3 rounded-md hover:bg-gray-600 transition">
            View Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
