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
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden min-h-[500px] lg:min-h-[600px]">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full max-h-[80vh] object-contain"
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
        <div className="lg:w-96 flex flex-col flex-shrink-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{photo.title}</h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <span className="capitalize px-4 py-2 bg-gray-100 rounded-full font-semibold">{photo.category}</span>
            <span className="font-medium">{photo.date}</span>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed text-base">{photo.description}</p>

          {/* Image Details */}
          <div className="bg-gray-50 rounded-lg p-5 mb-8 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Dimensions:</span> {photo.width} × {photo.height}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleLike}
              className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg transition-colors font-semibold text-base"
            >
              <Heart
                size={22}
                className={isLiked ? 'fill-red-600' : ''}
              />
              <span>{photo.likes + (isLiked ? 1 : 0)} Likes</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-lg transition-colors font-semibold text-base">
              <MessageCircle size={22} />
              <span>Comment</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-600 py-3 rounded-lg transition-colors font-semibold text-base">
              <Share2 size={22} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
