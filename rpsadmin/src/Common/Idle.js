import React ,{useRef} from 'react'
import IdleTimer from 'react-idle-timer'
import { withRouter } from "react-router-dom";

const Idle = (props) => {
  let idleTimer = useRef(null);
  function onAction(e) {
    console.log('het')
    let currentTime = new Date();
    localStorage.setItem('currentTime', JSON.stringify(currentTime.getTime()));
  }
  function onActive(e) {
  }
  function onIdle(e) {

    localStorage.clear();
    props.history.push('/');
  }
  return ( 
    <div>
        <IdleTimer
          ref={ref => idleTimer = ref}
          element={document}
          onActive={onActive}
          onIdle={onIdle}
          onAction={onAction}
          debounce={250}
          timeout={1000 * 60 * 20} />
      </div>
   );
}

export default withRouter(Idle);