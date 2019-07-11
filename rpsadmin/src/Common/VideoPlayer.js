import React from 'react';
import ReactPlayer from 'react-player'

const VideoPlayer = (props)=>{
    return(
        <ReactPlayer width='100%' controls loop url={props.MovieLink}  />
    )
}

export default VideoPlayer;