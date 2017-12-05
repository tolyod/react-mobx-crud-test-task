import React from "react";
import { observer } from "mobx-react";
import matesStore from '../models/MatesStore';
import { Link } from 'react-router-dom';
import MateRowItem from './MateRowItem';

const ListMates = observer (
class ListMates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'firstName' : '',
      'lastName' : '',
      'age' : '',
      'mates' : matesStore.matesState.slice(),
    };
    this.handleChange = this.handleChange.bind(this);

  }

  matchStringPair (str1, str2) {
     return (str1.length > 0) ? (str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1) :true;
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const curObj = {...{'firstName' : this.state.firstName,
                          'lastName' : this.state.lastName,
                          'age' : this.state.age}, ...{[name]:value}};

    const filteredMates = matesStore.matesState.peek().filter( (el) => {
      const isFirstNameMatched = this.matchStringPair(curObj.firstName, el.name.first);
      const isLastNameMatched = this.matchStringPair(curObj.lastName, el.name.last);
      const isAgeMatched = (curObj.age <=1 ) ? true : (el.age == curObj.age);

      return isFirstNameMatched && isLastNameMatched && isAgeMatched;
    });

    this.setState( {'mates': filteredMates, ...curObj } );
  }

  render () {
    const itemsList = this.state.mates.slice().map ( (value, index) => {
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
            <tr key='tr_filter'>
              <td key='id_filter'>-</td>
              <td key='nf_input'><input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange}></input></td>
              <td key='nl_input'><input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}></input></td>
              <td key='age_input'><input type='number' min='1' step='1' name='age' value={this.state.age} onChange={this.handleChange}></input></td>
              <td key='actoions_input'>
                <span>
                </span>
                <span>
                </span>
                </td>
            </tr>
            {itemsList}
          </tbody>
        </table>
        <button><Link to='/create'>Создать</Link></button>
      </div>
    );
  };
});

export default ListMates;
