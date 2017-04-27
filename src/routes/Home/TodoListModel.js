export default class TodoListModel{
  constructor(argObj, index=0, parent=null){
    if ( typeof argObj.title !== 'string' ||
      typeof argObj.subtitle !== 'string' || !argObj.items
      || !Array.isArray(argObj.items) || !argObj.status){
      throw new Error("Cannot create a todo list item without all args"+JSON.stringify(argObj));
    }
    for (let key in argObj){
      if (key !== "items"){
        this[key] = argObj[key]
        continue;
      }
    }

    this.parent = parent;

    if (!parent) this.route = [index];
    else{
      //console.log(parent.route);
      this.route = JSON.parse(JSON.stringify(parent.route));
      this.route.push(index);
    }

    this.items = [];
    argObj.items.forEach((obj, idx) => this.items.push(new TodoListModel(obj, idx, this)));
  }
  getItem(idx){
    return this.items[idx];
  }
  findChild(title){
    for (let i = 0; i < this.items.length; i++){
      let item = this.items[i];
      if (item.title === title) return i;
    }
    return null;
  }
}
