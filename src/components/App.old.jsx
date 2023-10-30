 import FeedbackOptions from "./FeedbackOptions";
import Stats from "./FeedStatistics";
import React, { Component } from "react";
import Section  from "./Section";
import  Notification from "./Notification";

export class App extends Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }  

  onLeaveFeedback = type => {
      this.setState(prevState => ({
      [type]: prevState[type] + 1,
    }));
    };
  
  countTotalFeedback = () => {
    const stateValues = Object.values(this.state);
    const sum = stateValues.reduce((acc, value) => acc + value, 0); 
    return sum;
  };

  countPositiveFeedbackPercentage() {
      return `${Math.round(
      (this.state.good * 100) / this.countTotalFeedback()
    )}%`;
  }
          
  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const totalFeedback = this.countTotalFeedback();
    const countPositiveFeedbackPercentage = this.countPositiveFeedbackPercentage();
      return (
        <>
          <Section title="Please leave feedback">
            <FeedbackOptions 
              options={options}
              onLeaveFeedback={this.onLeaveFeedback}
            />
          </Section>
          <Section title="Statistics">
              {totalFeedback > 0 ? (<Stats
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={countPositiveFeedbackPercentage}
              />) : (
            <Notification message="There is no feedback" />)}
          </Section>
        </>
      );
    };
  };