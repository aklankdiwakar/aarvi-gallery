import { create } from 'zustand';

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

interface GalleryStore {
  photos: Photo[];
  filteredPhotos: Photo[];
  selectedCategory: string | null;
  selectedPhoto: Photo | null;
  likes: { [key: number]: boolean };
  
  setPhotos: (photos: Photo[]) => void;
  setFilteredPhotos: (photos: Photo[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedPhoto: (photo: Photo | null) => void;
  toggleLike: (photoId: number) => void;
  filterByCategory: (category: string | null) => void;
  searchPhotos: (query: string) => void;
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  photos: [],
  filteredPhotos: [],
  selectedCategory: null,
  selectedPhoto: null,
  likes: {},

  setPhotos: (photos) => set({ photos, filteredPhotos: photos }),
  
  setFilteredPhotos: (photos) => set({ filteredPhotos: photos }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
  
  toggleLike: (photoId) => set((state) => ({
    likes: {
      ...state.likes,
      [photoId]: !state.likes[photoId],
    },
  })),
  
  filterByCategory: (category) => {
    const state = get();
    set({ selectedCategory: category });
    
    if (!category) {
      set({ filteredPhotos: state.photos });
      return;
    }
    
    const filtered = state.photos.filter(photo => photo.category === category);
    set({ filteredPhotos: filtered });
  },
  
  searchPhotos: (query) => {
    const state = get();
    if (!query.trim()) {
      set({ filteredPhotos: state.photos });
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = state.photos.filter(photo =>
      photo.title.toLowerCase().includes(lowerQuery) ||
      photo.description.toLowerCase().includes(lowerQuery)
    );
    set({ filteredPhotos: filtered });
  },
}));
