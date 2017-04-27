import React, {Component} from "react";
import PropTypes from 'prop-types';
import TodoListView from './TodoListView';
import TodoListModel from "./TodoListModel";
import {connect} from "react-redux";

class Workflow extends Component{
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object)
  }
  render(){
    let todos = this.props.todos.map((todo, idx)=> new TodoListModel(todo, idx));
    return (
      <div className="todo-container">
        {todos.map((todo, i)=><TodoListView
            inputId={todo.route.reduce((p, c)=>p+"."+c)}
            data={todo} key={i} index={i} />)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps)=>{
  return {
    todos: state.todos
  }
}
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workflow);
