import React from "react";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { TextField, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { MyAutosuggestSection } from "./styles";

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  return (
    <Grid item xs={12} sm={12}>
      <TextField
        label={inputProps.label}
        fullWidth
        autoFocus={true}
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          }
        }}
        {...other}
      />
    </Grid>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  container: {
    width: "100% !important",
    display: "flex",
    marginTop: 15,
    // marginTop: 32,
    margin: "normal"
    // position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    // width: "100%",
    alignItems: "center",
    zIndex: 1,
    margin: 0,
    display: "block"
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

class MyAutosuggest extends React.Component {
  state = {
    single: "",
    suggestions: [],
    allSuggestions: []
  };

  componentDidMount() {
    let suggestions = [];
    suggestions = this.props.data.docs.map(item => ({
      label: item.name
    }));
    this.setState({ allSuggestions: suggestions });
  }
  componentDidUpdate() {
    // console.log("inside didupdate");
    if (this.props.onClean) {
      this.setState({ text: "" });
      // console.log("Rolou no DidUpdate");
    }
  }

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.allSuggestions.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleClean = () => {
    if (this.props.onClean) {
      this.setState({ text: "" });
      // console.log("Rolou inside mysuggest");
    }
  };
  render() {
    const { classes, myPlaceholder, myLabel } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      // <Grid item xs={4} sm={4}>
      <MyAutosuggestSection>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: myLabel,
            placeholder: myPlaceholder,
            value: this.props.value,
            onChange: this.props.onChange
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </MyAutosuggestSection>
      // </Grid>
    );
  }
}

export default withStyles(styles)(MyAutosuggest);
