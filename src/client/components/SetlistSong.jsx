function SetlistSong(props) {

  return (
    <div className={`card song`}>
      <div className={`d-flex flex-row`}>
        <div className="song-title">
          {props.title}
        </div>
        <div className="reorder-song">
          <span className={`fa fa-arrows`}/>
        </div>
        <div className="remove-song">
          <span className={`fa fa-trash`}/>
        </div>
      </div>
    </div>
  );
}

export default SetlistSong;
