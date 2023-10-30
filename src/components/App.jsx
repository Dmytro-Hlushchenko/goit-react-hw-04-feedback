import { useState } from "react";
import FeedbackOptions from "./FeedbackOptions";
import Stats from "./FeedStatistics";
import Section  from "./Section";
import  Notification from "./Notification";

export const App =() => {

    const [isGood, setIsGood] = useState(0);
    const [isNeutral, setIsNeutral] = useState(0);
    const [isBad, setIsBad] = useState(0);
    const options = ['Good', 'Neutral', 'Bad'];

 const onLeaveFeedback = type => {
     switch (type) {
       case 'Good': setIsGood(isGood + 1);
        break;
       case 'Neutral': setIsNeutral(isNeutral + 1);
        break;
       case 'Bad': setIsBad(isBad + 1);
        break;
      default:
        return;
     }
    };
  
  const countTotalFeedback = () => {
    const values = [isGood, isNeutral, isBad];
    const totalFeedback = values.reduce((total, value) => (total += value), 0);
    return totalFeedback;
  };
  
  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = total => {
    
    return `${Math.round(
      (isGood * 100) / total)}%`;
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
              good={isGood}
              neutral={isNeutral}
              bad={isBad}
              total={total}
              positivePercentage={countPositiveFeedbackPercentage(total)}
              />) : (<Notification message="There is no feedback" />)}
          </Section>
        </>
      );
    };
  