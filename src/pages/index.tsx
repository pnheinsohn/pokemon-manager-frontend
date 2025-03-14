import React from 'react';

function HomePage(): React.ReactNode {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-6xl">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome to Pokemon Manager</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
              <p className="text-gray-600 mb-4">View reports and statistics about Pokemon in the system.</p>
              <a href="/dashboard" className="text-primary hover:text-primary-dark">
                View Dashboard →
              </a>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Base Pokemons</h2>
              <p className="text-gray-600 mb-4">View and manage the base Pokemon database, including stats and types.</p>
              <a href="/base-pokemons" className="text-primary hover:text-primary-dark">
                View Base Pokemons →
              </a>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Pokemons</h2>
              <p className="text-gray-600 mb-4">Manage your individual Pokemon instances with unique stats and levels.</p>
              <a href="/pokemons" className="text-primary hover:text-primary-dark">
                View Pokemons →
              </a>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Base Pokemon Types</h2>
              <p className="text-gray-600 mb-4">Manage the different types of Pokemon in the system.</p>
              <a href="/base-pokemon-types" className="text-primary hover:text-primary-dark">
                View Base Pokemon Types →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
