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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('api/users/notes');

        setNotes(response.data);
      } catch (err) {
        console.error('Error fetching notes: ', err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {notes.map((note) => (
            <NoteCard
              key={note.note_id}
              title={note.title}
              date={new Date(note.created_at).toLocaleDateString()}
              content={note.context}
              tags={note.tags}
              isPinned={note.pinned}
              onEdit={() => {
                setOpenAddEditNotes({
                  isShown: true,
                  type: 'edit',
                  data: note,
                });
              }}
              onDelete={() => {}}
              onPinNote={() => {}}
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
          onClose={() => {
            setOpenAddEditNotes({ isShown: false, type: 'add', data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
