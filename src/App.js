import React, { Component } from "react";
import "./App.css";
import { data } from "./data.js";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { BrowserRouter } from "react-router-dom";


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: data()
    };
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <BrowserRouter>
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
                  {
                    Header: "Row #",
                    id: "id",
                    accessor: d => data.indexOf(d) + 1,
                    width: 100

                  },
                  {
                    Header: "First Name",
                    id: "firstName",
                    accessor: d => d.firstName[0].toUpperCase() + d.firstName.slice(1),
                    filterMethod: (filter, row) =>
                      row[filter.id].startsWith(filter.value)
                  },
                  {
                    Header: "Last Name",
                    id: "lastName",
                    accessor: d => d.lastName[0].toUpperCase() + d.lastName.slice(1),
                    filterMethod: (filter, row) =>
                      row[filter.id].startsWith(filter.value)
                  },
                  {
                    Header: "Age",
                    accessor: "age"
                  },
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
                        style={{ width: "100%", height: "30px"}}
                        value={filter ? filter.value : "all"}
                      >
                        <option value="all">Show All</option>
                        <option value="true">Employed</option>
                        <option value="false">Unemployed</option>
                      </select>
                    )
                  },
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
      </BrowserRouter>
    );
  }
}

export default App;
