import * as d3 from 'd3';

const drawBarChart = async () => {
  const weatherUrl =
    'https://gist.githubusercontent.com/S4mLab/443e4c9ec734ce19b202c54b0666e7fe/raw/6d14a1d3778b39d3b3b5e9509ecb17cee738bc9a/weather_data.json';

  // 1. ACCESS THE DATA
  const weatherObjsList = await d3.json(weatherUrl);
  console.table(weatherObjsList[0]);

  const metricAccessor = (dataObj) => dataObj.humidity;

  // 2. CREATE WRAPPER AMD CHART DIMENSIONS
  const wrapperWidth = 600;
  const wrapperDimension = {
    width: wrapperWidth,
    height: wrapperWidth * 0.6,
    margins: {
      top: 30,
      righgt: 10,
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
  // 4. CREATE THE SCALES
  // 5. DRAW DATA ELEMENT
  // 6. CREATE AND DRAW PERIPHERALS (AXES, LEGENDS, LABELS)
  // 7. INTERACTIONS
};

drawBarChart();
