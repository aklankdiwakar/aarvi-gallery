import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useGalleryStore } from '../../store/galleryStore';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchPhotos = useGalleryStore(state => state.searchPhotos);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchPhotos(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 py-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3 min-w-fit">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">📸</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 hidden sm:block tracking-tight\">Aarvi's Gallery</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="flex items-center w-full border border-gray-300 rounded-xl bg-gray-50 hover:bg-white focus-within:bg-white focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/20 transition-all duration-200 px-4">
              <Search className="text-gray-400 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 ml-3 py-3 text-sm bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 md:hidden mt-3 border-t border-gray-200 pt-3">
            <div className="flex items-center w-full border border-gray-300 rounded-xl bg-gray-50 hover:bg-white focus-within:bg-white focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/20 transition-all duration-200 px-4">
              <Search className="text-gray-400 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 ml-3 py-3 text-sm bg-transparent focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
