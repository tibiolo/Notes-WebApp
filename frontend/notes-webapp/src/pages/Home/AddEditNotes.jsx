import React, { useEffect, useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axios from '../../utils/axios.js';

// { fetchNotes, noteData, type, onClose }

const AddEditNotes = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      await axios.post('/api/users/notes', {
        title,
        content,
        pinned: false,
        tags,
      });
      props.fetchNotes();
      props.onClose();
    } catch (err) {
      console.error('Error adding new note: ', err);
      setError('Error adding note, Please try again.');
    }
  };

  const editNote = async () => {
    try {
      await axios.patch('/api/users/notes/edit', {
        note_id: props.noteData.note_id,
        title,
        content,
        tags,
      });
      props.fetchNotes();
      props.onClose();
    } catch (err) {
      console.error('Error editing note: ', err);
      setError('Error editing note, Please try again.');
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError('Please enter the title');
      return;
    }

    if (!content) {
      setError('Please enter the content');
      return;
    }

    setError('');

    if (props.type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  useEffect(() => {
    if (props.type === 'edit' && props.noteData) {
      setTitle(props.noteData.title || '');
      setContent(props.noteData.content || '');

      setTags(
        Array.isArray(props.noteData.tags)
          ? props.noteData.tags.filter((tag) => tag && tag.trim() !== '')
          : []
      );
    }
  }, [props.title, props.noteData]);

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-300 cursor-pointer"
        onClick={props.onClose}
      >
        <MdClose className="text-xl text-slate-800" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Your Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          name="text"
          className="text-sm text-slate-950 outline-none bg-slate-200 p-2 rounded resize-none"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-xs text-red-600 pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3 cursor-pointer"
        onClick={handleAddNote}
      >
        {props.type === 'edit' ? 'Edit' : 'Add'}
      </button>
    </div>
  );
};

export default AddEditNotes;
