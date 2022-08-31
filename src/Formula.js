import React, {useState} from "react";
import { MathJax } from "better-react-mathjax";
import InputSlider from "./InputSlider";
import ScientificInput from "./Input";
import { Select, Typography, MenuItem, Box, Grid } from "@mui/material";

const separate = (n) => {
    const string = n.toExponential();
    const [string_mantissa, string_exponent] = string.split("e");
    const mantissa = Number(string_mantissa);
    const exponent = Number(string_exponent);
    return {
        mantissa: mantissa,
        exponent: exponent,
    }
}

export default function Formula(props) {
    const [variables, setVariables] = useState(props.variables);
    const [factor, setFactor] = useState(props.factor);

    const handleUnitChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = Number(target.value);
        let new_variables = {};
        Object.assign(new_variables, variables);
        new_variables[name].factor = value;
        setVariables(new_variables);
    }

    const handleSliderInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = Number(target.value);
        let new_variables = {};
        Object.assign(new_variables, variables);
        new_variables[name].value = value;
        setVariables(new_variables);
    }

    const handleSliderChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = Number(target.value);
        let new_variables = {};
        Object.assign(new_variables, variables);
        new_variables[name].value = value;
        setVariables(new_variables);
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const longname = target.name;
        const value = Number(target.value);
        const [part, name] = longname.split(" ");
        let new_variables = {};
        Object.assign(new_variables, variables);
        new_variables[name].value[part] = value;
        setVariables(new_variables);
    }

    let sanitized_variables = {}
    for (const name in variables) {
        const variable = variables[name];
        if (variable.type == "numeric") {
            sanitized_variables[name] = variable.factor * variable.value.mantissa * Math.pow(10, variable.value.exponent);
        } else if (variable.type == "slider") {
            sanitized_variables[name] = variable.value;
        }
    }

    let input_sliders = [];
    let inputs = [];
    for (const name in variables) {
        const variable = variables[name];
        if (variable.type == "numeric") {
            inputs.push(<ScientificInput
                name={name}
                mantissa={variable.value.mantissa}
                exponent={variable.value.exponent}
                description={variable.description}
                key={name}
                handleInputChange={handleInputChange}
                factors={variable.factors}
                factor={variable.factor}
                handleUnitChange={handleUnitChange}
            />);
        } else if (variable.type == "slider") {
            input_sliders.push(<InputSlider
                name={name}
                value={variable.value}
                description={variable.description}
                key={name}
                handleInputChange={handleSliderInputChange}
                handleSliderChange={handleSliderChange}
                max={variable.max}
                factors={variable.factors}
                factor={variable.factor}
                handleUnitChange={handleUnitChange}
            />)
        }
    }

    let units = [];
    for (const name in props.factors) {
        units.push(<MenuItem key={props.name + name} value={props.factors[name]}><Tex tex={name} /></MenuItem>);
    }

    return (
        <Box>
        <Typography>{props.description}</Typography>
        <Tex tex={props.name + " = " + props.expression} />
            <Grid container alignItems="center" direction="column">       
            {inputs}
            {input_sliders}
            <Typography><Tex tex={props.name + " = "} inline /> {(props.formula(sanitized_variables) / factor ).toExponential() }</Typography>
            <Select
            value={factor}
            onChange={(event) => setFactor(event.target.value)}
            >
                {units}
            </Select>
            </Grid>
        </Box>
    );
}

function Tex(props) {
    return (
        <MathJax inline={props.inline}>{"\\(" + props.tex + "\\)"}</MathJax>
    );
}
