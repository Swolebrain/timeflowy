
export function modifyItem(loc, val){
  let action = {
    type: 'MODIFY_ITEM',
    location: loc,
    newValue: val
  }
  return action;
}

export function createTodo(loc){
  let todoData = { title: "", subtitle: "", status: "new", items: []};

  let insertIndex = loc[loc.length-1]+1;
  let insertType = "root";

  if (loc.length > 1){
    insertType = "sibling";
  }
  let action = {
    type: 'ADD_ITEM',
    location: loc,
    data: todoData,
    insertIndex,
    insertType
    // data: new TodoListModel(obj, index, parent)
  }
  setTimeout(()=>{
    let idToFocus = ""+(loc[0]+1);
    if (action.insertType !== "root"){
      idToFocus = loc.reduce((p,c, i)=>i===loc.length-1?p+"."+(c+1) : p+"."+c);
    }
    document.getElementById(idToFocus).focus();
  },10);
  return action;
}

export function indentItem(todoData){
  console.log("indent item action");
  let loc = todoData.route;
  let  {title, subtitle, items, status} = todoData;
  let indentType = "root";
  if (loc.length > 1) indentType = "sibling";
  let action = {
    type: 'INDENT_ITEM',
    location: loc,
    indentType,
    data: {title, subtitle, items, status, items}
  }
  setTimeout(()=>{ //[4, 3, 9, 2, 0]
    let newRoute = [...loc];
    newRoute[loc.length-1] = loc[loc.length-1]-1;
    newRoute.push(0);
    let idToFocus = newRoute.reduce((p,c, i)=>i===newRoute.length-1?p+"."+c : p+"."+c);
    document.getElementById(idToFocus).focus();
  },10);
  return action;
}
export function deindentItem(todoData){
  console.log("deindent item action");
  let loc = todoData.route;
  let  {title, subtitle, items, status} = todoData;
  let indentType = "root";
  if (loc.length > 1) indentType = "sibling";
  let action = {
    type: 'DEINDENT_ITEM',
    location: loc,
    indentType,
    data: {title, subtitle, items, status, items}
  }
  setTimeout(()=>{ //[4, 3, 9, 2, 0]
    let newRoute = [...loc];
    newRoute.splice(loc.length-1,1);
    newRoute[newRoute.length-1]++;
    let idToFocus = newRoute.reduce((p,c, i)=>i===newRoute.length-1?p+"."+c : p+"."+c);
    console.log(idToFocus);
    document.getElementById(idToFocus).focus();
  },10);
  return action;
}


export function selectTodo(loc){
  let id = loc.reduce((p,c)=>p+"."+c, "");
  let action = {
    type: 'SELECT_TODO',
    location: loc,
    id
  }
  setTimeout(()=>"",0);
  return action;
}
