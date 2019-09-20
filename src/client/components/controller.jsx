import React from 'react';
import Autocomplete from 'react-autocomplete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './controller.scss';
import MonitorVerse from './monitorVerse.jsx';
import SetlistSong from './setlistSong.jsx';


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
          verses: []
        },
        {
          title: 'Father of Lights',
          verses: []
        },
        {
          title: 'Jesus Lover of My Soul (It\'s All About You)',
          verses: []
        }]
    };
    this.deleteSongAt = this.deleteSongAt.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }

  // SETLIST

  deleteSongAt(index) {
    return () => {
      const setlist = [...this.state.setlist];
      setlist.splice(index, 1);
      this.setState({setlist});
    };
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const setlist = reorder(
      this.state.setlist,
      result.source.index,
      result.destination.index
    );

    this.setState({setlist});
  }

  // VERSES

  previousVerse() {
    this.setState({currentVerse: this.state.currentVerse > 1 ? this.state.currentVerse - 1 : 0})
  }

  nextVerse() {
    const songEnd = this.state.setlist[this.state.currentSong].verses.length - 1;
    this.setState({currentVerse: this.state.currentVerse < songEnd - 1 ? this.state.currentVerse + 1 : songEnd})
  }

  render() {
    let value = '';
    return (
      <div class="controller d-flex flex-row">
        <input type="text" style={{display: 'none', position: 'fixed'}} value={this.state.debugKey} />
        <div class="workspace d-flex flex-column">
          <div class="tabs d-flex flex-row">
            <div class="tab setlist">
              Songs
            </div>
            <div class="tab design">
              Design
            </div>
          </div>
          <div class="setlist-content">
            <div class="add-song">
              <div class="heading">Add a song</div>
              {/* <input class="form-control" type="text" id="add-a-song" placeholder="Search song title&hellip;"> */}
              <Autocomplete
                getItemValue={(item) => item.label}
                items={[
                  {label: 'apple'},
                  {label: 'banana'},
                  {label: 'pear'}
                ]}
                renderItem={(item, isHighlighted) =>
                  <div style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                    {item.label}
                  </div>
                }
                value={value}
                onChange={(e) => value = e.target.value}
                onSelect={(val) => value = val}
              />
              <a>Browse the library</a>
            </div>
            <div class="setlist">
              <div class="heading">Your setlist</div>
              <DragDropContext onDragEnd={this.onDragEnd}>
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
                            >
                              <SetlistSong title={song.title} deleteSong={this.deleteSongAt(index)}/>
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
          <div class="design-content">
          </div>
        </div>
        <div class="monitor d-flex flex-column">
          <div class="song">
            <div class="title">{this.state.setlist[this.state.currentSong].title}</div>
            {this.state.setlist[this.state.currentSong].verses.map((verse, index) =>
              <MonitorVerse currentVerse={index === this.state.currentVerse} verseNumber={index + 1} verseText={verse}/>
            )}
          </div>
          <div class="control-panel row align-items-center">
            <div class="col col-3">
              <div class="d-flex flex-row align-items-center justify-content-end">
                Previous song
                <button type="button" className="btn btn-light">A</button>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-end">
                Next song
                <button type="button" className="btn btn-light">Z</button>
              </div>
            </div>
            <div class="col col-2">
              <div className="d-flex flex-row align-items-center justify-content-start" onClick={() => { this.previousVerse(); }}>
                <button type="button" className="btn btn-light"><i className="fas fa-arrow-up"></i></button>
                Previous verse
              </div>
              <div class="d-flex flex-row align-items-center justify-content-start" onClick={() => { this.nextVerse(); }}>
                <button type="button" className="btn btn-light"><i className="fas fa-arrow-down"></i></button>
                Next verse
              </div>
            </div>
            {/*<div class="col col-3">*/}
            {/*  <div class="d-flex flex-row align-items-center justify-content-start">*/}
            {/*    <button type="button" className="btn btn-light">W</button>*/}
            {/*    Go to first verse*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div class="col d-flex flex-row align-items-center justify-content-center">
              <div class="alert primary">Fade to black (B)</div>
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
      switch(e.key) {
        /* Set Control */
        case 219:	// [
          // e.preventDefault();
          // t.cont.setPrev();
          break;
        case 221:	// ]
          // e.preventDefault();
          // t.cont.setNext();
          break;
        /* Song Control */
        case 'Esc':
        case 'Escape':
          this.setState({currentVerse: 0});
          break;
        case 'Backspace':
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
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          // t.cont.scrollJump(e.key-48-1);
          break;
        /* Style Control */
        case 67:	// C
          // t.cont.clearSong();
          break;
        case 66:	// B
          // t.cont.blackScreen();
          break;
        case 76:	// L
          //t.style.toggleText();
          break;
        case 75:	// K
          //t.style.toggleBackground();
          break;
        default:
          break;
      }
    }
  }

  componentDidMount(){
    document.addEventListener('keydown', this.keyHandler);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.keyHandler);
  }
}

export default Controller;
