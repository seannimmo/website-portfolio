import React, { Component } from 'react';
import '../css/Window.css';

export class Window extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='window'>
        <div className='content'>
          {this.props.game}
        </div>

      </div>
    )
  }
}

export default Window