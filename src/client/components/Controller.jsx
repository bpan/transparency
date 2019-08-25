import React from 'react';
import Autocomplete from 'react-autocomplete';

function Controller() {
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
            <div class="card song">
              <div class="d-flex flex-row">
                <div class="song-title">
                  In The Secret
                </div>
                <div class="reorder-song">
                  <span class="fa fa-arrows"></span>
                </div>
                <div class="remove-song">
                  <span class="fa fa-trash"></span>
                </div>
              </div>
            </div>
            <div class="card song">
              <div class="d-flex flex-row">
                <div class="song-title">
                  God of Wonders
                </div>
                <div class="reorder-song">
                  <span class="fa fa-arrows"></span>
                </div>
                <div class="remove-song">
                  <span class="fa fa-trash"></span>
                </div>
              </div>
            </div>
            <div class="card song">
              <div class="d-flex flex-row">
                <div class="song-title">
                  Father of Lights
                </div>
                <div class="reorder-song">
                  <span class="fa fa-arrows"></span>
                </div>
                <div class="remove-song">
                  <span class="fa fa-trash"></span>
                </div>
              </div>
            </div>
            <div class="card song">
              <div class="d-flex flex-row">
                <div class="song-title">
                  Jesus Lover of My Soul (It's All About You)
                </div>
                <div class="reorder-song">
                  <span class="fa fa-arrows"></span>
                </div>
                <div class="remove-song">
                  <span class="fa fa-trash"></span>
                </div>
              </div>
            </div>
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
        <div class="control-panel">
          <div class="row">
            <div class="col">
              <div>
                Previous verse
                <button type="button" class="btn btn-secondary"><i class="fas fa-arrow-left"></i></button>
              </div>
              <div>Previous song</div>
            </div>
            <div class="col">
              <div>Next verse</div>
              <div>Next song</div>
            </div>
            <div class="col">
              <div>Go to first verse</div>
            </div>
            <div class="col">
              <div>Fade to black (B)</div>
            </div>
            <div class="col">
              Clear (C)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
