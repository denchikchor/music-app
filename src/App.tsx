import React, { useState } from 'react';

import TrackCreateModal from './components/TrackCreateModal/TrackCreateModal';
import TrackList from './components/TrackList/TrackList';
import TrackEditModal from './components/TrackEditModal/TrackEditModal';
import { Track } from './features/tracks/types';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header
        onCreate={() => setModalOpen(true)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="content">
        <TrackList onEditTrack={(track) => setEditingTrack(track)} searchQuery={searchQuery} />
      </main>

      {isModalOpen && <TrackCreateModal onClose={() => setModalOpen(false)} />}
      {editingTrack && (
        <TrackEditModal track={editingTrack} onClose={() => setEditingTrack(null)} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
