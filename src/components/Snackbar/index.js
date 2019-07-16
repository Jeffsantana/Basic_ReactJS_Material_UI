import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
// import { CheckCircle, Warning, Error as ErrorIcon, Info } from "@material-ui/icons";



const SnackbarSimple = props => (
    <Snackbar
        key='simple@snackbar'
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}

        open={props.error}
        autoHideDuration={6000}

    >
        <SnackbarContent
            aria-describedby="snackbar/simple"
            message={
                <span key="@message/simple" id="client-snackbar">
                    {props.message}
                </span>
            }
            action={[

                <IconButton
                    aria-label="Close"
                    color="inherit"
                    onClick={props.onClose}
                    key="closeButtonsimple"
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    </Snackbar>
);

export default SnackbarSimple;