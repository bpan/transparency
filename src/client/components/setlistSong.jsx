import React from 'react';

function SetlistSong(props) {

  return (
    <div className={`card song ${props.currentSong ? 'current' : ''}`}>
      <div className={`d-flex flex-row`}>
        <div className="song-title">
          {props.title}
        </div>
        <div className="reorder-song">
          <span className={`fa fa-arrows-alt-v`}/>
        </div>
        <div className="remove-song" onClick={() => { props.deleteSong(); }}>
          <span className={`fa fa-trash`}/>
        </div>
      </div>
    </div>
  );
}

export default SetlistSong;
