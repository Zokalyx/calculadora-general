import { MathJaxContext } from "better-react-mathjax";
import Formula from "./Formula";
import evaluatex from "evaluatex/dist/evaluatex";

import data from "./data.json";
import { Link } from "@mui/material";
const formulas = data.formulas;
const constants = data.constants;
const units = data.units;

// Make evaluatex happy & calculate unit factors
for (const name in formulas) {
  const expression = formulas[name].expression;
  const sanitized_expression = expression.replace("\\pi", "{pi}");
  formulas[name].formula = evaluatex(sanitized_expression, constants, {latex: true});
  for (const variable in formulas[name].variables) {
    let factors = {};
    let last_factor;
    for (const unit of formulas[name].variables[variable].units) {
      const value = evaluatex(unit, {}, {latex: true})(units)
      factors[unit] = value;
      last_factor = value;
    }
    formulas[name].variables[variable].factors = factors;
    formulas[name].variables[variable].factor = last_factor;
  }
  let factors = {};
  let last_factor;
  for (const unit of formulas[name].units) {
    const value = evaluatex(unit, {}, {latex: true})(units);
    factors[unit] = value;
    last_factor = value;
  }
  formulas[name].factors = factors;
  formulas[name].factor = last_factor;
}

function App() {
  let formula_list = [];
  for (const name in formulas) {
    formula_list.push(<Formula
      key={name}
      name={name}
      expression={formulas[name].expression}
      formula={formulas[name].formula}
      variables={formulas[name].variables}
      description={formulas[name].description}
      factor={formulas[name].factor}
      factors={formulas[name].factors}
    />);
  }

  return (
    <MathJaxContext>
      <Link href="https://github.com/Zokalyx/calculadora-general">Repo</Link>
      <br></br>
      <Link href="https://www.omnicalculator.com">Omnicalculator</Link>
      <br></br>
      <Link href="https://www.fourmilab.ch/webtools/units/">Fourmilab</Link>
      {formula_list}
    </MathJaxContext>
  );
}

export default App;
