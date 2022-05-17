import React ,{useRef} from 'react'
import IdleTimer from 'react-idle-timer'
import { withRouter } from "react-router-dom";

const Idle = () => {
  let idleTimer = useRef(null);
  function onAction(e) {
    let currentTime = new Date();
    localStorage.setItem('currentTime', JSON.stringify(currentTime.getTime()));
  }
  function onActive(e) {
  }
  function onIdle(e) {

    localStorage.clear();
    this.props.history.push('/');
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
 
// class Idle extends Component {
//   constructor(props) {
//     super(props)
//     this.idleTimer = null
//     this.onAction = this._onAction.bind(this)
//     this.onActive = this._onActive.bind(this)
//     this.onIdle = this._onIdle.bind(this)
//   }
//   _onAction(e) {
//     let currentTime = new Date();
//     localStorage.setItem('currentTime', JSON.stringify(currentTime.getTime()));
//   }
//   _onActive(e) {
//   }
//   _onIdle(e) {
//     localStorage.clear();
//     this.props.history.push('/');
//   }
//   render() {
//     return (
//       <div>
//         <IdleTimer
//           ref={ref => { this.idleTimer = ref }}
//           element={document}
//           onActive={this.onActive}
//           onIdle={this.onIdle}
//           onAction={this.onAction}
//           debounce={250}
//           timeout={1000 * 60 * 20} />
//       </div>
//     )
//   }
  
// }

export default withRouter(Idle);