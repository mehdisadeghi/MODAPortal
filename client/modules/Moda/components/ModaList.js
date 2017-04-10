import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

// ES6
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// Import Components
import ModaListItem from './ModaListItem/ModaListItem';

// Import Style
import styles from './ModaListItem/ModaListItem.css';

function ModaList1(props) {
  return (
    <div className="listView">
      {
        props.modas.map(moda => (
          <ModaListItem
            moda={moda}
            key={moda.cuid}
            onDelete={() => props.handleDeleteModa(moda.cuid)}
          />
        ))
      }
    </div>
  );
}

function ModaList(props) {
  // Create some column definitions
  const columns = [{
    header: 'Info',
    columns: [{
      header: 'ID',
      accessor: 'cuid'
      }, {
      header: 'User Case',
      accessor: 'userCase'
      }]
    }];
  
  return (
    <ReactTable
      manual
      showFilters={false}
      data={props.modas}
      columns={columns}
      defaultPageSize={10}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
          }
        }
      }}
    />
  );
}

ModaList.propTypes = {
  modas: PropTypes.arrayOf(PropTypes.shape({
    userCase: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteModa: PropTypes.func.isRequired,
};

export default ModaList;