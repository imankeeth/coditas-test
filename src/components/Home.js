import 'rc-pagination/assets/index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import en_US from 'rc-pagination/lib/locale/en_US';

import { getUsersList, changeSortingOrder } from '../actions';
import UserList from './UserList';
import Header from './Header';

const styles = {
  total_count: {
    marginTop: 20,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: 'name_asc',
      search_value: '',
      pagination: {
        current: 1,
        total: 0,
        showLessItems: true,
        hideOnSinglePage: true,
        locale: en_US,
        pageSize: 10,
      },
    };
    this.onSorting = this.onSorting.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  componentWillReceiveProps({ users }) {
    if (users.total_users !== this.props.users.total_users) {
      this.setState({
        pagination: { ...this.state.pagination, total: users.total_users, current: 1 },
      });
    }
    if (users.sort_order !== this.props.users.sort_order) {
      this.setState({ sorting: users.sort_order });
    }
  }

  async onSorting(sorting) {
    await this.setState({ sorting });
    await this.props.changeSortingOrder(sorting);
  }

  async onSearch(search_value) {
    const { pagination: { current }, sorting } = this.state;
    await this.setState({ search_value });
    await this.props.getUsersList(search_value.trim(), current, sorting);
  }

  onPaginationChange(current) {
    this.setState({
      pagination: { ...this.state.pagination, current },
    });
    this.props.getUsersList(this.state.search_value, current);
  }

  render() {
    const { sorting, search_value, pagination } = this.state;
    const { users: { total_users, items, error } } = this.props;

    const list = () => {
      if (error) {
        return <h2 className="title has-text-centered">{error}</h2>;
      }
      if (!items.length) {
        if (!search_value) {
          return <h2 className="title has-text-centered">Type to look for users</h2>;
        }
        return <h2 className="title has-text-centered">No data found!</h2>;
      }
      return items.map(item => <UserList key={item.id} {...item} />);
    };

    return (
      <div>
        <div className="container">
          <div className="header">
            <Header sorting={sorting} search={search_value} onSorting={this.onSorting} onSearch={this.onSearch} />
          </div>
          <h5 className="title is-5" style={styles.total_count}>
            Total results: {total_users}
          </h5>
          <div className="user_list">{list()}</div>
          <Pagination {...pagination} onChange={this.onPaginationChange} className="is-pulled-right" />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  users: PropTypes.shape({
    total_users: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        login: PropTypes.string,
        avatar_url: PropTypes.string,
        url: PropTypes.string,
        html_url: PropTypes.string,
        repos_url: PropTypes.string,
        score: PropTypes.number,
      }).isRequired
    ).isRequired,
    sort_order: PropTypes.string,
  }).isRequired,
  getUsersList: PropTypes.func,
  changeSortingOrder: PropTypes.func,
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps, { getUsersList, changeSortingOrder })(Home);
