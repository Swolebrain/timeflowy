import TodoListModel from '../../routes/Home/TodoListModel';
let todoData = [
  {title: "Live the thug life", subtitle:"s", status: "new", items: [
    {title: "blaw", subtitle:"fornicate", status: "new", items: [], parent: null},
    {title: "another test item", subtitle:"de pipi", status: "new", items: [], parent: null}
  ], parent: null},
  {title: "shoot", subtitle:"k", status: "new", items: [], parent: null}
];
// todoData = todoData.map((t,i)=>new TodoListModel(t,i));

export default function(oldstate=todoData, action){

  let newState, loc, oldTodo, idx, currentParent;
  switch (action.type){
    case 'INDENT_ITEM':
      newState = JSON.parse(JSON.stringify(oldstate));
      console.log("indenting");
      idx = action.location[0];//[0, 2, 2, 1]
      if (action.indentType === "root"){
        console.log("root indent type");
        oldTodo = newState.splice(idx,1)[0];
        console.log(oldTodo);
        newState[idx-1].items.push(oldTodo);
      }
      else{
        console.log("sibling indent type");
        idx = action.location[action.location.length-1];
        if (idx===0) return newState;
        currentParent = newState[action.location[0]];
        for (let i = 1; i < action.location.length-1; i++){
          currentParent = currentParent.items[action.location[i]];
        }
        let parent = currentParent;
        // console.log(parent);
        // console.log(action.location);
        oldTodo = parent.items.splice(idx, 1)[0];
        // console.log(oldTodo);
        parent.items[idx-1].items.push(oldTodo);
      }
      return newState;
    case 'DEINDENT_ITEM':
      if (action.indentType === "root") return oldstate;
      newState = JSON.parse(JSON.stringify(oldstate));
      idx = action.location[action.location.length-1];

      // oldTodo = parent.items.splice(idx, 1)[0];
      // oldTodo.items = parent.items.splice(idx);
      if (action.location.length === 2){//need to splice directly into state
        let parentIndex = action.location[0];
        oldTodo = newState[parentIndex].items.splice(action.location[1],1)[0];
        oldTodo.items = newState[parentIndex].items.splice(action.location[1]);
        newState.splice(parentIndex+1, 0, oldTodo);
        console.log(newState);
      }
      else{
        currentParent = newState[action.location[0]];
        for (let i = 1; i < action.location.length-2; i++){
          currentParent = currentParent.items[action.location[i]];
        }
        let grandParent = currentParent;
        let parentInGrandparentIdx = action.location[action.location.length-2]
        let padre = grandParent.items[parentInGrandparentIdx];
        oldTodo = padre.items.splice(action.location[action.location.length-1],1)[0];
        grandParent.items.splice(parentInGrandparentIdx+1, 0, oldTodo);
      }
      return newState;
    case 'ADD_ITEM':
      //requires action.location and action.data (todoListItem)
      newState = JSON.parse(JSON.stringify(oldstate));
      if (action.insertType === "root"){
        newState.splice(action.insertIndex, 0, action.data);
      }
      else{
        let currentParent = newState[action.location[0]];
        for (let i = 1; i < action.location.length-1; i++){
          currentParent = currentParent.items[action.location[i]];
        }
        let parent = currentParent;
        parent.items.splice(action.insertIndex, 0, action.data);
      }
      return newState;
    case 'MODIFY_ITEM':
      //requires action.location and action.newValue
      newState = JSON.parse(JSON.stringify(oldstate));
      loc = newState[action.location[0]];
      for (let i = 1; i < action.location.length; i++){
        loc = loc.items[action.location[i]];
      }
      loc.title = action.newValue;
      return newState;
    default: return oldstate;
  }
}
