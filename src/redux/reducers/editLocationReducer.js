export default function editLocationReducer(oldstate=[], action){
  switch (action.type){
    case 'EDIT_SELECT':
      return oldstate;
    default: return oldstate;
  }
}
