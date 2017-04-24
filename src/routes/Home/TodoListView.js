import React, {Component} from "react";
import PropTypes from 'prop-types';

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
  render(){
    return (
      <div style={styles.todoList} className="todo-item">
        <div style={styles.todoItem}>
          <div style={styles.bullet}></div>
          <input
            onChange={text=>""}
            style={styles.todoItemInput}
            type="text" value={this.props.data.title} />
        </div>
        <div style={styles.todoSubtitle}>
          {this.props.data.subtitle}
        </div>
        {this.props.data.items.map((e,i)=> <TodoListView data={e} key={i} index={i} />)}
      </div>
    );
  }
}
