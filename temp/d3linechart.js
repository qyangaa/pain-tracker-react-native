function DrawChart() {
  const svgHeight = 200;
  const svgWidth = 400;
  const paddingLeft = 10;
  const paddingRight = 30;
  const paddingBottom = 20;
  const initialData = [35, 5, 15, 60, 20, 40, 10, 75, 60, 32];
  const randomData = [...Array(10)].map((e) => ~~(Math.random() * 100));
  const [dataSet, setData] = React.useState(initialData);

  const svgRef = React.useRef();

  // Called initially and every data change, with the value passed in the array
  React.useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([0, initialData.length - 1])
      .range([paddingLeft, svgWidth - paddingRight]);
    const maxValue = Math.max(...initialData);
    const highestYValue = svgHeight - maxValue + paddingBottom;
    const yScale = d3
      .scaleLinear()
      .domain([0, highestYValue])
      .range([svgHeight - paddingBottom, 0]);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(dataSet.length)
      .tickFormat((index) => index + 1);
    svg
      .select(".x-axis")
      .style("transform", ` translateY(${svgHeight - paddingBottom}px)`)
      .call(xAxis);

    const yAxis = d3.axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", ` translateX(${svgWidth - paddingRight}px)`)
      .call(yAxis);
    const myLine = d3
      .line()
      .x((value, index) => xScale(index))
      .y(yScale) // equivalent to value => yScale(value)
      .curve(d3.curveCardinal);
    svg
      .selectAll(".line")
      .data([dataSet])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine) // equivalent tovalue => myLine(value)
      .attr("fill", "none")
      .attr("stroke", "orange");
  }, [dataSet, initialData, randomData]);

  return (
    <React.Fragment>
      <h2>Curved Line Chart: X and Y Axis</h2>
      <svg width={svgWidth} height={svgHeight} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <button onClick={() => setData(dataSet.map((value) => value + 5))}>
        Update + 5
      </button>
      <span>&nbsp;</span>
      <button onClick={() => setData(dataSet.filter((value) => value > 30))}>
        Filter {">"} 30
      </button>
      <span>&nbsp;</span>
      <button onClick={() => setData(dataSet.filter((value) => value < 30))}>
        Filter {"<"} 30
      </button>
      <button onClick={() => setData(randomData)}>Random </button>
      <span>&nbsp;</span>
      <button className="reset" onClick={() => setData(initialData)}>
        Reset{" "}
      </button>
      <span>&nbsp;</span>
    </React.Fragment>
  );
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DrawChart />
        <p>
          Thanks to @The Muratorium{" "}
          <a
            href="https://www.youtube.com/channel/UCKfcSawDV88REF9jVwqqbag"
            target="_blank"
          >
            Youtube
          </a>
          .
        </p>
      </div>
    );
  }
}

const appElement = document.getElementById("app");
ReactDOM.render(<App />, appElement);
