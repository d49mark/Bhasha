import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
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
  }

  componentDidMount() {
    const { stringToRender, doRandom, setOpt, randomize } = this.props;
    const optionArray = stringToRender.split(" ");
    randomize();
    if (doRandom) {
      const optionsRanArray = this.shuffle(optionArray);
      setOpt(optionsRanArray);
    } else {
      setOpt(optionArray);
    }
  }

  componentDidUpdate() {
    const { setCorrect, stringToRender, ans } = this.props;
    const tempString = ans.join(" ");
    let tempBool = true;
    tempBool = tempString === stringToRender;
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
    setCorrect(tempBool);
  }

  shuffle = data => {
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

  buttonPressed = index => {
    const { opt, insert, deleteOptions } = this.props;
    insert(opt[index]);
    deleteOptions(index);
  };

  renderAnswer = () => {
    const { ans } = this.props;
    return ans.map((item, index) => <Button key={index.toString()} index={index} title={item} />);
  };

  renderQuestion = () => {
    const question = "Winter is Coming";
    const quesArray = question.split("");
    return quesArray.map((item, index) => (
      <Text key={index.toString()} style={{ fontSize: 15 }}>
        {item}
      </Text>
    ));
  };

  renderOptions = () => {
    const { opt, isCorrect } = this.props;
    if (isCorrect) {
      return (
        <View
          style={{
            height: "90%",
            width: "80%",
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 35, color: "white" }}>Correct</Text>
        </View>
      );
    }
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
  randomize: PropTypes.func,
  setOpt: PropTypes.func,
  insert: PropTypes.func,
  setCorrect: PropTypes.func,
  deleteOptions: PropTypes.func,
};
Home.defaultProps = {
  doRandom: false,
  isCorrect: false,
  randomize: () => true,
  setOpt: () => true,
  insert: () => true,
  setCorrect: () => true,
  deleteOptions: () => true,
};

const mapStateToProps = state => ({
  ans: state.answers.ans,
  isCorrect: state.answers.isCorrect,
  opt: state.options.opt,
  stringToRender: state.initial.stringToRender,
  doRandom: state.initial.doRandom,
});
const mapDispatchToProps = dispatch => ({
  randomize: () => dispatch(initialActions.randomize()),
  setOpt: data => dispatch(optActions.setOptions(data)),
  insert: input => dispatch(ansActions.insert(input)),
  setCorrect: value => dispatch(ansActions.setCorrect(value)),
  deleteOptions: index => dispatch(optActions.deleteOptions(index)),
});

const HomeComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
export default HomeComponent;
