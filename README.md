# Calculadora general

- Calculadora de fórmulas varias, con soporte de unidades y notación científica

## [Link](https://zokalyx.github.io/calculadora-general/)

- Hosteado en Github Pages

## Fórmulas disponibles

### Semiconductores
- Concentración intrínseca de portadores

## Cómo agregar más fórmulas

En `src/data.json` está toda la información requerida para todos los cálculos. No es necesario modificar el código JS para agregar más fórmulas.

### Unidades
- Se debe incluir su conversión al SI
- Si la unidad ya es parte del SI, poner `1`

### Constantes
- Siempre se debe indicar su valor en unidades SI

### Fórmulas
- Se debe indicar su expresión en Latex
- Las unidades default son la última de cada lista de unidades posibles
- Se deben indicar las variables y sus datos

## Dependencias

- [better-react-mathjax](https://github.com/fast-reflexes/better-react-mathjax) para renderizar Latex
- [evaluatex](https://github.com/arthanzel/evaluatex) para evaluar las fórmulas (escritas en Latex)
- [react](https://reactjs.org) para el front-end
- [materials ui](https://mui.com) para componentes del front-end

## Tareas

- 🌈 Decorar 🌈 y posicionar los elementos
- Arreglar bug de renderizado de unidades (solo pasa en el build final, no en el dev)
- Agregar más fórmulas
- Agregar función de copiar y pegar
- Agregar función de historial
- Agregar función de presets
