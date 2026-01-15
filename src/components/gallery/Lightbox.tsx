import { Modal } from '../common/Modal';
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGalleryStore } from '../../store/galleryStore';

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

interface LightboxProps {
  isOpen: boolean;
  photo: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox = ({
  isOpen,
  photo,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) => {
  const likes = useGalleryStore(state => state.likes);
  const toggleLike = useGalleryStore(state => state.toggleLike);
  
  if (!photo) return null;

  const isLiked = likes[photo.id];

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleLike(photo.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
          
          {/* Navigation Buttons */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Info Section */}
        <div className="lg:w-80 flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{photo.title}</h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span className="capitalize px-3 py-1 bg-gray-100 rounded-full">{photo.category}</span>
            <span>{photo.date}</span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{photo.description}</p>

          {/* Image Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Dimensions:</span> {photo.width} × {photo.height}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleLike}
              className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg transition-colors font-medium"
            >
              <Heart
                size={20}
                className={isLiked ? 'fill-red-600' : ''}
              />
              <span>{photo.likes + (isLiked ? 1 : 0)} Likes</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-lg transition-colors font-medium">
              <MessageCircle size={20} />
              <span>Comment</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-600 py-3 rounded-lg transition-colors font-medium">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
