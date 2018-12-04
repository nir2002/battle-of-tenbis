import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Table from '../Tables/Table';
import { withStyles } from '@material-ui/core';

const RestaurantList = props => {
  return (
    <div className={props.classes.root}>
      <Typography variant="h4">{props.title}</Typography>
      <Table
        color={props.color}
        rows={[
          {
            label: 'Name',
            value: data => data.name
          },
          {
            label: 'Voters',
            value: data => data.voters.map(voter => voter.name).join(', ')
          }
        ]}
        data={props.data}
      />
    </div>
  );
};

RestaurantList.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles({
  root: {
    textAlign: 'center'
  }
})(RestaurantList);
