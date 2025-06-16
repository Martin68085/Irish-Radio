import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const radioStations = [
  // National Stations - Verified HTTPS Live Streams
  {
    id: 1,
    name: 'Today FM',
    description: 'Ireland\'s Hit Music Station',
    url: 'https://stream.audioxi.com/TD',
    logo: '📻',
    frequency: '100-102 FM',
    genre: 'Pop/Rock',
    category: 'National',
    location: 'Dublin',
    website: 'https://www.todayfm.com'
  },
  {
    id: 2,
    name: 'iRadio',
    description: 'The Soundtrack to Your Life',
    url: 'https://stream.audioxi.com/IRADIO',
    logo: '🎵',
    frequency: '105-107 FM',
    genre: 'Contemporary',
    category: 'National',
    location: 'Galway',
    website: 'https://www.iradio.ie'
  },
  {
    id: 3,
    name: 'RTÉ Radio 1',
    description: 'Ireland\'s National Radio',
    url: 'https://www.rte.ie/manifests/radio1.m3u8',
    logo: '🇮🇪',
    frequency: '88.2-90 FM',
    genre: 'News/Talk',
    category: 'National',
    location: 'Dublin',
    website: 'https://www.rte.ie/radio/radio1'
  },
  {
    id: 4,
    name: 'RTÉ 2FM',
    description: 'Ireland\'s Music & Entertainment Station',
    url: 'https://www.rte.ie/manifests/2fm.m3u8',
    logo: '🎶',
    frequency: '90.4-92.2 FM',
    genre: 'Music/Entertainment',
    category: 'National',
    location: 'Dublin',
    website: 'https://www.rte.ie/2fm'
  },
  {
    id: 5,
    name: 'RTÉ Lyric FM',
    description: 'Classical & Arts',
    url: 'https://www.rte.ie/manifests/lyric.m3u8',
    logo: '🎼',
    frequency: '96-99 FM',
    genre: 'Classical',
    category: 'National',
    location: 'Limerick',
    website: 'https://www.rte.ie/lyricfm'
  },
  {
    id: 6,
    name: 'RTÉ Raidió na Gaeltachta',
    description: 'Irish Language Radio',
    url: 'https://www.rte.ie/manifests/rnag.m3u8',
    logo: '🍀',
    frequency: '92-94 FM',
    genre: 'Irish Language',
    category: 'National',
    location: 'Galway',
    website: 'https://www.rte.ie/rnag'
  },
  {
    id: 7,
    name: 'RTÉ Gold',
    description: 'The Best Music from the 60s, 70s & 80s',
    url: 'https://www.rte.ie/manifests/gold.m3u8',
    logo: '🏆',
    frequency: 'DAB+',
    genre: 'Classic Hits',
    category: 'National',
    location: 'Dublin',
    website: 'https://www.rte.ie/gold'
  },
  {
    id: 8,
    name: 'RTÉ 2XM',
    description: 'Alternative Music',
    url: 'https://www.rte.ie/manifests/2xm.m3u8',
    logo: '🎸',
    frequency: 'DAB+',
    genre: 'Alternative Rock',
    category: 'National',
    location: 'Dublin',
    website: 'https://www.rte.ie/2xm'
  },
  {
    id: 9,
    name: 'Newstalk',
    description: 'Talk Radio',
    url: 'https://stream.audioxi.com/NT',
    logo: '💬',
    frequency: '106-108 FM',
    genre: 'News/Talk',
    category: 'National',
    location: 'Dublin',
    website: 'https://www.newstalk.com'
  },
  // Dublin Regional Stations
  {
    id: 10,
    name: '98FM',
    description: 'Dublin\'s Rock Radio',
    url: 'https://stream.audioxi.com/98FM',
    logo: '🎸',
    frequency: '98.1 FM',
    genre: 'Rock',
    category: 'Regional',
    location: 'Dublin',
    website: 'https://www.98fm.com'
  },
  {
    id: 11,
    name: 'FM104',
    description: 'The Music You Love',
    url: 'https://stream.audioxi.com/FM104',
    logo: '🎯',
    frequency: '104.4 FM',
    genre: 'Pop/Rock',
    category: 'Regional',
    location: 'Dublin',
    website: 'https://www.fm104.ie'
  },
  {
    id: 12,
    name: 'Q102',
    description: 'Dublin\'s Classic Hits',
    url: 'https://stream.audioxi.com/Q102',
    logo: '🎤',
    frequency: '102.2 FM',
    genre: 'Classic Hits',
    category: 'Regional',
    location: 'Dublin',
    website: 'https://www.q102.ie'
  },
  {
    id: 13,
    name: 'Radio Nova',
    description: 'Dublin\'s Alternative Rock',
    url: 'https://stream.audioxi.com/NOVA',
    logo: '⭐',
    frequency: '100.3 FM',
    genre: 'Alternative Rock',
    category: 'Regional',
    location: 'Dublin',
    website: 'https://www.nova.ie'
  },
  {
    id: 14,
    name: 'Spin 1038',
    description: 'Dublin\'s Hit Music Station',
    url: 'https://stream.audioxi.com/SPIN1038',
    logo: '🌪️',
    frequency: '103.8 FM',
    genre: 'Pop/Dance',
    category: 'Regional',
    location: 'Dublin',
    website: 'https://www.spin1038.com'
  },
  // Cork Regional Stations
  {
    id: 15,
    name: 'Cork\'s 96FM',
    description: 'Cork\'s Hit Music Station',
    url: 'https://stream.audioxi.com/96FM',
    logo: '🍀',
    frequency: '96.4 FM',
    genre: 'Pop/Rock',
    category: 'Regional',
    location: 'Cork',
    website: 'https://www.96fm.ie'
  },
  {
    id: 16,
    name: 'C103',
    description: 'Cork\'s Number One',
    url: 'https://stream.audioxi.com/C103',
    logo: '🎵',
    frequency: '103.2 FM',
    genre: 'Contemporary',
    category: 'Regional',
    location: 'Cork',
    website: 'https://www.c103.ie'
  },
  {
    id: 17,
    name: 'Red FM',
    description: 'Cork\'s Rock Station',
    url: 'https://stream.audioxi.com/REDFM',
    logo: '🔴',
    frequency: '104.5 FM',
    genre: 'Rock',
    category: 'Regional',
    location: 'Cork',
    website: 'https://www.redfm.ie'
  },
  // Regional Stations
  {
    id: 18,
    name: 'Midlands 103',
    description: 'Local Radio for the Midlands',
    url: 'https://stream.audioxi.com/MIDLANDS103',
    logo: '🏞️',
    frequency: '103 FM',
    genre: 'Local/Community',
    category: 'Regional',
    location: 'Midlands',
    website: 'https://www.midlands103.com'
  },
  {
    id: 19,
    name: 'Galway Bay FM',
    description: 'Galway\'s Local Radio',
    url: 'https://stream.audioxi.com/GALWAYBAY',
    logo: '🌊',
    frequency: '95.8 FM',
    genre: 'Local/Community',
    category: 'Regional',
    location: 'Galway',
    website: 'https://galwaybayfm.ie'
  },
  {
    id: 20,
    name: 'Beat 102-103',
    description: 'South East Radio',
    url: 'https://stream.audioxi.com/BEAT',
    logo: '🥁',
    frequency: '102-103 FM',
    genre: 'Contemporary',
    category: 'Regional',
    location: 'Waterford',
    website: 'https://beat102103.com'
  }
];

