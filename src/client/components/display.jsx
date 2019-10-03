import React from 'react';

import './display.scss';
import MonitorVerse from "./monitorVerse.jsx";


class Display extends React.Component {
  constructor(props) {
    super(props);
    const setlistString = localStorage.getItem('setlist');
    const songString = localStorage.getItem('currentSong');
    const verseString = localStorage.getItem('currentVerse');
    this.state = {
      currentSong: songString ? parseInt(songString) : null,
      currentVerse: verseString ? parseInt(verseString) : null,
      setlist: setlistString ? JSON.parse(setlistString) : []
    };
    this.storageHandler = this.storageHandler.bind(this);
  }

  render() {
    return (
      <div>
        <div id='content'>
          <div className="song" style={{top: '60px'}}>
            {this.state.currentSong !== null && this.state.setlist && this.state.setlist[this.state.currentSong]
              ?
              <div>
                <div className="title">{this.state.setlist[this.state.currentSong].title}</div>
                {this.state.setlist[this.state.currentSong].verses.map((verse, index) =>
                  <div>
                    <MonitorVerse currentVerse={index === this.state.currentVerse} verseNumber={index + 1} verseText={verse}/>
                  </div>
                )}
              </div>
              :
              null
            }
          </div>
        </div>

        <div id='blackScreen'/>
      </div>
    );
  }

  storageHandler(e) {
    console.log('storageHandler: ' + e);
    const setlistString = localStorage.getItem('setlist');
    const songString = localStorage.getItem('currentSong');
    const verseString = localStorage.getItem('currentVerse');
    const state = {
      currentSong: songString ? parseInt(songString) : null,
      currentVerse: verseString ? parseInt(verseString) : null,
      setlist: setlistString ? JSON.parse(setlistString) : []
    };

    this.setState(state);
  }

  componentDidMount() {
    window.addEventListener('storage', this.storageHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.storageHandler);
  }
}

export default Display;