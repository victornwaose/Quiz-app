import React,{useReducer} from 'react';
import Progress from './component/Progress';
import Question from './component/Question';
import Answers from './component/Answers';
import './App.css';

const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
const SET_CURRENT_QUESTION ='SET_CURRENT_QUESTION';
const SET_ERROR ='SET_ERROR';
const SET_SHOW_RESULT ='SET_RESULT';
const SET_ANSWERS ='SET_ANSWERS';
const RESET_QUIZ ='RESET_QUIZ';;


function qiuzReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return{
        ...state,
        currentAnswer: action.currentAnswer
      };
   case SET_CURRENT_QUESTION:
      return{
        ...state,
        currentQuestion: action.currentQuestion
      }
      case SET_ERROR:
      return{
        ...state,
        error: action.error
      }
      case SET_SHOW_RESULT:
      return{
        ...state,
        showResult: action.showResult
      }
      case SET_ANSWERS:
      return{
        ...state,
        answers: action.answers
      }
      case RESET_QUIZ:
      return{
        ...state,
        answers: [],
        currentQuestion: 0,
        currentAnswer:'',
        showResult:false,
        error:''
      }
      default:
        return state;
  }
};

const App= ()=> {
  const initialState = {
    currentQuestion:0,
    currentAnswer:'',
    answers: [],
    showResult: false,
    error: '',
  };
  const [state, dispatch] = useReducer(qiuzReducer, initialState);
  const {currentQuestion, currentAnswer, answers, showResult, error} = state;
  
  const questions =[
    {
      id : 1, 
      question :'Which of these  statement is not true about react hooks ?',
      answer_a : 'Hooks are 100%  backwards-compatible and can be used side by side with classes',
      answer_b: 'Hooks are still in beta and not available  yet',
      answer_c: 'Hooks are completely opt-in  there is no need  to rewrite pre_existing code',
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id : 2, 
      question :'Which is not react hook ?',
      answer_a : 'useState()',
      answer_b: 'useConst()',
      answer_c: 'usesReducer()',
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id : 3, 
      question :'What Hooks should be used for data fetching ?',
      answer_a : 'useDataFetching()',
      answer_b: 'useApp()',
      answer_c: 'useEffect()',
      answer_d: 'All of the above',
      correct_answer: 'c',
    },
    {
      id : 4, 
      question :'What is the meaning of HTML ?',
      answer_a : 'Hyper-Transfer Markup Language',
      answer_b: 'Hyper-Text Markup Letter',
      answer_c: 'Hyper-Text Markup Language',
      answer_d: 'All of the above',
      correct_answer: 'c',
    },
  ];
  const question= questions[currentQuestion]
  const handleClick = e =>{
    console.log('handleClick')
    dispatch({type:SET_CURRENT_ANSWER, currentAnswer: e.target.value})
    dispatch({type:SET_ERROR, error:''});
  };
   const renderError =()=>{
    if(!error) {
      return;
    }
    return <div className='error'> {error} </div>
  };
  const renderResultMark = (question, answer) => {
      if (question.correct_answer === answer.answer) {
        return <span className='correct'>CORRECT</span>;
      } 
      return <span className='failed'>failed</span>;
  };
  const renderResultsData =() =>{
    return answers.map(answer => {
      const question = questions.find(
        question => question.id === answer.questionId
        );
        return(
          <div key= {question.id}> 
          {question.question}- {renderResultMark(question, answer)}
          </div>
        )
    });
  }
  const restart = ( ) =>{
    dispatch({type: RESET_QUIZ});
  };
  const next = ( ) => {
    console.log('next')
    const answer = { questionId:question.id, answer: currentAnswer  };
    if (!currentAnswer) {
      dispatch({type:SET_ERROR, error:'please select an option'});
      return;
    }
      answers.push(answer);
      dispatch({type:SET_ANSWERS, answers});
     dispatch({type:SET_CURRENT_ANSWER, currentAnswer:' '})
     if(currentQuestion + 1 < questions.length) {
      dispatch({type:SET_CURRENT_QUESTION, currentQuestion: currentQuestion + 1});
       return;
     }
     dispatch({type:SET_SHOW_RESULT, showResult:true})
    
  }
    if (showResult) {
      return (
        <div className= 'container result' >
            <h2>Result</h2>
            <ul>{renderResultsData()}</ul>
            <button className='btn btn-primary'
                onClick={restart}>Restart
              </button>
        </div>
      )
  }else {
  return (
    <div className='container'>
      <Progress total={questions.length} current={currentQuestion}/>
      <Question question = {question.question}/>
      {renderError()}
      <Answers  question={question} 
      currentAnswer={currentAnswer}
      handleClick= {handleClick}
      />
      <button className='btn btn-primary'
      onClick={next}> Confrim and Continue</button>
    </div>
  );
}
}
export default App;