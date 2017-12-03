import React from "react";
import { observer } from "mobx-react";
import matesStore from '../models/MatesStore';
import { Link } from 'react-router-dom';
import MateRowItem from './MateRowItem';

const ListMates = observer (
class ListMates extends React.Component {
  constructor(props) {
    super(props);
    this.mates = matesStore.matesState;
  }

  render () {
    const itemsList = this.mates.slice().map ( (value, index) => {
      return <MateRowItem
        key={`mateItem_${index}`}
        value={value}
        mateID={index}/>
    });

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemsList}
          </tbody>
        </table>
        <button><Link to='/create'>Создать</Link></button>
      </div>
    );
  };
});

export default ListMates;
