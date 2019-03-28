import React from "react";
import { observer } from "mobx-react";
import matesStore from '../models/MatesStore';
import { Link } from 'react-router-dom';
import MateRowItem from './MateRowItem';
import Button from 'react-bootstrap/Button';

const ListMates = observer (
class ListMates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'firstName' : '',
      'lastName' : '',
      'age' : '',
      'sortOrder' : 1,
      'mates' : matesStore.matesState,
    };

    this.handleOrderChange = this.handleOrderChange.bind(this);
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

    const filteredMates = matesStore.matesState.slice().filter( (el) => {
      const isFirstNameMatched = this.matchStringPair(curObj.firstName, el.name.first);
      const isLastNameMatched = this.matchStringPair(curObj.lastName, el.name.last);
      // eslint-disable-next-line
      const isAgeMatched = (curObj.age <=1 ) ? true : (el.age == curObj.age);

      return isFirstNameMatched && isLastNameMatched && isAgeMatched;
    });

    this.setState( {'mates': filteredMates, ...curObj } );
  }

  handleOrderChange(e) {

    const sortTempl = (a, b) => {
      const [nameA, nameB] = [ a.toUpperCase(), b.toUpperCase()] // ignore upper and lowercase
      return (nameA < nameB) ? -1 : (nameA > nameB ? 1 : 0);
    }

    const currentState = matesStore.matesState.slice();
    const State = {"new": []};
    const sortOrder = this.state.sortOrder;
    console.log(e.target.id);
    switch(e.target.id) {
      case 'sort-first-name':
          State["new"] = currentState.sort( ({ name : { first : a }}, { name: { first : b }}) => sortTempl(a, b));
          break;
      case 'sort-last-name':
          State["new"] = currentState.sort( ({ name : { last : a }}, { name: { last : b }}) => sortTempl(a, b));
          break;
      case 'sort-age':
          State["new"] = currentState.sort(({ age : a }, { age : b }) => a - b);
          break;
      default:
          State["new"] = currentState;
          console.log(e);
          break;
    }

    this.setState(
          {'mates': sortOrder ? State["new"] : State["new"].reverse(),
           'sortOrder': !sortOrder
          });
  }

  render () {
    const itemsList = this.state.mates.slice().reduce ( (acc, value, index) => {

      const mateIndex = matesStore.matesState.slice().findIndex( (el, index ) => {
        return (el.name.first === value.name.first) && (el.name.last === value.name.last);
      } );

      return (mateIndex === -1) ? acc : acc.concat([( <MateRowItem
        key={`mateItem_${index}`}
        value={value}
        mateID={mateIndex} />)]);

    }, []);

    return (
      <div className="mateListDiv">
        <table className="table table-striped">
          <thead>
            <tr>
              <th><Button variant="outline-dark" id="sort-index" onClick={this.handleOrderChange}>#</Button></th>
              <th><Button variant="outline-dark" id="sort-first-name" onClick={this.handleOrderChange}>First Name</Button></th>
              <th><Button variant="outline-dark" id="sort-last-name" onClick={this.handleOrderChange}>Last Name</Button></th>
              <th><Button variant="outline-dark" id="sort-age" onClick={this.handleOrderChange}>Age</Button></th>
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
        <Link to='/create'><Button variant="outline-dark">Создать</Button></Link>
      </div>
    );
  };
});

export default ListMates;
