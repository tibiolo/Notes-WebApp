import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = (props) => {
  return (
    <div className="border-2 border-gray-200 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{props.title}</h6>
          <span className="text-xs text-slate-500">{props.date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            props.isPinned ? 'text-primary' : 'text-slate-500'
          }`}
          onClick={props.onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">
        {props.content?.slice(0, 60)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {props.tags
            .filter((tag) => tag !== null && tag !== undefined)
            .map((tag) => `#${tag} `)}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={props.onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={props.onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
