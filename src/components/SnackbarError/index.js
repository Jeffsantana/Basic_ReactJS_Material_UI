import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { colors } from "../../styles";


const SnackbarError = props => (
    <Snackbar
        key='error@snackbar'
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}

        open={props.error}
        autoHideDuration={6000}

    >
        <SnackbarContent
            style={{ backgroundColor: colors.danger }}
            aria-describedby="client-snackbar@"
            message={
                <span key="@message/snackbarerror" id="client-snackbar">
                    {props.message}
                </span>
            }
            action={[

                <IconButton
                    aria-label="Close"
                    color="inherit"
                    onClick={props.onClose}
                    key="closeButton"
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    </Snackbar>
);

export default SnackbarError;