# Simulador de plazo fijo

Bienvenido! Creé este código donde por el momento tengo seis simulaciones que te ayudarán a anticiparte y formar estrategias en caso de que desees hacer un plazo fijo tradicional. Pudes conocer el sitio subido a la web [aquí](https://simuladorplazofijo.netlify.app/). Para más info ve a **Simulaciones**.

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋

Necesitas tener previamente descargado e instalado [NodeJs](https://nodejs.org/).

### Instalación 🔧

Instala las dependencias con el comando

```
npm install
```

## Despliegue 📦

Corre el proyecto con el comando

```
npm run dev
```

## Simulaciones

A continuación describo brevemente la funcionalidad de cada simulación. Todas usan como base a las fórmulas improvisadas por mí que están descritas en la sección "Teoría".

* Simulación 1: Este es el típico cálculo que se encuentra por internet que predice el rendimiento de un plazo fijo en una cantidad determinada de días.

* Simulación 2: Calcula la inversión necesaria para superar un rendimiento en particular seteado por el usuario.

* Simulación 3: Predice el capital total y el rendimiento generado a la hora de hacer interés compuesto (renovar en cada plazo el capital original más los intereses generados) considerando la cantidad de plazos que desee el usuario.

* Simulación 4: Haciendo interés compuesto se predice la cantidad de plazos fijos necesarios que tendrías que hacer para que se supere cierta cantidad de dinero.

* Simulación 5: Igual que la simulación 3, pero agregando un monto fijo de dinero (a modo de ahorro o ayuda para que crezca más rápido) entre un plazo y el siguiente. Este monto extra se considera a partir del segundo plazo.

* Simulación 6: Igual que la simulación 4, pero agregando un monto fijo bajo el mismo razonamiento que el utilizado en la simulación 5.

Deseas que agregue otra simulación personalizada? Pídela y lo haré! alejandro_portaluppi@outlook.com

## Construido con 🛠️

* CSS
* [TypeScript](typescriptlang.org)
* [ReactJS](https://reactjs.org/)
* [NodeJs](https://nodejs.org/)
* [Tailwind](https://tailwindcss.com/)
* [Vite](https://vitejs.dev/)
* [echarts](https://echarts.apache.org/)
* [react-katex](https://www.npmjs.com/package/react-katex)

## Autor ✒️

* **Alejandro Portaluppi** - [LinkedIn](https://www.linkedin.com/in/alejandro-portaluppi/)
