import { action, extendObservable } from "mobx";
import {v1 as uuidv1} from 'uuid';
import matesDB from '../mates.json';

class ObservableMatesStore {
  constructor () {
    extendObservable(this, {
      'mates' : [],
      get matesState() { return this.mates; }
    })
  }

  saveLocal() {
    let lst = (typeof localStorage === 'undefined') ? {} : localStorage;

    lst['mates']=JSON.stringify(this.matesState);
  }

  addMateItem = action("addMateItem", function(mateItem) {
    const guid = uuidv1();
    this.mates.push({...mateItem, ...{ guid: guid } });
    this.saveLocal();
  });

  delMateItem = action ("delMateItem", function (id) {
    this.mates.remove(this.mates[id]);
    this.saveLocal();;
  });

  updateMateItem = action( "updateMateItem", function (itemId, itemObj) {
    this.mates[parseInt(itemId,10)] = itemObj;
    this.saveLocal();
  });
}

const insertData = (store) => {
  let lst = (typeof localStorage === 'undefined') ? {} : localStorage;

  if(!!lst['mates'] && JSON.parse(lst['mates']).length >0) {
    JSON.parse(lst['mates']).forEach( e => store.addMateItem(e));
  } else {
    matesDB.forEach( e => store.addMateItem(e) );
  }
  return store;
}

const matesStore = insertData(new ObservableMatesStore());

export default matesStore;
