// Filter bar component
import { useGalleryStore } from '../../store/galleryStore';

export const FilterBar = () => {
  const selectedCategory = useGalleryStore(state => state.selectedCategory);
  const filterByCategory = useGalleryStore(state => state.filterByCategory);
  
  const categories = ['outdoor', 'indoor', 'special-moments'];

  return (
    <div className="flex justify-center items-center gap-4 flex-wrap">
      <button
        onClick={() => filterByCategory(null)}
        className={`px-7 py-3 rounded-full font-black text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
          selectedCategory === null
            ? 'bg-slate-900 text-white shadow-lg'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => filterByCategory(category)}
          className={`px-7 py-3 rounded-full font-black text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 capitalize ${
            selectedCategory === category
              ? 'bg-slate-900 text-white shadow-lg'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {category.replace('-', ' ')}
        </button>
      ))}
    </div>
  );
};
