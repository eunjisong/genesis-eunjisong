import React, { Component } from "react";
import { data } from "./data.js";
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      age: ""
    };
    this.handleAge = this.handleAge.bind(this);
  }

  componentDidMount() {
    this.setState({ data: data() });
  }

  handleAge(event) {
    this.setState({ age: event.target.value });
  }

  render() {
    const { data, age } = this.state;
    const alphabet = "ABCEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let selectedAge;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Genesis Report</h1>
        </header>

        <p className="App-intro">
          Please hold shift the sub-headers when multi sorting!
        </p>


        <div className="table">
          <ReactTable
            data={data}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value
            }
            columns={[
              {
                Header: "Table",
                columns: [
                  ////////// Row # //////////
                  {
                    Header: "Row #",
                    id: "id",
                    accessor: d => data.indexOf(d) + 1,
                    width: 100
                  },

                  ////////// First Name //////////
                  {
                    Header: "First Name",
                    id: "firstName",
                    accessor: d =>
                      d.firstName[0].toUpperCase() + d.firstName.slice(1),
                    filterMethod: (filter, row) =>
                      row[filter.id].startsWith(filter.value)
                  },

                  ////////// Last Name //////////
                  {
                    Header: "Last Name",
                    id: "lastName",
                    accessor: d =>
                      d.lastName[0].toUpperCase() + d.lastName.slice(1),
                    Filter: ({ filter, onChange }) => (
                      <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%", height: "30px" }}
                        value={filter ? filter.value : "all"}
                      >
                        <option value="all">Show All</option>
                        {alphabet.map(a => (
                          <option key={alphabet.indexOf(a)} value={a}>
                            Start with {a}
                          </option>
                        ))}
                      </select>
                    ),
                    filterMethod: (filter, row) => {
                      // if() row[filter.id].toString()[0] === filter.value[0]
                      if (filter.value == "all") return true;
                      return row[filter.id].startsWith(filter.value);
                    }
                  },

                  ////////// Age Range //////////
                  {
                    Header: "Age Range",
                    accessor: "age",
                    filterMethod: (filter, row) => {
                      console.log(filter, row);
                      if (filter.value === "50") return row[filter.id];
                      else if (filter.value.length === 1)
                        return (
                          row[filter.id].toString()[0] ==
                          filter.value.toString()[0]
                        );
                      else return row[filter.id] == filter.value;
                    },
                    Filter: ({ filter, onChange }) => (
                      <div className="specific-age">
                        <input
                          className="rangeBar"
                          onChange={event => onChange(event.target.value)}
                          type="range"
                          min="20"
                          max="50"
                          value={filter ? filter.value : "all"}
                        />



                        <span className="selectedNumber">
                          {filter && filter.value.length == 1 ?
                            selectedAge = filter.value + '0' :
                           filter && filter.value == '50' ?
                            selectedAge = 'all' :
                           filter && filter.value
                          }
                        </span>
                      </div>
                    )
                  },

                  ////////// Age Selection //////////
                  {
                    Header: "Age",
                    accessor: "age",
                    Filter: ({ filter, onChange }) => (
                      <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%", height: "30px" }}
                        value={filter ? filter.value : "50"}
                      >
                        <option value="50">Show All</option>
                        <option label="20~29 yrs old" value="2" />
                        <option label="30~39 yrs old" value="3" />
                        <option label="40~49 yrs old" value="4" />
                      </select>
                    )
                  },

                  ////////// Status //////////
                  {
                    Header: "Status",
                    accessor: "status",
                    filterMethod: (filter, row) => {
                      if (filter.value === "all") return true;
                      else if (filter.value === "true")
                        return row[filter.id] === "Employed";
                      else return row[filter.id] === "Unemployed";
                    },
                    Filter: ({ filter, onChange }) => (
                      <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%", height: "30px" }}
                        value={filter ? filter.value : "all"}
                      >
                        <option value="all">Show All</option>
                        <option value="true">Employed</option>
                        <option value="false">Unemployed</option>
                      </select>
                    )
                  },

                  ////////// Marital Status //////////
                  {
                    Header: "Marital Status",
                    accessor: "marital",
                    filterMethod: (filter, row) => {
                      if (filter.value === "all") return true;
                      else if (filter.value === "true")
                        return row[filter.id] === "Married";
                      else return row[filter.id] === "Single";
                    },
                    Filter: ({ filter, onChange }) => (
                      <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%", height: "30px" }}
                        value={filter ? filter.value : "all"}
                      >
                        <option value="all">Show All</option>
                        <option value="true">Married</option>
                        <option value="false">Single</option>
                      </select>
                    )
                  }
                ]
              }
            ]}
            style={{
              height: "480px"
            }}
            defaultPageSize={20}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
