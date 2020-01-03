import React from 'react';
import {Link} from 'react-router-dom';

// import './controller.scss';
import MonitorVerse from './monitorVerse.jsx';

const localStorage = window.localStorage;


class Library extends React.Component {
  constructor(props) {
    super(props);
    const setlistString = localStorage.getItem('setlist');
    this.state = {
      setlist: setlistString ? JSON.parse(setlistString) : []
    };
  }

  addSong(song) {
    const setlist = [...this.state.setlist, song];
    localStorage.setItem('setlist', JSON.stringify(setlist));
    this.setState({setlist});
  }

  render() {
    return (
      <div className="controller d-flex flex-row">
        <div className="workspace d-flex flex-column">
          <div className="tabs d-flex flex-row">
            <div className="tab setlist">
              Songs
            </div>
            <div className="tab design">
              Design
            </div>
          </div>
          <div className="setlist-content">
            <div className="add-song">
              <div
                {...css({
                  display: 'flex',
                  flexDirection: 'column',
                })}
              >
                <div {...css({width: 250, margin: 'auto'})}>
                  <div className="heading">Add a song</div>
                  <div {...css({position: 'relative'})}>
                  </div>
                </div>
              </div>
            </div>
            <div className="design-content">
            </div>
          </div>
          <div className="monitor d-flex flex-column">
            <div className="song">
              {this.state.currentSong !== null
                ?
                <div>
                  <div className="title">{this.state.currentSong.title}</div>
                  {this.state.currentSong.verses.map((verse, index) =>
                    <MonitorVerse currentVerse={index === this.state.currentVerse} verseNumber={index + 1}
                                  verseText={verse}/>
                  )}
                </div>
                :
                <div className="title">Transparency</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Library;