function App() {
  // Core State
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  // History State
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Sleep Timer State
  const [sleepTimer, setSleepTimer] = useState(0);
  const [sleepTimerActive, setSleepTimerActive] = useState(false);
  
  // Equalizer State
  const [equalizer, setEqualizer] = useState({
    bass: 0,
    treble: 0
  });
  
  // Now Playing State
  const [nowPlaying, setNowPlaying] = useState({
    title: '',
    artist: '',
    show: ''
  });
  
  const audioRef = useRef(null);
  const sleepTimerRef = useRef(null);

  // Categories
  const categories = ['All', 'National', 'Regional', 'Local'];

  // Filter stations
  const filteredStations = radioStations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || station.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  // Favorites Functions
  const toggleFavorite = (stationId) => {
    const newFavorites = favorites.includes(stationId)
      ? favorites.filter(id => id !== stationId)
      : [...favorites, stationId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (stationId) => favorites.includes(stationId);

  // History Functions
  const addToHistory = (station) => {
    const newHistory = [
      { ...station, playedAt: new Date().toISOString() },
      ...history.filter(h => h.id !== station.id)
    ].slice(0, 10); // Keep only last 10
    
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  // Sleep Timer Functions
  const setSleepTimerMinutes = (minutes) => {
    const mins = parseInt(minutes);
    setSleepTimer(mins);
    
    if (sleepTimerRef.current) {
      clearTimeout(sleepTimerRef.current);
    }
    
    if (mins > 0) {
      setSleepTimerActive(true);
      sleepTimerRef.current = setTimeout(() => {
        pauseStation();
        setSleepTimerActive(false);
        setSleepTimer(0);
        alert('⏰ Sleep timer has stopped the radio');
      }, mins * 60 * 1000);
    } else {
      setSleepTimerActive(false);
    }
  };

  // Equalizer Functions
  const updateEqualizer = (type, value) => {
    setEqualizer(prev => ({ ...prev, [type]: value }));
    // In a real app, you'd apply audio filters here
  };

  // Share Function
  const shareStation = (station) => {
    const shareText = `🎵 Listen to ${station.name} - ${station.description} (${station.frequency}) at ${window.location.href}`;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ text: shareText })) {
      navigator.share({
        title: `🇮🇪 ${station.name} - Irish Radio Live`,
        text: `${station.description} - ${station.frequency}`,
        url: window.location.href
      }).catch(err => {
        console.log('Error sharing:', err);
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('📋 Station link copied to clipboard!');
      }).catch(() => {
        fallbackCopyTextToClipboard(text);
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      alert('📋 Station link copied to clipboard!');
    } catch (err) {
      alert('❌ Unable to copy to clipboard. Please share manually.');
    }
    document.body.removeChild(textArea);
  };

  // Mock Now Playing Info (in real app, you'd fetch from API)
  const updateNowPlaying = (station) => {
    const mockData = {
      'Today FM': { title: 'Current Hit Song', artist: 'Popular Artist', show: 'The Breakfast Show' },
      'RTÉ 2FM': { title: 'Latest Track', artist: 'Irish Artist', show: '2FM Breakfast' },
      'iRadio': { title: 'Top 40 Hit', artist: 'Chart Artist', show: 'Morning Show' }
    };
    
    setNowPlaying(mockData[station.name] || { title: 'Live', artist: '', show: station.description });
  };

  const playStation = async (station) => {
    try {
      setIsLoading(true);
      setError('');
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      setCurrentStation(station);
      addToHistory(station);
      updateNowPlaying(station);
      
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.crossOrigin = "anonymous";
          audioRef.current.src = station.url;
          audioRef.current.volume = volume;
          
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
                setError('');
              })
              .catch((err) => {
                console.error('Playback error:', err);
                let errorMessage = `Unable to play ${station.name}.`;
                
                if (err.name === 'NotSupportedError') {
                  errorMessage += ' This stream format may not be supported by your browser.';
                } else if (err.name === 'NotAllowedError') {
                  errorMessage += ' Please click the play button to start audio.';
                } else {
                  errorMessage += ' The station might be temporarily unavailable.';
                }
                
                setError(errorMessage);
                setIsLoading(false);
                setIsPlaying(false);
              });
          }
        }
      }, 200);
      
    } catch (err) {
      console.error('Error playing station:', err);
      setError(`Failed to connect to ${station.name}. Please try another station.`);
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

  // Cleanup sleep timer on unmount
  useEffect(() => {
    return () => {
      if (sleepTimerRef.current) {
        clearTimeout(sleepTimerRef.current);
      }
    };
  }, []);

  // Audio event listeners with better error handling
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleError = (e) => {
        console.error('Audio error:', e);
        const error = e.target.error;
        let errorMessage = `Failed to load ${currentStation?.name || 'station'}`;
        
        if (error) {
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              errorMessage += ' - Playback was aborted';
              break;
            case error.MEDIA_ERR_NETWORK:
              errorMessage += ' - Network error occurred';
              break;
            case error.MEDIA_ERR_DECODE:
              errorMessage += ' - Audio format not supported';
              break;
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage += ' - Stream not available';
              break;
            default:
              errorMessage += ' - Unknown error occurred';
          }
        }
        
        setError(errorMessage + '. Please try another station.');
        setIsLoading(false);
        setIsPlaying(false);
      };
      
      const handleLoadStart = () => {
        setIsLoading(true);
        setError('');
      };
      
      const handleCanPlay = () => {
        setIsLoading(false);
      };

      const handleLoadedData = () => {
        setIsLoading(false);
        setError('');
      };

      audio.addEventListener('error', handleError);
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('loadeddata', handleLoadedData);

      return () => {
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [currentStation]);

  const favoriteStations = radioStations.filter(station => favorites.includes(station.id));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-green-50 to-emerald-100'
    }`}>
      {/* Audio element */}
      <audio ref={audioRef} preload="none" />
      
      {/* Header */}
      <header className={`shadow-lg border-b-4 border-green-500 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🇮🇪</span>
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Irish Radio Live
                </h1>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  All your favorite Irish radio stations in one place
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300'
                  }`}
                />
                <span className={`absolute right-3 top-2.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  🔍
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Current Player */}
      {currentStation && (
        <div className={`shadow-lg border-t-4 border-green-500 sticky top-0 z-50 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{currentStation.logo}</div>
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentStation.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {nowPlaying.title && nowPlaying.artist 
                      ? `${nowPlaying.title} - ${nowPlaying.artist}`
                      : currentStation.description
                    }
                  </p>
                  {nowPlaying.show && (
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {nowPlaying.show}
                    </p>
                  )}
                </div>
                {isLoading && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm">Loading...</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(currentStation.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFavorite(currentStation.id)
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {isFavorite(currentStation.id) ? '❤️' : '🤍'}
                </button>
                
                {/* Share Button */}
                <button
                  onClick={() => shareStation(currentStation)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  📤
                </button>
                
                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>🔊</span>
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

      {/* Controls Panel */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Sleep Timer */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Sleep Timer:
              </span>
              <select
                value={sleepTimer}
                onChange={(e) => setSleepTimerMinutes(parseInt(e.target.value))}
                className={`px-3 py-1 rounded border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              >
                <option value={0}>Off</option>
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
              {sleepTimerActive && (
                <span className="text-green-600 text-sm">⏰ Active</span>
              )}
            </div>
            
            {/* Equalizer */}
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                EQ:
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-xs">Bass</span>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={equalizer.bass}
                  onChange={(e) => updateEqualizer('bass', parseInt(e.target.value))}
                  className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs">Treble</span>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={equalizer.treble}
                  onChange={(e) => updateEqualizer('treble', parseInt(e.target.value))}
                  className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Favorites */}
          {favoriteStations.length > 0 && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ❤️ Your Favorites
              </h3>
              <div className="space-y-2">
                {favoriteStations.slice(0, 3).map(station => (
                  <div
                    key={station.id}
                    onClick={() => playStation(station)}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{station.logo}</span>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {station.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {station.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Recent History */}
          {history.length > 0 && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                🕒 Recently Played
              </h3>
              <div className="space-y-2">
                {history.slice(0, 3).map(station => (
                  <div
                    key={station.id}
                    onClick={() => playStation(station)}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{station.logo}</span>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {station.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(station.playedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Stats */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              📊 Quick Stats
            </h3>
            <div className="space-y-3">
              <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>Total Stations:</span>
                <span className="font-bold text-green-600">{radioStations.length}</span>
              </div>
              <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>Favorites:</span>
                <span className="font-bold text-red-500">{favorites.length}</span>
              </div>
              <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>History:</span>
                <span className="font-bold text-blue-500">{history.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stations Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedCategory === 'All' ? 'All Stations' : `${selectedCategory} Stations`}
              </h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {filteredStations.length} stations available
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStations.map((station) => (
              <div
                key={station.id}
                className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  currentStation?.id === station.id 
                    ? 'border-green-500 bg-green-50' 
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-800 hover:border-green-400'
                      : 'border-transparent bg-white hover:border-green-200'
                }`}
                onClick={() => playStation(station)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{station.logo}</div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(station.id);
                        }}
                        className="text-xl hover:scale-110 transition-transform"
                      >
                        {isFavorite(station.id) ? '❤️' : '🤍'}
                      </button>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {station.frequency}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {station.name}
                  </h3>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {station.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-green-100 text-green-700'
                    }`}>
                      {station.genre}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      📍 {station.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      station.category === 'National' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {station.category}
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
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No stations found
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🇮🇪</span>
            <h3 className="text-xl font-bold">Irish Radio Live</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Your gateway to all Irish radio stations. Stream live from anywhere in the world.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-6">
            <div>
              <h4 className="font-bold text-white mb-2">National</h4>
              <p>RTÉ Radio 1</p>
              <p>RTÉ 2FM</p>
              <p>Today FM</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Dublin</h4>
              <p>98FM</p>
              <p>FM104</p>
              <p>Spin 1038</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Cork</h4>
              <p>96FM</p>
              <p>C103</p>
              <p>Red FM</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Regional</h4>
              <p>iRadio</p>
              <p>Galway Bay FM</p>
              <p>Midlands 103</p>
            </div>
          </div>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>🎵 {radioStations.length} Stations</span>
            <span>🇮🇪 All Ireland</span>
            <span>📱 Mobile Friendly</span>
            <span>🔊 HD Quality</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;