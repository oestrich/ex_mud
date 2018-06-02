import React from 'react';

class Colors extends React.Component {
  constructor(props) {
    super(props);

    this.colors = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    this.changeColor = this.changeColor.bind(this);
  }

  buttonClassName(symbol) {
    if (symbol == this.props.selectedColor) {
      return "btn btn-primary";
    } else {
      return "btn btn-default";
    }
  }

  changeColor(color) {
    let handleColorChange = this.props.handleColorChange;

    return () => {
      handleColorChange(color);
    };
  }

  render() {
    let colors = this.colors;
    let changeColor = this.changeColor;

    return (
      <div>
        {colors.map((color, index) => {
          return (
            <button key={index} onClick={changeColor(color)} className={this.buttonClassName(color)}>{color}</button>
          );
        })}
      </div>
    );
  }
}

class Symbols extends React.Component {
  constructor(props) {
    super(props);
    this.symbols = [
      "~", "!", "$", "%", "^", "&", "|", "*", ".", ";", "#",
      ",", "_", "-", "[", "]", "{", "}", "\\", "/", "<", ">",
    ];
    this.changeSymbol = this.changeSymbol.bind(this);
  }

  buttonClassName(symbol) {
    if (symbol == this.props.selectedSymbol) {
      return "btn btn-primary";
    } else {
      return "btn btn-default";
    }
  }

  changeSymbol(symbol) {
    let handleSymbolChange = this.props.handleSymbolChange;

    return () => {
      handleSymbolChange(symbol);
    };
  }

  render() {
    let symbols = this.symbols;
    let changeSymbol = this.changeSymbol;

    return (
      <div>
        {symbols.map((symbol, index) => {
          return (
            <button key={index} onClick={changeSymbol(symbol)} className={this.buttonClassName(symbol)}>{symbol}</button>
          );
        })}
      </div>
    );
  }
}

class MapCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    }

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(event) {
    this.setState({hover: true});
  }

  onMouseLeave(event) {
    this.setState({hover: false});
  }

  render() {
    let color = this.state.hover ? this.props.selectedColor : this.props.color;
    let symbol = this.state.hover ? this.props.selectedSymbol : this.props.symbol;

    let handleClick = this.props.handleClick;

    return (
      <span style={{color: color, display: "inline-block"}} onClick={handleClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {symbol}
      </span>
    );
  }
}

class MapRow extends React.Component {
  render() {
    let row = this.props.row;
    let selectedSymbol = this.props.selectedSymbol;
    let selectedColor = this.props.selectedColor;

    let handleClick = this.props.handleClick;

    return (
      <div>
        {row.map((cell, index) => {
          let symbol = cell[0];
          let color = cell[1];

          let cellHandleClick = (event) => {
            handleClick(index);
          }

          return (
            <MapCell key={index} symbol={symbol} color={color} handleClick={cellHandleClick} selectedSymbol={selectedSymbol} selectedColor={selectedColor} />
          );
        })}
      </div>
    );
  }
}

export default class WorldMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSymbol: "%",
      selectedColor: "white",
      map: [
        [
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
        ],
        [
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
        ],
        [
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
        ],
        [
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
        ],
        [
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
        ],
        [
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
          [".", "green"], [".", "green"], [".", "green"], [".", "green"], [".", "green"],
        ],
      ]
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSymbolChange = this.handleSymbolChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({selectedColor: color});
  }

  handleSymbolChange(symbol) {
    this.setState({selectedSymbol: symbol});
  }

  handleClick(x, y) {
    console.log(`Changing ${x}, ${y}`);

    let map = this.state.map;
    let symbol = this.state.selectedSymbol;
    let color = this.state.selectedColor;

    let row = map[y];
    row.splice(x, 1, [symbol, color]);
    map[y] = row;

    this.setState({
      map: map,
    });
  }

  render() {
    let map = this.state.map;
    let selectedSymbol = this.state.selectedSymbol;
    let selectedColor = this.state.selectedColor;

    return (
      <div>
        <Colors handleColorChange={this.handleColorChange} selectedColor={selectedColor} />
        <Symbols handleSymbolChange={this.handleSymbolChange} selectedSymbol={selectedSymbol} />

        <div className="world-map terminal">
          {map.map((row, index) => {
            let rowHandleClick = (x) => {
              this.handleClick(x, index);
            };

            return (
              <MapRow key={index} row={row} handleClick={rowHandleClick} selectedSymbol={selectedSymbol} selectedColor={selectedColor} />
            );
          })}
        </div>
      </div>
    );
  }
}
