import React from 'react'

const Progress= (props)=> {
    return (
      <div className='progress'>
         <hi>Question {props.current} of {props.total}</hi>
      </div>
    );
  }
  
  export default Progress;
  