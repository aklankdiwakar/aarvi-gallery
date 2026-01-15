# 📸 Aarvi's Gallery - Photo Showcase Website

A beautiful, modern static photo gallery website built with React, TypeScript, Vite, and Tailwind CSS. Perfect for showcasing precious moments and memories.

## ✨ Features

### MVP (Current)
- ✅ **Responsive Photo Gallery** - Beautiful masonry grid layout
- ✅ **Infinite Scroll** - Auto-load more photos as you scroll
- ✅ **Lightbox Modal** - Full-screen photo viewer with navigation
- ✅ **Category Filtering** - Filter photos by category
- ✅ **Search Functionality** - Search photos by title or description
- ✅ **Like System** - Like your favorite photos
- ✅ **Beautiful UI** - Dark mode optimized design with smooth animations
- ✅ **Mobile Responsive** - Fully responsive on all devices
- ✅ **Fast Performance** - Optimized for <2s page load time

### Phase 2 (Coming Soon)
- Comments on photos
- User profile customization
- Photo sharing buttons
- Collections/Albums
- Stories/Timeline view

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 (Ultra-fast builds)
- **Styling**: Tailwind CSS 4 with PostCSS
- **State Management**: Zustand (lightweight & fast)
- **Icons**: Lucide React
- **Deployment**: Vercel (optimized for production)

## 📦 Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Spinner.tsx
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   ├── gallery/             # Gallery specific components
│   │   ├── GalleryGrid.tsx  # Main gallery component
│   │   ├── PhotoCard.tsx    # Individual photo card
│   │   ├── Lightbox.tsx     # Full-screen photo viewer
│   │   └── FilterBar.tsx    # Category filters
│   └── sections/            # Page sections
│       └── HeroSection.tsx
├── pages/                   # Page components
├── hooks/                   # Custom React hooks
├── store/                   # Zustand state management
│   └── galleryStore.ts      # Gallery store
├── data/                    # Mock data
│   └── photos.json          # Photo metadata
├── styles/                  # Global styles
│   └── globals.css
├── utils/                   # Utility functions
├── App.tsx                  # Root component
└── main.tsx                 # Entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+

### Installation

1. **Navigate to the project**
   ```bash
   cd /path/to/AarviVSInsight
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173/`

4. **Build for production**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` folder

## 📸 Adding Your Photos

### Step 1: Add Photos to Public Folder
Place your photos in: `public/images/gallery/`

### Step 2: Update Photo Metadata
Edit `src/data/photos.json` with your photos:

```json
{
  "photos": [
    {
      "id": 1,
      "title": "Photo Title",
      "src": "/images/gallery/photo-1.jpg",
      "thumbnail": "/images/gallery/photo-1-thumb.jpg",
      "date": "2026-01-15",
      "category": "outdoor",
      "alt": "Photo description",
      "width": 1200,
      "height": 800,
      "likes": 100,
      "description": "A detailed description of the photo"
    }
  ]
}
```

### Step 3: Optimize Images (Optional)
For better performance, optimize images before uploading:

```bash
# Use ImageMagick or online tools
convert photo.jpg -quality 80 photo-optimized.jpg
```

## 🎨 Customization

### Change Site Title & Branding
Edit `src/components/sections/HeroSection.tsx` and `src/components/layout/Header.tsx`

### Update Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      'primary': '#000000',
      'secondary': '#F0F0F0',
    },
  },
}
```

### Modify Categories
Edit `src/components/gallery/FilterBar.tsx`:
```tsx
const categories = ['outdoor', 'indoor', 'special-moments'];
```

## 📱 Responsive Design

- **Mobile** (320px+) - Single column with optimized touch targets
- **Tablet** (640px+) - Two column grid
- **Desktop** (1024px+) - Three column grid with enhanced features

## ⚡ Performance

- **Build Size**: ~27KB CSS + 214KB JS (gzipped: 5.5KB + 66KB)
- **Page Load**: <2 seconds (optimized images recommended)
- **Lighthouse Score**: 90+
- **Lazy Loading**: Images load on demand
- **CDN Ready**: Works perfectly with Vercel, Netlify, or CloudFront

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

The `vercel.json` file is already configured for optimal deployment.

### Deploy to Netlify

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag and drop the `dist/` folder to Netlify
   - Or connect your GitHub repository

### Deploy to GitHub Pages

1. **Build**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   npm install -D gh-pages
   npm run build && npx gh-pages -d dist
   ```

## 🔒 Security & Privacy

- ✅ No tracking or analytics by default
- ✅ No external API calls (all static)
- ✅ HTTPS recommended for production
- ✅ Can be password protected if hosted privately
- ✅ SEO optimized with meta tags

## 📊 Page Speed Optimization Tips

1. **Compress Images**
   - Use JPEG at 80% quality
   - Create WebP versions for modern browsers
   - Generate thumbnails (300x300px)

2. **Use Responsive Images**
   ```html
   <img srcset="small.jpg 640w, large.jpg 1280w" sizes="100vw" />
   ```

3. **Enable CDN**
   - Vercel CDN included
   - Consider Cloudflare for extra performance

4. **Lazy Load Images**
   - Already implemented with `loading="lazy"`

## 🎯 Future Enhancements

- [ ] Video support
- [ ] Comments system
- [ ] User authentication
- [ ] Photo upload dashboard
- [ ] Analytics dashboard
- [ ] Advanced search with tags
- [ ] Dark/Light mode toggle
- [ ] Social media integration
- [ ] Email newsletter
- [ ] API backend integration

## 🛠️ Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## 📝 Environment Variables

Not required for static site, but if you add backend features:

```
.env.local
VITE_API_URL=https://your-api.com
VITE_ANALYTICS_ID=your-analytics-id
```

## 🤝 Contributing

This is a personal family photo gallery. For improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

## 🆘 Troubleshooting

### Build fails with CSS error
```bash
npm install -D @tailwindcss/postcss
npm run build
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Images not showing in production
- Ensure image paths are relative: `/images/gallery/photo.jpg`
- Check that `public/images/gallery/` folder exists
- Verify file names match in `photos.json`

## 📞 Support

For issues or questions:
1. Check the [Vite docs](https://vitejs.dev)
2. Review [React documentation](https://react.dev)
3. Check browser console for errors
4. Verify image paths and file names

---

**Made with ❤️ for precious moments**
