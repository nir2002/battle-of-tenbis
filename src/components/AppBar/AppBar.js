import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signOut } from './../../api/';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, usersStore } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const user = usersStore.currentUser;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
              The Battle of TenBis
            </Typography>
            {user && (
              <div>
                <Link
                  to="my-votes"
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <Button variant="contained" color="primary">
                    My Votes
                  </Button>
                </Link>

                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar
                    alt={user.displayName}
                    src={user.photoURL}
                    className={classes.orangeAvatar}
                  >
                    {user.displayName[0]}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={signOut}>Sign Out</MenuItem> :
                </Menu>
              </div>
            )}
            {!user && <Button onClick={signInWithGoogle}>Sign In</Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500]
  }
})(inject('usersStore')(observer(MenuAppBar)));
