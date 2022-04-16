import * as d3 from 'd3';

const drawBarChart = async () => {
  const weatherUrl =
    'https://gist.githubusercontent.com/S4mLab/443e4c9ec734ce19b202c54b0666e7fe/raw/6d14a1d3778b39d3b3b5e9509ecb17cee738bc9a/weather_data.json';

  // 1. ACCESS THE DATA
  const weatherObjsList = await d3.json(weatherUrl);
  // console.table(weatherObjsList[0]);

  const xAccessor = (dataObj) => dataObj.humidity;
  const yAccessor = (binArray) => binArray.length;

  // 2. CREATE WRAPPER AMD CHART DIMENSIONS
  const wrapperWidth = 600;
  let wrapperDimension = {
    width: wrapperWidth,
    height: wrapperWidth * 0.6,
    margins: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };

  const chartDimension = {
    width:
      wrapperDimension.width -
      wrapperDimension.margins.right -
      wrapperDimension.margins.left,
    height:
      wrapperDimension.height -
      wrapperDimension.margins.top -
      wrapperDimension.margins.bottom,
  };

  // 3. DRAW WRAPPER AND CHART
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', wrapperDimension.width)
    .attr('height', wrapperDimension.height)
    .style('background-color', 'e9ecef');

  const chart = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${wrapperDimension.margins.left}px, ${wrapperDimension.margins.top}px)`
    );

  // 4. CREATE THE SCALES
  const humidityDomain = d3.extent(weatherObjsList, xAccessor);
  const xScale = d3
    .scaleLinear()
    .domain(humidityDomain)
    .range([0, chartDimension.width])
    .nice();

  // domain tell the range of number that we want the bins to cover
  // value is where you tell binsGenerator it can get values from
  // No.bins = thresholds + 1?
  const binsGenerator = d3
    .bin()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(12);

  const humidityBinsArray = binsGenerator(weatherObjsList);

  // we got a yAccessor that accept a list as an input and access its length
  // so we iterate the humidityBinsArray then use yAccessor to access the length of each bin array of humidity's values
  // the domain would be the length of humidity bins
  // range would be chart height

  const binsMaxVal = d3.max(humidityBinsArray, yAccessor);

  const yScale = d3
    .scaleLinear()
    .domain([0, binsMaxVal])
    .range([chartDimension.height, 0])
    .nice();

  // 5. DRAW DATA ELEMENT
  const binGroups = chart.selectAll('g').data(humidityBinsArray).join('g');

  // console.log('humidityBinsArray', humidityBinsArray);
  // console.log('binGroups', binGroups);

  const barPadding = 1;
  // what is property x0 of an obj
  const rectangleBars = binGroups
    .append('rect')
    .attr('x', (dataBinArray) => xScale(dataBinArray.x0) + barPadding / 2)
    .attr('y', (dataBinArray) => yScale(yAccessor(dataBinArray)))
    .attr('width', (dataBinArray) =>
      d3.max([
        0,
        xScale(dataBinArray.x1) - xScale(dataBinArray.x0) - barPadding,
      ])
    )
    .attr(
      'height',
      (dataBinArray) => chartDimension.height - yScale(yAccessor(dataBinArray))
    )
    .attr('fill', 'cornflowerblue');

  // 6. CREATE AND DRAW PERIPHERALS (AXES, LEGENDS, LABELS)

  // 7. INTERACTIONS
};

drawBarChart();
