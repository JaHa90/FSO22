import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all > 0 ? roundToTwo((good - bad) / all) : 0;
  const positive = all > 0 ? roundToTwo((good / all) * 100) : 0;

  if (all === 0) {
    return <div>Ei palautteita</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Hyvä" value={good} />
        <StatisticLine text="Keskiverto" value={neutral} />
        <StatisticLine text="Huono" value={bad} />
        <StatisticLine text="Kaikki" value={all} />
        <StatisticLine text="Keskiarvo" value={average} />
        <StatisticLine text="Positiivinen palaute" value={positive + " %"} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

// Round to two decimal places
const roundToTwo = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Anna palaute!</h1>
      <Button handleClick={() => setGood(good + 1)} text="Hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Keskiverto" />
      <Button handleClick={() => setBad(bad + 1)} text="Huono" />
      <h1>Tilasto</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

