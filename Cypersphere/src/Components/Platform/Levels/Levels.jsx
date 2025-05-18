import React, { useState, useEffect } from 'react';
import Level from '../Level/Level';

function Levels({ initialLevels = null }) {
  const [levels, setLevels] = useState(initialLevels || []);
  const [loading, setLoading] = useState(initialLevels ? false : true);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Function to refresh the levels list
  const refreshLevels = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    // Don't fetch if initialLevels are provided
    if (initialLevels) return;

    const fetchLevels = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('auth-token');

        const response = await fetch('https://cybersphere7.runasp.net/api/Level/get-all-levels', {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });

        if (!response.ok) {
          let errorMessage = 'Failed to fetch levels';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            errorMessage = `${response.status}: ${response.statusText || errorMessage}`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setLevels(data);
      } catch (err) {
        console.error('Error fetching levels:', err);
        if (err.message.includes('blocked by CORS policy')) {
          setError('CORS error: The API server is not allowing requests from this origin. Please contact your administrator.');
        } else {
          setError(err.message || 'An error occurred while fetching levels');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, [refreshTrigger, initialLevels]); // include initialLevels in deps just for safety

  return (
    <div className="text-white mt-[100px]">
      <div className="mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-900 text-red-200 rounded-lg">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {(() => {
              const displayedLevels = initialLevels
                ? levels
                : levels.filter(level => level.parentLevelId === 0);
              
              // Find the Essentials level
              const essentialsLevel = displayedLevels.find(level => level.title === "Essentials");
              // Get all other levels
              const otherLevels = displayedLevels.filter(level => level.title !== "Essentials");

              return (
                <>
                  {/* Display Essentials level in a centered full-width row if it exists */}
                  {essentialsLevel && (
                    <div className="w-full flex justify-center">
                      <Level key={essentialsLevel.id} data={essentialsLevel} />
                    </div>
                  )}
                  
                  {/* Display all other levels in a grid */}
                  {otherLevels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                      {otherLevels.map((level) => (
                        <Level key={level.id} data={level} />
                      ))}
                    </div>
                  ) : (
                    !essentialsLevel && (
                      <div className="px-6 py-4 text-center text-sm text-gray-400">
                        No levels found
                      </div>
                    )
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Levels;