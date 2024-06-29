import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

function Chart({ data }) {
    const backgroundColor = 'transparent'
    const lineColor = '#2962FF'
    const textColor = 'white'
    const areaTopColor = '#2962FF'
    const areaBottomColor = 'rgba(41, 98, 255, 0.28)'

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });

            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addLineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
}

Chart.propTypes = {
    data: PropTypes.array.isRequired
}

export default Chart
