import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const radioStations = [
  {
    id: 1,
    name: 'Today FM',
    description: 'Ireland\'s Hit Music Station',
    url: 'http://15833.live.streamtheworld.com:3690/TODAY_FM_SC',
    logo: '📻',
    frequency: '100-102 FM',
    genre: 'Pop/Rock'
  },
  {
    id: 2,
    name: 'iRadio',
    description: 'The Soundtrack to Your Life',
    url: 'http://iradio.iceca.st/i105107',
    logo: '🎵',
    frequency: '105-107 FM',
    genre: 'Contemporary'
  },
  {
    id: 3,
    name: 'Midlands 103',
    description: 'Local Radio for the Midlands',
    url: 'http://edge-audio-02-gos1.sharp-stream.com:80/midlands103.mp3',
    logo: '🏞️',
    frequency: '103 FM',
    genre: 'Local/Community'
  },
  {
    id: 4,
    name: 'RTÉ Radio 1',
    description: 'Ireland\'s National Radio',
    url: 'https://www.rte.ie/manifests/radio1.m3u8',
    logo: '🇮🇪',
    frequency: '88.2-90 FM',
    genre: 'News/Talk'
  },
  {
    id: 5,
    name: 'RTÉ 2FM',
    description: 'Ireland\'s Music & Entertainment Station',
    url: 'https://www.rte.ie/manifests/2fm.m3u8',
    logo: '🎶',
    frequency: '90.4-92.2 FM',
    genre: 'Music/Entertainment'
  },
  {
    id: 6,
    name: 'RTÉ Lyric FM',
    description: 'Classical & Arts',
    url: 'https://www.rte.ie/manifests/lyric.m3u8',
    logo: '🎼',
    frequency: '96-99 FM',
    genre: 'Classical'
  },
  {
    id: 7,
    name: 'Spin 1038',
    description: 'Dublin\'s Hit Music Station',
    url: 'https://audiocdn.rte.ie/live/spin1038.m3u8',
    logo: '🌪️',
    frequency: '103.8 FM',
    genre: 'Pop/Dance'
  },
  {
    id: 8,
    name: 'Newstalk',
    description: 'Talk Radio',
    url: 'https://stream.audioxi.com/NT',
    logo: '💬',
    frequency: '106-108 FM',
    genre: 'News/Talk'
  }
];

function App() {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const filteredStations = radioStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playStation = async (station) => {
    try {
      setIsLoading(true);
      setError('');
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      setCurrentStation(station);
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = station.url;
          audioRef.current.volume = volume;
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            })
            .catch((err) => {
              console.error('Playback error:', err);
              setError(`Failed to play ${station.name}. This station might not be available right now.`);
              setIsLoading(false);
              setIsPlaying(false);
            });
        }
      }, 100);
      
    } catch (err) {
      console.error('Error playing station:', err);
      setError(`Failed to play ${station.name}`);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const pauseStation = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleError = () => {
        setError(`Failed to load ${currentStation?.name || 'station'}`);
        setIsLoading(false);
        setIsPlaying(false);
      };
      
      const handleLoadStart = () => {
        setIsLoading(true);
      };
      
      const handleCanPlay = () => {
        setIsLoading(false);
      };

      audio.addEventListener('error', handleError);
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('canplay', handleCanPlay);

      return () => {
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [currentStation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Audio element */}
      <audio ref={audioRef} preload="none" />
      
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🇮🇪</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Irish Radio Live</h1>
                <p className="text-gray-600">All your favorite Irish radio stations in one place</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div 
          className="absolute inset-0 bg-black opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586175896122-0f36806e7dce)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Stream Irish Radio Live</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Listen to Today FM, iRadio, Midlands 103, RTÉ and more - all your favorite Irish radio stations streaming live
          </p>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <p className="text-lg font-semibold">
              {filteredStations.length} Irish Radio Stations Available
            </p>
          </div>
        </div>
      </section>

      {/* Current Player */}
      {currentStation && (
        <div className="bg-white shadow-lg border-t-4 border-green-500 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{currentStation.logo}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{currentStation.name}</h3>
                  <p className="text-sm text-gray-600">{currentStation.description}</p>
                </div>
                {isLoading && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm">Loading...</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                {/* Play/Pause Button */}
                <button
                  onClick={isPlaying ? pauseStation : () => playStation(currentStation)}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stations Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Station</h2>
          <p className="text-gray-600">Click on any station to start listening live</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                currentStation?.id === station.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-transparent hover:border-green-200'
              }`}
              onClick={() => playStation(station)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{station.logo}</div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {station.frequency}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{station.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{station.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {station.genre}
                  </span>
                  
                  {currentStation?.id === station.id && (
                    <div className="flex items-center space-x-1">
                      {isPlaying ? (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-green-500 rounded animate-pulse"></div>
                          <div className="w-1 h-3 bg-green-500 rounded animate-pulse delay-75"></div>
                          <div className="w-1 h-5 bg-green-500 rounded animate-pulse delay-150"></div>
                        </div>
                      ) : (
                        <span className="text-green-600 text-sm">Selected</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📻</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No stations found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🇮🇪</span>
            <h3 className="text-xl font-bold">Irish Radio Live</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Your gateway to all Irish radio stations. Stream live from anywhere in the world.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>• Today FM</span>
            <span>• iRadio</span>
            <span>• Midlands 103</span>
            <span>• RTÉ Radio</span>
            <span>• And more...</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;