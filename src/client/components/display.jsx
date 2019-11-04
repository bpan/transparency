import Measure from 'react-measure';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './display.scss';
import MonitorVerse from "./monitorVerse.jsx";


class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStorageState();
    this.state.fadeOutForNextSong = false;
    this.state.verseHeights = new Array(this.state.setlist.length);

    this.storageChangeHandler = this.storageChangeHandler.bind(this);
  }

  render() {
    return (
      <div>
        <div id='content'>
          <CSSTransition in={this.state.currentSong !== null && !this.state.fadeOutForNextSong && !this.state.screenIsCleared}
                         timeout={300} onExited={() => this.fadeInNextSong()} classNames="song">
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
                      {({measureRef}) => (
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
          </CSSTransition>
        </div>

        <div id='black-screen' className={this.state.screenIsBlack ? 'screen-is-black' : ''}/>
      </div>
    );
  }

  getStorageState() {
    const blackString = localStorage.getItem('screenIsBlack');
    const clearedString = localStorage.getItem('screenIsCleared');
    const setlistString = localStorage.getItem('setlist');
    const songString = localStorage.getItem('currentSong');
    const verseString = localStorage.getItem('currentVerse');
    return {
      screenIsBlack: !!JSON.parse(blackString),
      screenIsCleared: !!JSON.parse(clearedString),
      currentSong: songString ? parseInt(songString) : null,
      currentVerse: verseString ? parseInt(verseString) : null,
      setlist: setlistString ? JSON.parse(setlistString) : []
    };
  }

  storageChangeHandler(e) {
    const storageState = this.getStorageState();
    const fadeOutForNextSong = this.state.currentSong !== null && this.state.currentSong !== storageState.currentSong
      && !this.state.screenIsCleared;
    if (fadeOutForNextSong) {
      // Preserve current state and fade out
      this.setState({fadeOutForNextSong});
    } else {
      // Update current state
      this.setState({...storageState, fadeOutForNextSong})
    }
  }

  fadeInNextSong() {
    const storageState = this.getStorageState();
    const fadeOutForNextSong = false;
    this.setState({...storageState, fadeOutForNextSong})
  }

  componentDidMount() {
    window.addEventListener('storage', this.storageChangeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.storageChangeHandler);
  }
}

export default Display;