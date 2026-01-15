import { Heart, MessageCircle, Share2 } from 'lucide-react';
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

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
  const likes = useGalleryStore(state => state.likes);
  const toggleLike = useGalleryStore(state => state.toggleLike);
  const isLiked = likes[photo.id];

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleLike(photo.id);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-200 h-96">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
          <p className="text-white font-bold text-xl">{photo.title}</p>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-black text-lg text-slate-900 line-clamp-1">{photo.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{photo.description}</p>
        </div>
        
        {/* Category Badge & Date */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="inline-block px-4 py-2 text-xs font-black bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full capitalize shadow-md">
            {photo.category.substring(0, 3).toUpperCase()}
          </span>
          <span className="text-xs text-slate-500 font-bold">{photo.date}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-around pt-4 border-t-2 border-slate-100 gap-2">
          <button
            onClick={handleLike}
            className="flex flex-col items-center text-slate-600 hover:text-red-500 transition-colors py-3 flex-1 hover:bg-slate-50 rounded-lg"
          >
            <Heart
              size={20}
              className={isLiked ? 'fill-red-500 text-red-500' : ''}
            />
            <span className="text-xs font-black mt-1">{photo.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center justify-center text-slate-600 hover:text-blue-500 transition-colors py-3 flex-1 hover:bg-slate-50 rounded-lg">
            <MessageCircle size={20} />
          </button>
          <button className="flex items-center justify-center text-slate-600 hover:text-emerald-500 transition-colors py-3 flex-1 hover:bg-slate-50 rounded-lg">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
