import React from 'react';
import Chip from '@mui/material/Chip';

const StatusChip = (props) => {

    switch(props.status){
        case '1':
            return(
                <Chip label="Current" color="success" />
            )
        case '2':
            return(
                <Chip label="On Hold" color="warning" />
            )
        case '3':
            return (
                <Chip label="Completed" color="success" />
            )
        case '4':
            return(
                <Chip label="Canceled" color="error" />
            )
        case '5':
            return(
                <Chip label="Delayed" color="error" />
            )
    }
}

export default StatusChip