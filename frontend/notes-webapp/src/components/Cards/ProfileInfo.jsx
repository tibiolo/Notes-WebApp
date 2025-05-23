import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = (props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200">
        {getInitials(props.username)}
      </div>
      <div className="">
        <p className="text-sm font-medium">{props.username}</p>
        <button
          className="text-sm text-slate-700 underline cursor-pointer"
          onClick={props.onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
