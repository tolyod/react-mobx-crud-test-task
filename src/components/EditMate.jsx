import React from "react";
import { observer } from "mobx-react";
import matesStore from '../models/MatesStore';
import { Link } from 'react-router-dom';

const EditMate = observer (class EditMate extends React.Component {
  constructor(props) {
    super(props);
    this.mateID = parseInt(props.match.params.mateID, 10);
    this.mates = matesStore.matesState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let newObj = { 'name': {
                      'first': this.mates[this.mateID].name.first,
                      'last': this.mates[this.mateID].name.last
                    },
                  'age':this.mates[this.mateID].age
                };

    switch(name) {
      case 'first_name' :
        newObj.name.first = value;
      break;
      case 'last_name' :;
        newObj.name.last = value;
      break;
      case 'age' :
          newObj.age = value;
      break;
      default:
      break;
    }
    newObj =  { ...this.mates[this.mateID], ...newObj };
    matesStore.updateMateItem(this.mateID, newObj);
  }

  render ()  {
    return (
      <div className='createmate row'>
        <div className="col-md-6 col-sm-12 col-lg-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <form name="myform">
                <div className="form-group">
                  <label htmlFor="myName">First Name *</label>
                  <input id="myName" name="first_name" value={this.mates[this.mateID].name.first} onChange={this.handleChange} className="form-control" type="text" />
                  <span id="error_name" className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name *</label>
                  <input id="lastname" name="last_name" value={this.mates[this.mateID].name.last} onChange={this.handleChange} className="form-control" type="text" />
                  <span id="error_lastname" className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input id="age" name="age"  value={this.mates[this.mateID].age} onChange={this.handleChange} className="form-control" type="number" min="1" />
                  <span id="error_age" className="text-danger"></span>
                </div>
                <button className="btn btn-default center"><Link to='/'>Обновить</Link></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  };
}
);

export default EditMate;
