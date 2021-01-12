import React  from 'react';
import Answer from './Answer';

const Answers = (props)=> {
    return(
        <div>
           <Answer letter='a'  answer= {props.question.answer_a} 
           handleClick={ props.handleClick}
            selected={props.currentAnswer === 'a'}/><br/> 
           <Answer letter='b' answer= {props.question.answer_b} 
           handleClick={ props.handleClick}
            selected={props.currentAnswer === 'b'}/><br/>
           <Answer letter='c' answer= {props.question.answer_c} 
           handleClick={props.handleClick}
            selected={props.currentAnswer === 'c'}/><br/>
           <Answer letter='d' answer= {props.question.answer_d} 
            handleClick={props.handleClick}
            selected={props.currentAnswer === 'd'}/><br/>
        </div>
    );  
}






export default Answers;