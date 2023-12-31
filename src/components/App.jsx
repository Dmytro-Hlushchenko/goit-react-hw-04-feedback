import { useState } from "react";
import FeedbackOptions from "./FeedbackOptions";
import Stats from "./FeedStatistics";
import Section  from "./Section";
import  Notification from "./Notification";

export const App =() => {

    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const options = ['Good', 'Neutral', 'Bad'];

 const onLeaveFeedback = type => {
     switch (type) {
       case 'Good': setGood(prevState => prevState +1);
        break;
       case 'Neutral': setNeutral(prevState => prevState +1);
        break;
       case 'Bad': setBad(prevState => prevState +1);
        break;
      default:
        return;
     }
    };
  
  const countTotalFeedback = () => {
    const values = [good, neutral, bad];
    const totalFeedback = values.reduce((total, value) => (total += value), 0);
    return totalFeedback;
  };
  
  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = total => {
    return `${Math.round(
    (good * 100) / total)}%`;
  };
          
  
  return (
        <>
          <Section title="Please leave feedback">
            <FeedbackOptions 
              options={options}
              onLeaveFeedback={onLeaveFeedback}
            />
          </Section>
          <Section title="Statistics">
              {countTotalFeedback()> 0 ? (<Stats
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={countPositiveFeedbackPercentage(total)}
              />) : (<Notification message="There is no feedback" />)}
          </Section>
        </>
      );
    };
  