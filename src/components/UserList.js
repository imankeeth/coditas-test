import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = {
  box: {
    marginTop: 10,
    marginBottom: 10,
  },
};

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo_table_show: false,
      repos: [],
      userFullName: '',
    };
    this.toggleReposTableHandler = this.toggleReposTableHandler.bind(this);
    this.getUserNameFrom = this.getUserNameFrom.bind(this);
  }

  async componentWillMount() {
    const { data: { name } } = await axios.get(this.props.url);
    this.setState({ userFullName: name });
  }

  async toggleReposTableHandler(e, url) {
    if (!this.state.repo_table_show) {
      const { data } = await axios.get(url);
      const repos = data.map(({ id, name, language }, i) => ({ id, name, language }));
      this.setState({ repo_table_show: true, repos });
    } else {
      this.setState({ repo_table_show: false });
    }
  }

  async getUserNameFrom(url) {
    const { data: { name } } = await axios.get(url);
    console.log(name);
    return <strong className="title is-3 is-spaced">{name}</strong>;
  }

  render() {
    const { avatar_url, html_url, repos_url } = this.props;
    const { repo_table_show, repos, userFullName } = this.state;

    return (
      <div className="box" style={styles.box}>
        <article className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img src={avatar_url} alt="Github user's avatar" style={{ borderRadius: '50%' }} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong className="title is-3 is-spaced">{userFullName}</strong>
                <br />
                <small className="subtitle">
                  Profile URL:{' '}
                  <a href={html_url} target="_blank">
                    {html_url}
                  </a>
                </small>
                <br />
                <h4 className="subtitle">Followers:</h4>
                {/*followersList()*/}
                <br />
                <button className="button is-pulled-right" onClick={e => this.toggleReposTableHandler(e, repos_url)}>
                  {repo_table_show ? 'Collapse' : 'Details'}
                </button>
              </p>
            </div>
          </div>
        </article>
        {repo_table_show && (
          <table className="table is-striped is-fullwidth">
            <tbody>
              {!repos.length && (
                <tr>
                  <td className="has-text-centered">No repository created</td>
                </tr>
              )}
              {repos.map(repo => (
                <tr key={repo.id}>
                  <td className="has-text-centered">{repo.name}</td>
                  <td className="has-text-centered">{repo.language || 'No language associated'}</td>
                  <td className="has-text-centered">
                    {/*This won't work right now, need to authenticate the app with github*/}
                    <a href={`${html_url}#fork-destination-box`}>Fork this repo</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  id: PropTypes.number,
  login: PropTypes.string,
  avatar_url: PropTypes.string,
  url: PropTypes.string,
  html_url: PropTypes.string,
  repos_url: PropTypes.string,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      languages: PropTypes.string,
    })
  ),
  // score: PropTypes.number,
  toggleReposTable: PropTypes.func,
};

export default UserList;
