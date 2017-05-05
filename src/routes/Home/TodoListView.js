import React, {Component} from "react";
import PropTypes from 'prop-types';
import store from '../../redux';
import {modifyItem, createTodo, indentItem, deindentItem} from '../../redux/actions'

// const width = window.innerWidth;
// const height = window.innerHeight;
const styles = {
  todoList: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
  },
  todoItem:{
    display:"flex",
    flexDirection: "row",
    marginTop: 12
  },
  todoSubtitle:{
    fontSize: 12,
    marginLeft: 25
  },
  bullet: {
    height: 10,
    width: 10,
    backgroundColor: "#333333",
    borderRadius: 100,
    margin: 5
  },
  todoItemInput: {
    border: "none",
    fontSize: 18
  }
}

export default class TodoListView extends Component{
  static propTypes={
    data: PropTypes.object,
    index: PropTypes.number
  }
  componentDidMount(){
    //this.titleInput.focus();
  }
  handleKeyDown = (e) => {
    // console.log(e);
    // console.log(e.shiftKey);
    if (e.key.toLowerCase() === 'enter'){
      store.dispatch(createTodo(this.props.data.route));
    }
    if (e.key.toLowerCase() === 'tab'){
      e.preventDefault();
      if (!e.shiftKey){
        store.dispatch(indentItem(this.props.data));
      }
      else{
        store.dispatch(deindentItem(this.props.data));
      }
    }
  }
  render(){
    let td = this.props.data;
    return (
      <div style={styles.todoList} className="todo-item">
        <div style={styles.todoItem}>
          <div style={styles.bullet}></div>
          <input
            id={this.props.inputId}
            ref={input=>this.titleInput=input}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onChange={e=>store.dispatch(modifyItem(td.route, e.target.value))}
            style={styles.todoItemInput}
            type="text" value={this.props.data.title} />
        </div>
        <div style={styles.todoSubtitle}>
          {this.props.data.subtitle}
        </div>
        {
          this.props.data.items.map((e,i)=> <TodoListView
                                      inputId={e.route.reduce((p, c)=>p+"."+c)}
                                      data={e} key={i} index={i} />)
        }
      </div>
    );
  }
}
