import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Welcome to my website
        </h1>

        <div className="flex flex-col gap-4">
          <Link href="occasion" className="w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Occasion
            </button>
          </Link>

          <Link href="enes-ml-lab" className="w-full">
            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Enes Machine Learning Lab
            </button>
          </Link>

          <Link href="masters" className="w-full">
            <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 rounded-lg border-2 border-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg">
              Masters Tracker
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
