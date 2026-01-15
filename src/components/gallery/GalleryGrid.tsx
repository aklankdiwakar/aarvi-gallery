import { useState, useEffect } from 'react';
import { PhotoCard } from './PhotoCard';
import { Lightbox } from './Lightbox';
import { FilterBar } from './FilterBar';
import { useGalleryStore } from '../../store/galleryStore';
import photosData from '../../data/photos.json';

interface Photo {
  id: number;
  title: string;
  src: string;
  thumbnail: string;
  date: string;
  category: string;
  alt: string;
  width: number;
  height: number;
  likes: number;
  description: string;
}

export const Gallery = () => {
  const filteredPhotos = useGalleryStore(state => state.filteredPhotos);
  const setPhotos = useGalleryStore(state => state.setPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const photosPerPage = 12;

  // Initialize photos
  useEffect(() => {
    const photos = photosData.photos as Photo[];
    setPhotos(photos);
  }, [setPhotos]);

  // Handle infinite scroll
  useEffect(() => {
    const endIndex = page * photosPerPage;
    setDisplayedPhotos(filteredPhotos.slice(0, endIndex));
  }, [page, filteredPhotos]);

  // Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 500
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedPhotoIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto?.id);

  const handleNextPhoto = () => {
    if (selectedPhotoIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[selectedPhotoIndex + 1]);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex > 0) {
      setSelectedPhoto(filteredPhotos[selectedPhotoIndex - 1]);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Filter Bar Container - Centered */}
        <div className="text-center space-y-8 w-full pb-16 sm:pb-20 border-b-2 border-slate-200">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Filter Photos</h2>
          <div className="flex justify-center">
            <FilterBar />
          </div>
        </div>

        {/* Gallery Grid - Centered with max-w-7xl */}
        {filteredPhotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-2xl font-bold text-slate-900 mb-2">No photos found</p>
            <p className="text-slate-600">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max w-full">
              {displayedPhotos.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Loading indicator for more photos */}
        {displayedPhotos.length < filteredPhotos.length && (
          <div className="flex justify-center mt-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        )}

        {/* Lightbox */}
        <Lightbox
          isOpen={selectedPhoto !== null}
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={selectedPhotoIndex < filteredPhotos.length - 1 ? handleNextPhoto : undefined}
          onPrev={selectedPhotoIndex > 0 ? handlePrevPhoto : undefined}
        />
      </div>
    </div>
  );
};
