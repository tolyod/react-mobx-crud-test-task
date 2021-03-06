import React from "react";
import matesStore from '../models/MatesStore';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const MateRowItem = (props) => {
  const mateID = parseInt(props.mateID, 10);
  const { guid, age, name } = props.value;
  return (
    <tr key={mateID}>
      <td key={`id_${guid}`}>{(mateID+1)}</td>
      <td key={`nf_${guid}`}>{name.first}</td>
      <td key={`nl_${guid}`}>{name.last}</td>
      <td key={`age_${guid}`}>{age}</td>
      <td key={`actoions_${guid}`}>
        <span
          key={`actedit_${guid}`}
        className='actions'>
          <Link key={`lnk_ed_${guid}`}
            to={`/edit/${mateID}`}><Button variant="outline-secondary">Edit</Button></Link>
        </span>
        <span key={`actdelete_${guid}`}
        className='actions'>
        <Link to="/" onClick={(() => {matesStore.delMateItem(mateID)})} ><Button variant="outline-danger">Del</Button></Link>
        </span>
      </td>
    </tr>
  );
}
export default MateRowItem;
