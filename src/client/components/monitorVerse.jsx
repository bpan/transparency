import React from 'react';

function MonitorVerse(props) {
  return (
    <div className={`verse ${props.currentVerse ? 'current' : ''}`} onClick={props.onClick}>
      <div className="verse-number">{props.verseNumber}</div>
      <div className="verse-text">
        {props.verseText}
      </div>
    </div>
  );
}

export default MonitorVerse;
