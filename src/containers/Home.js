import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { connect } from "react-redux";
import styles from "./styles/Styles";
import { actions as initialActions } from "../reducers/initial";
import { actions as optActions } from "../reducers/options";
import { actions as ansActions } from "../reducers/answers";
import Button from "../components/Button";

class Home extends Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);
    this.reset = this.reset.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    const { stringToRender, doRandom, setOpt, shuffler } = this.props;
    const optionArray = stringToRender.split(" ");
    shuffler(); // set doRandom true to shuffle the order of options on every mount
    if (doRandom) {
      const optionsNewArray = this.shuffle(optionArray); // perform shuffle
      setOpt(optionsNewArray); // set Options array prop
    } else {
      setOpt(optionArray); // set Options array prop
    }
  }

  componentDidUpdate() {
    const { setCorrect, stringToRender, ans } = this.props;
    if (ans.length === stringToRender.split(" ").length) {
      // check if answer is complete
      const tempString = ans.join(" ");
      let tempBool = true;
      tempBool = tempString === stringToRender; // if answer is complete then check if its correct
      setCorrect(tempBool);
    }
    // IF THERE WAS NO JOIN METHOD IN JAVASCRIPT

    // if (ans.length === correctAns.length) {
    //   for (let i = 0; i < ans.length; i += 1) {
    //     // Check if we have nested arrays
    //     if (ans[i] instanceof Array && correctAns[i] instanceof Array) {
    //       // recurse into the nested arrays
    //       if (!ans[i].equals(correctAns[i])){ tempBool = false; break;}
    //     } else if (ans[i] !== correctAns[i]) {
    //       // Warning - two different object instances will never be equal: {x:20} != {x:20}
    //       tempBool = false;
    //       break;
    //     }
    //   }
    //   }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    const { reset } = this.props;
    reset();
    BackHandler.exitApp();
    return true;
  };

  shuffle = data => {
    // shuffle options array
    const temp = data;
    let currentIndex = data.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = temp[currentIndex];
      temp[currentIndex] = temp[randomIndex];
      temp[randomIndex] = temporaryValue;
    }

    return temp;
  };

  reset = () => {
    const { reset, stringToRender, shuffler, doRandom, setOpt } = this.props;
    reset();
    // also reset optionsGrid
    const optionArray = stringToRender.split(" ");
    shuffler(); // set doRandom true to shuffle the order of options on every mount
    if (doRandom) {
      const optionsNewArray = this.shuffle(optionArray); // perform shuffle
      setOpt(optionsNewArray); // set Options array prop
    } else {
      setOpt(optionArray); // set Options array prop
    }
  };

  buttonPressed = index => {
    // called when option is clicked
    const { opt, insert, deleteOptions } = this.props;
    insert(opt[index]);
    deleteOptions(index);
  };

  renderQuestion = () => {
    // question grid
    const { stringToRender } = this.props;

    return <Text style={{ fontSize: 20 }}>{stringToRender}</Text>;
  };

  renderAnswer = () => {
    // answer grid
    const { ans } = this.props;
    return ans.map((item, index) => <Button key={index.toString()} index={index} title={item} />);
  };

  renderOptions = () => {
    // options grid
    const { correct, inCorrect } = styles;
    const { opt, isCorrect, ans } = this.props;
    if (isCorrect) {
      // render correct if answer is correct
      return (
        <View style={correct}>
          <Text style={{ fontSize: 35, color: "white" }}>Correct</Text>
        </View>
      );
    }
    if (opt.length === 0 && !isCorrect && ans.length !== 0) {
      return (
        <TouchableOpacity style={inCorrect} onPress={this.reset}>
          <Text style={{ fontSize: 35, color: "white" }}>Incorrect</Text>
        </TouchableOpacity>
      );
    }
    // otherwise render options
    return opt.map((item, index) => (
      <Button key={index.toString()} title={item} onPress={this.buttonPressed} index={index} />
    ));
  };

  render() {
    const { container, child } = styles;
    return (
      <View style={container}>
        <View style={child}>
          <Text style={{ fontSize: 20 }}>Pick the words in order</Text>
        </View>
        <View style={[child, { flexDirection: "row" }]}>{this.renderQuestion()}</View>
        <View style={[child, { flexDirection: "row" }]}>{this.renderAnswer()}</View>
        <View style={[child, { flexDirection: "row" }]}>{this.renderOptions()}</View>
      </View>
    );
  }
}
Home.propTypes = {
  ans: PropTypes.instanceOf(Array).isRequired,
  opt: PropTypes.instanceOf(Array).isRequired,
  stringToRender: PropTypes.string.isRequired,
  doRandom: PropTypes.bool,
  isCorrect: PropTypes.bool,
  shuffler: PropTypes.func,
  setOpt: PropTypes.func,
  insert: PropTypes.func,
  setCorrect: PropTypes.func,
  deleteOptions: PropTypes.func,
  reset: PropTypes.func,
};
Home.defaultProps = {
  doRandom: false,
  isCorrect: false,
  shuffler: () => true,
  setOpt: () => true,
  insert: () => true,
  setCorrect: () => true,
  deleteOptions: () => true,
  reset: () => true,
};

const mapStateToProps = state => ({
  ans: state.answers.ans,
  isCorrect: state.answers.isCorrect,
  opt: state.options.opt,
  stringToRender: state.initial.stringToRender,
  doRandom: state.initial.doRandom,
});
const mapDispatchToProps = dispatch => ({
  shuffler: () => dispatch(initialActions.shuffler()),
  setOpt: data => dispatch(optActions.setOptions(data)),
  insert: input => dispatch(ansActions.insert(input)),
  setCorrect: value => dispatch(ansActions.setCorrect(value)),
  deleteOptions: index => dispatch(optActions.deleteOptions(index)),
  reset: () => dispatch({ type: "RESET" }),
});

const HomeComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
export default HomeComponent;
