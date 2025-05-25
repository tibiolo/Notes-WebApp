import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios.js';
import Modal from 'react-modal';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';

const Home = () => {
  const [openAddEditNotes, setOpenAddEditNotes] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await axios.get('api/users/notes');

      setNotes(response.data);
    } catch (err) {
      console.error('Error fetching notes: ', err);
    }
  };

  const deleteNotes = async (note) => {
    const { note_id } = note;

    try {
      await axios.delete('/api/users/notes', { data: { note_id } });
      fetchNotes();
    } catch (err) {
      console.log('Error deleting note: ', err);
    }
  };

  const handlePin = async (note) => {
    const { note_id, pinned } = note;

    try {
      const response = await axios.patch('/api/users/notes', {
        note_id,
        pinned: !pinned,
      });
      fetchNotes();
    } catch (err) {
      console.error('Error updating note pin: ', err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('api/users/auth');
        setUsername(response.data.username);
      } catch (err) {
        console.error('Error fetching user: ', err);
      }
    };

    fetchNotes();
    fetchUser();
  }, []);

  return (
    <>
      <Navbar showSearchAndUser={true} username={username} />

      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {notes.map((note) => (
            <NoteCard
              key={note.note_id}
              title={note.title}
              date={new Date(note.created_at).toLocaleDateString()}
              content={note.content}
              tags={note.tags}
              isPinned={note.pinned}
              onEdit={() => {
                setOpenAddEditNotes({
                  isShown: true,
                  type: 'edit',
                  data: note,
                });
              }}
              onDelete={() => {
                deleteNotes(note);
              }}
              onPinNote={() => {
                handlePin(note);
              }}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer"
        onClick={() => {
          setOpenAddEditNotes({ isShown: true, type: 'add', data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>

      <Modal
        isOpen={openAddEditNotes.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.2)' } }}
        contentLabel=""
        className="w-[90%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5 "
      >
        <AddEditNotes
          type={openAddEditNotes.type}
          noteData={openAddEditNotes.data}
          fetchNotes={() => {
            fetchNotes();
          }}
          onClose={() => {
            setOpenAddEditNotes({ isShown: false, type: 'add', data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
