import * as React from 'react';
import { MathJax } from "better-react-mathjax";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { MenuItem, Select } from '@mui/material';

const Input = styled(MuiInput)`
  width: 50px;
`;

// https://mui.com/material-ui/react-slider/#slider-with-input-field
export default function InputSlider(props) {
    let units = [];
    for (const name in props.factors) {
        units.push(<MenuItem key={props.name + name} value={props.factors[name]}><Tex tex={name} /></MenuItem>);
    }
    
    return (
        <Box>
        <Grid container alignItems="center">
            <Grid item>
            <Tex tex={props.name + " = "} />
            </Grid>
        <Grid item>
            <Input
            name={props.name}
            value={props.value}
            onChange={props.handleInputChange}
            inputProps={{
                step: 1,
                min: 0,
                max: props.max,
                type: 'number',
            }}
            />
        </Grid>
        <Grid item>
            <Slider
            sx = {{ width: 300 }}
            name={props.name}
            max={props.max}
            value={props.value}
            onChange={props.handleSliderChange}
            aria-labelledby="input-slider"
            />
        </Grid>
        <Grid item>
            <Select
                value={props.factor}
                name={props.name}
                onChange={props.handleUnitChange}
            >
                {units}
            </Select>
        </Grid>
        <Grid item>
        <Typography>
            {props.description}
        </Typography>
        </Grid>
        </Grid>
        </Box>
      );
}

function Tex(props) {
    return (
        <MathJax>{"\\(" + props.tex + "\\)"}</MathJax>
    );
}
