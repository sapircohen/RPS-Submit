import React from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';


export default class SAlert extends React.Component{
        render() {
            return (
              <div>
                <SweetAlert
                  type={this.props.alertIcon}
                  show={this.props.show}
                  title={this.props.title}
                  text={this.props.text}
                  onConfirm={this.props.CloseAlert}
                />
              </div>
            );
          }
}

