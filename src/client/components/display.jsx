import Measure from 'react-measure'
import React from 'react';

import './display.scss';
import MonitorVerse from "./monitorVerse.jsx";


class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStorageState();
    this.state.verseHeights = new Array(this.state.setlist.length);

    this.storageHandler = this.storageHandler.bind(this);
  }

  render() {
    return (
      <div>
        <div id='content'>
          <div className="song" style={{top: -this.state.verseHeights.slice(0, this.state.currentVerse).reduce((a, b) => a + b, -20) + 'px'}}>
            {this.state.currentSong !== null && this.state.setlist && this.state.setlist[this.state.currentSong]
              ?
              <div>
                <div className="title">{this.state.setlist[this.state.currentSong].title}</div>
                {this.state.setlist[this.state.currentSong].verses.map((verse, index) =>
                  <Measure bounds onResize={contentRect => {
                    const verseHeights = [...this.state.verseHeights];
                    verseHeights[index] = contentRect.bounds.height;
                    this.setState({verseHeights});
                  }}>
                    {({ measureRef }) => (
                      <div ref={measureRef}>
                        <MonitorVerse currentVerse={index === this.state.currentVerse} verseNumber={index + 1} verseText={verse}/>
                      </div>
                    )}
                  </Measure>
                )}
              </div>
              :
              null
            }
          </div>
        </div>

        <div id='black-screen' className={this.state.screenIsBlack ? 'screen-is-black' : ''}/>
      </div>
    );
  }

  getStorageState() {
    const blackString = localStorage.getItem('screenIsBlack');
    const setlistString = localStorage.getItem('setlist');
    const songString = localStorage.getItem('currentSong');
    const verseString = localStorage.getItem('currentVerse');
    return {
      screenIsBlack: !!JSON.parse(blackString),
      currentSong: songString ? parseInt(songString) : null,
      currentVerse: verseString ? parseInt(verseString) : null,
      setlist: setlistString ? JSON.parse(setlistString) : []
    };
  }

  storageHandler(e) {
    this.setState(this.getStorageState());
  }

  componentDidMount() {
    window.addEventListener('storage', this.storageHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.storageHandler);
  }
}

export default Display;