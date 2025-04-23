import React, { useState } from 'react';

import TrackCreateModal from './components/TrackCreateModal/TrackCreateModal';
import TrackList from './components/TrackList/TrackList';
import TrackEditModal from './components/TrackEditModal/TrackEditModal';
import { Track } from './features/tracks/types';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';
import { useAppDispatch } from './hooks/redux-hook';
import { deleteTrack } from './features/tracks/trackSlice';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [forceGoToFirstPage, setForceGoToFirstPage] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTrack(id));
  };

  return (
    <>
      <Header
        onCreate={() => setModalOpen(true)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="content">
        <TrackList
          onEditTrack={(track) => setEditingTrack(track)}
          searchQuery={searchQuery}
          forceGoToFirstPage={forceGoToFirstPage}
          setForceGoToFirstPage={setForceGoToFirstPage}
        />
      </main>

      {isModalOpen && (
        <TrackCreateModal
          onClose={() => setModalOpen(false)}
          onCreated={() => setForceGoToFirstPage(true)}
        />
      )}
      {editingTrack && (
        <TrackEditModal
          onDelete={handleDelete}
          track={editingTrack}
          onClose={() => setEditingTrack(null)}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
