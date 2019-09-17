import React from 'react';
import Autocomplete from 'react-autocomplete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SetlistSong from "./setlistSong.jsx";

import './controller.scss';


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setlist: ['In The Secret', 'God of Wonders', 'Father of Lights', 'Jesus Lover of My Soul (It\'s All About You)']
    };
    this.onDragEnd = this.onDragEnd.bind(this);
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

    this.setState({
      setlist,
    });
  }

  render() {
    let value = '';
    return (
      <div class="controller d-flex flex-row">
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
                              <SetlistSong title={song}/>
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
            <div class="title">In The Secret</div>
            <div id="top" class="verse current">
              <div class="verse-number">1</div>
              <div class="verse-text">
                In the secret, in the quiet place.<br/>
                In the stillness You are there.<br/>
                In the secret, in the quiet hour<br/>
                I wait, only for You.<br/>
                Cause I want to know You more.<br/>
              </div>
            </div>
            <div class="verse">
              <div class="verse-number">2</div>
              <div class="verse-text">
                I want to know You,<br/>
                I want to hear Your voice.<br/>
                I want to know You more.<br/>
                I want to touch You.<br/>
                I want to see Your face.<br/>
                I want to know You more.<br/>
              </div>
            </div>
            <div class="verse">
              <div class="verse-number">3</div>
              <div class="verse-text">
                I am reaching, for the highest goal,<br/>
                That I might receive the prize.<br/>
                Pressing onward,<br/>
                Pushing every hindrance aside<br/>
                Out of my way.<br/>
                Cause I want to know You more.<br/>
              </div>
            </div>
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
              <div className="d-flex flex-row align-items-center justify-content-start">
                <button type="button" className="btn btn-light"><i className="fas fa-arrow-up"></i></button>
                Previous verse
              </div>
              <div class="d-flex flex-row align-items-center justify-content-start">
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
}

export default Controller;
