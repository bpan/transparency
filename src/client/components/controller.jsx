import React from 'react';
import Downshift from 'downshift'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import './controller.scss';
import MonitorVerse from './monitorVerse.jsx';
import SetlistSong from './setlistSong.jsx';
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  css,
  getItems,
} from './autocomplete'

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debugKey: 'a',
      currentSong: 0,
      currentVerse: 0,
      setlist: [
        {
          title: 'In The Secret',
          verses: [
            'In the secret, in the quiet place.\nIn the stillness You are there.\nIn the secret, in the quiet hour\nI wait, only for You.\nCause I want to know You more.',
            'I want to know You,\nI want to hear Your voice.\nI want to know You more.\nI want to touch You.\nI want to see Your face.\nI want to know You more.',
            'I am reaching, for the highest goal,\nThat I might receive the prize.\nPressing onward,\nPushing every hindrance aside\nOut of my way.\nCause I want to know You more.'
          ]
        },
        {
          title: 'God of Wonders',
          verses: [
            'Lord of all creation\nOf water, earth and sky\nHeavens are Your tabernacle\nGlory to the Lord on high.',
            'God of wonders beyond our galaxy\nYou are holy, holy.\nThe universe declares Your majesty\nYou are holy, holy.\nLord of heaven and earth. (echo)',
            'Early in the morning\nI will celebrate the light.\nWhen I stumble in the darkness\nI will call You name by night.',
            'Hallelujah to the Lord of heaven\nand earth.'
          ]
        }]
    };
    this.addSong = this.addSong.bind(this);
    this.deleteSongAt = this.deleteSongAt.bind(this);
    this.songDragEnd = this.songDragEnd.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }

  // SETLIST

  addSong(song) {
    const setlist = [...this.state.setlist, song];
    this.setState({setlist});
  }

  deleteSongAt(index) {
    return () => {
      let currentSong = this.state.currentSong;
      let currentVerse = this.state.currentVerse;
      if (this.state.setlist.length === 1) {
        // Deleting last song, nothing more to display
        currentSong = null;
        currentVerse = null;
      }
      if (index < this.state.currentSong) {
        // Deleting an earlier song will change the indexing
        currentSong = this.state.currentSong - 1;
      }
      if (index === this.state.currentSong) {
        // Deleting the current song should switch to the next song...
        currentVerse = 0;
        if (this.state.currentSong === this.state.setlist.length - 1) {
          // ...unless it's the end of the setlist, in which case switch to the previous song
          currentSong = this.state.currentSong - 1;
        }
      }

      const setlist = [...this.state.setlist];
      setlist.splice(index, 1);
      this.setState({currentSong, currentVerse, setlist});
    };
  }

  songDragEnd(result) {
    // Dropped outside the list or no change
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    // The monitor and verses won't change, but the currentSong index may need to change with the new setlist ordering
    let currentSong = this.state.currentSong;
    if (result.source.index === currentSong) {
      currentSong = result.destination.index;
    } else if (result.source.index < currentSong && result.destination.index >= currentSong) {
      currentSong -= 1;
    } else if (result.source.index > currentSong && result.destination.index <= currentSong) {
      currentSong += 1;
    }

    const setlist = reorder(
      this.state.setlist,
      result.source.index,
      result.destination.index
    );

    this.setState({setlist, currentSong});
  }

  previousSong() {
    if (this.state.currentSong > 0) {
      this.jumpToSong(this.state.currentSong - 1);
    }
  }

  nextSong() {
    if (this.state.currentSong < this.state.setlist.length - 1) {
      this.jumpToSong(this.state.currentSong + 1);
    }
  }

  jumpToSong(index) {
    if (this.state.currentSong === index) {
      return;
    }
    this.setState({currentSong: index, currentVerse: 0});
  }

  // VERSES

  previousVerse() {
    this.setState({currentVerse: this.state.currentVerse > 1 ? this.state.currentVerse - 1 : 0});
  }

  nextVerse() {
    const songEnd = this.state.setlist[this.state.currentSong].verses.length - 1;
    this.setState({currentVerse: this.state.currentVerse < songEnd - 1 ? this.state.currentVerse + 1 : songEnd});
  }

  jumpToVerse(index) {
    if (index < this.state.setlist[this.state.currentSong].verses.length) {
      this.setState({currentVerse: index});
    }
  }

  render() {
    let value = '';
    return (
      <div className="controller d-flex flex-row">
        <input type="text" readOnly={true} style={{display: 'none', position: 'fixed'}} value={this.state.debugKey}/>
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
                <Downshift
                  onChange={selection => {
                    if (selection) {
                      this.addSong(selection);
                    }
                  }}
                  itemToString={() => ('')}
                >
                  {({
                      getLabelProps,
                      getInputProps,
                      getToggleButtonProps,
                      getMenuProps,
                      getItemProps,
                      isOpen,
                      clearSelection,
                      selectedItem,
                      inputValue,
                      highlightedIndex,
                    }) => (
                    <div {...css({width: 250, margin: 'auto'})}>
                      <div className="heading">Add a song</div>
                      <div {...css({position: 'relative'})}>
                        <Input
                          {...getInputProps({
                            isOpen,
                            placeholder: 'Search song title or lyric',
                          })}
                        />
                        {selectedItem ? (
                          <ControllerButton
                            onClick={clearSelection}
                            aria-label="clear selection"
                          >
                            <XIcon />
                          </ControllerButton>
                        ) : null}
                      </div>
                      <div {...css({position: 'relative'})}>
                        <Menu {...getMenuProps({isOpen})}>
                          {isOpen
                            ? getItems(inputValue).map((song, index) => (
                              <Item
                                key={song.id}
                                {...getItemProps({
                                  item: song,
                                  index,
                                  isActive: highlightedIndex === index,
                                  isSelected: selectedItem === song,
                                })}
                              >
                                {song.title}
                              </Item>
                            ))
                            : null}
                        </Menu>
                      </div>
                    </div>
                  )}
                </Downshift>
              </div>
              <a>Browse the library</a>
            </div>
            <div className="setlist">
              <div className="heading">Your setlist</div>
              <DragDropContext onDragEnd={this.songDragEnd}>
                <Droppable droppableId="setlist-droppable">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        borderRadius: '.25rem',
                        backgroundColor: snapshot.isDraggingOver ? 'rgba(0,0,0,0.3)' : 'inherit'
                      }}
                      {...provided.droppableProps}
                    >
                      {this.state.setlist.map((song, index) =>
                        <Draggable key={'droppable-' + index} draggableId={'droppable-' + index} index={index}>
                          {(draggableProvided, draggableSnapshot) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              onClick={() => {this.jumpToSong(index)}}
                            >
                              <SetlistSong currentSong={index === this.state.currentSong} title={song.title} deleteSong={this.deleteSongAt(index)}/>
                            </div>
                          )}
                        </Draggable>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          <div className="design-content">
          </div>
        </div>
        <div className="monitor d-flex flex-column">
          <div className="song">
            {this.state.currentSong !== null && !!this.state.setlist.length
              ?
              <div>
                <div className="title">{this.state.setlist[this.state.currentSong].title}</div>
                {this.state.setlist[this.state.currentSong].verses.map((verse, index) =>
                  <div onClick={() => this.jumpToVerse(index)}>
                    <MonitorVerse currentVerse={index === this.state.currentVerse} verseNumber={index + 1} verseText={verse}/>
                  </div>
                )}
              </div>
              :
              <div className="title">App Name</div>
            }
          </div>
          <div className="control-panel row align-items-center">
            <div className="col col-3">
              <div className="d-flex flex-row align-items-center justify-content-end">
                Previous song
                <button type="button" className="btn btn-light">A</button>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-end">
                Next song
                <button type="button" className="btn btn-light">Z</button>
              </div>
            </div>
            <div className="col col-2">
              <div className="d-flex flex-row align-items-center justify-content-start" onClick={() => {this.previousVerse()}}>
                <button type="button" className="btn btn-light"><i className="fas fa-arrow-up"/></button>
                Previous verse
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start" onClick={() => {this.nextVerse()}}>
                <button type="button" className="btn btn-light"><i className="fas fa-arrow-down"/></button>
                Next verse
              </div>
            </div>
            {/*<div className="col col-3">*/}
            {/*  <div class="d-flex flex-row align-items-center justify-content-start">*/}
            {/*    <button type="button" className="btn btn-light">W</button>*/}
            {/*    Go to first verse*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="col d-flex flex-row align-items-center justify-content-center">
              <div className="alert primary">Fade to black (B)</div>
              <div id="clear-screen">Clear (C)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  keyHandler(e) {
    this.setState({debugKey: e.key});
    if (e.target.tagName.toLowerCase() !== 'input') {
      switch (e.key) {
        /* Set Control */
        case 'a':
        case 'A':
          this.previousSong();
          break;
        case 'z':
        case 'Z':
          this.nextSong();
          break;
        /* Song Control */
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          this.previousVerse();
          break;
        case ' ':
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          this.nextVerse();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.jumpToVerse(parseInt(e.key) - 1);
          break;
        /* Style Control */
        case 'b':
        case 'B':
          break;
        case 'c':
        case 'C':
          break;
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyHandler);
  }
}

export default Controller;
