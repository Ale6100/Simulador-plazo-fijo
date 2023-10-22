import * as echarts from 'echarts';
import { TypeSimulation } from '../types/types';

export const graficar = (ejeX: number[], ejeY: number[], divGrafico: React.MutableRefObject<HTMLDivElement | null>, grafico: TypeSimulation["grafico"], setGraficado: React.Dispatch<React.SetStateAction<boolean>>) => {
    const chartDom = divGrafico.current

    if (!(chartDom !== null && chartDom !== undefined)) {
        throw new Error("Error interno")
    }

    chartDom.classList.add("h-96")

    const myChart = echarts.init(chartDom, 'dark');

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        title: {
            left: 'center',
            text: grafico.title,
            top: 20,
            textStyle: {
                fontSize: function() {
                    const ancho = window.innerWidth;
                    let px = 0
                    if (ancho < 479) {
                        px = 9;
                    } else if (ancho < 576) {
                        px = 12;
                    } else if (ancho < 768) {
                        px = 15;
                    } else {
                        px = 20;
                    }
                    return px + "px";
                }()
            },
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ejeX
        },
        yAxis: {                
            type: 'value',
            boundaryGap: false,
            min: 'dataMin',
            max: 'dataMax',
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 10
            }
        ],           
        series: [
            {
                name: grafico.label,
                type: 'line',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(255, 158, 68, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(255, 70, 131, 0)'
                    }
                    ])
                },
                data: ejeY,
                markLine: {
                    symbol: "none",
                    data: [
                        {type: 'average', name: 'Promedio'}
                    ]
                }                    
            }
        ]
    };
    
    option && myChart.setOption(option);

    setGraficado(true)
}
