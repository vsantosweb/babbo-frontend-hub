import ReactEcharts from "echarts-for-react";
import graphTheme from './graph-theme.json';
import { useEffect, useState } from "react";
import moment from "moment";


export default function Graph({ data, label }: { data?: Record<string, string | number | undefined>, label: string }) {

    const [options, setOptions] = useState<Record<string, any>>();

    useEffect(() => {

        if (data) {

            const option = {
                
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
               
                grid: {
                    top: '5%',    // margem superior
                    bottom: '5%', // margem inferior
                    left: '0%',   // margem esquerda
                    right: '0%',  // margem direita
                    containLabel: true // ajusta automaticamente o tamanho do gráfico para conter rótulos
                },
                xAxis: {
                    type: 'category',
                    data: Object.keys(data).map(x => moment(x).format('DD/MM'))
                },
                yAxis: {
                    type: 'value',   // Define como eixo numérico
                    min: 0,          // Define o valor mínimo como 0
                    interval: 1,     // Define o intervalo entre os valores do eixo
                    axisLabel: {
                      formatter: '{value}',  // Formata o rótulo para mostrar apenas o número inteiro
                    }
                  },
                series: [
                    {
                        name: label,
                        barGap: 1,

                        data: Object.values(data),
                        type: 'line'
                    },
                    // {
                    //     name: "Cliques",
                    //           barGap: .2,

                    //     data: [120, 200, 150, 80, 70, 110, 130],
                    //     type: 'bar'
                    // }
                ]
            };

            setOptions(option)
        }

    }, [data])

    if(data === null) return `Sem resultados de ${label} no momento`
    return (
        <div style={{ height: '400px' }}>
            {options && <ReactEcharts style={{ width: '100%', height: '100%' }} theme={graphTheme} option={options} />}
        </div>
    );
}
