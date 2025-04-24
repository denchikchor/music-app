🎵 Music App
A modern, responsive web application for managing and playing your music collection. Built with React, TypeScript, Vite, and Vitest, it offers features like track uploading, filtering, sorting, playback with waveform visualization, bulk actions, and comprehensive test coverage.

🚀 Features
Track Management
Create, edit, and delete tracks with metadata (title, artist, album, genres, cover image).

File Uploads
Upload or remove audio files (MP3/WAV) per track, with size/type validation.

Custom Audio Player
Play/pause, seek, and visualize waveform in real time.

Filtering & Sorting
Filter by artist or genre and sort by title, artist, or genre.

Pagination
Browse tracks in pages (configurable page size), with “go to first page” logic on search/filter changes.

Bulk Actions
Toggle bulk-select mode to choose multiple tracks and delete them in one click.

Optimistic Updates
UI updates immediately when deleting tracks, before server confirmation.

Responsive Design
Adapts to desktop and mobile layouts.

Keyboard & Accessibility
Close modals with ESC or click outside; form fields support autofill; ARIA attributes on disabled controls.

Testing
Unit and integration tests with Vitest, Testing Library, and DOM matchers.

🏁 Getting Started
Prerequisites
Node.js ≥14

npm ≥6

Installation
Clone the repo
git clone https://github.com/denchikchor/music-app.git
cd music-app

Install dependencies
npm install

ini

VITE_API_BASE=https://your.api.endpoint

Start development server
npm start
Visit http://localhost:3000

Build & Deployment
Build for production
npm run build
Output is in dist/.

Preview production build
npm run preview

🧩 Available Scripts
npm start — start Vite dev server

npm run build — bundle for production

npm run preview — locally preview production build

npm run test — run all tests in watch mode

npm run format — run Prettier on all source files

📂 Project Structure

music-app/
├── public/ # Static assets & index.html
├── src/
│ ├── api/ # HTTP clients & endpoints (axios)
│ ├── assets/ # Images, SVGs, icons
│ ├── components/ # Reusable UI components
│ │ ├── Header/ # App header & search
│ │ ├── TrackList/ # TrackList + subcomponents
│ │ ├── TrackItem/ # TrackItemView, Cover, Info, Player, Actions
│ │ ├── CustomAudioPlayer/ # Audio player + Canvas visualization
│ │ ├── TrackUpload/ # File upload component
│ │ ├── TrackForm/ # Create/Edit form + validation
│ │ ├── UI/ # Buttons, Dialogs, ToastMessage, etc.
│ │ └── … # other shared components
│ ├── features/ # Redux slices & async thunks
│ │ ├── tracks/ # trackSlice, types
│ │ └── genres/ # genresSlice, types
│ ├── hooks/ # Custom hooks (useDebounce, useTracks, useTrackFiltering, pagination...)
│ ├── constants/ # Shared constants (e.g. PAGE_SIZE)
│ ├── store.ts # Redux store configuration
│ ├── App.tsx # Root component
│ ├── main.tsx # Entry point
│ └── vite-env.d.ts # Vite + SVG + CSS module typings
├── tests/ # Test utilities (test-utils.tsx)
├── .env # Environment variables
├── vite.config.ts # Vite configuration
├── tsconfig.json # TypeScript config
├── package.json # NPM scripts & dependencies
└── README.md # You are here
🧪 Testing
This project uses Vitest + React Testing Library:

Components are tested in isolation with mocked dependencies (e.g. CustomAudioPlayer, TrackUpload).

Data-testids ensure selectors for DOM queries.

To run tests:

npm test
Write tests next to components (ComponentName.test.tsx) or in a centralized tests/ folder for utilities.

🤝 Contributing
Fork & clone

Create feature branch: git checkout -b feature/my-feature

Install & develop

Run tests & ensure all pass

Thank you for using Music App! Enjoy managing and playing your tracks with ease.
