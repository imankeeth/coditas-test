import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  header_container: {
    backgroundColor: '#157abc',
    paddingTop: 15,
    paddingBottom: 7,
  },
};

const Header = ({ sorting, search, onSearch, onSorting }) => {
  const onSortingHandle = event => {
    onSorting(event.target.value);
  };
  const onSearchHandle = event => {
    onSearch(event.target.value);
  };
  return (
    <div className="columns" style={styles.header_container}>
      <div className="column" />
      <div className="column">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select className="" onChange={onSortingHandle} value={sorting}>
              <option value="name_asc">Name (A - Z)</option>
              <option value="name_des">Name (Z - A)</option>
              <option value="rank_asc">Rank 🡑</option>
              <option value="rank_des">Rank 🡓</option>
            </select>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="control has-icons-left has-icons-right is-expanded">
          <input className="input" type="text" placeholder="Search Name" value={search} onChange={onSearchHandle} />
          <span className="icon is-small is-right">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
      <div className="column" />
    </div>
  );
};

Header.propTypes = {
  sorting: PropTypes.string,
  search: PropTypes.string,
  onSearch: PropTypes.func,
  onSorting: PropTypes.func,
};

export default Header;
