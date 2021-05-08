import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      names: ['','',''],
      assignments: {}
    }

    this.updateName = this.updateName.bind(this)
    this.addName = this.addName.bind(this)
    this.generateAssignments = this.generateAssignments.bind(this)
  }

  updateName(value, index) {
    let names = [...this.state.names]
    names[index] = value
    
    this.setState({
      names: names
    })
  }

  addName() {
    let names = [...this.state.names]
    names.push('')
    
    this.setState({
      names: names
    })
  }

  generator(names) {
    let assignments = {}
    let tracker = {}

    for (let i = 0; i < names.length; i++) {
      let name = names[i]
      if (name !== '' && name !== undefined) {
        tracker[name] = 0
      }
    }

    if (Object.keys(tracker).length > 2) {
      for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let assigned = false

        if (name !== '' && name !== undefined) {
          if (i === names.length - 1 && tracker[name] === 0) {
            return this.generator(names)
          }
          while (!assigned) {
            let random = Math.floor(Math.random() * names.length)
            if (random !== i) {
              let assignee = names[random]
              if (tracker[assignee] === 0) {
                assignments[name] = assignee
                tracker[assignee]++
                assigned = true
              }
            }
          }
        }
      }
    }

    return assignments
  }

  generateAssignments() {
    let assignments = this.generator(this.state.names)

    this.setState({
      assignments: assignments
    })
  }

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 card mx-auto p-5 main-card">
            <h1>Christmas Gift Exchange</h1>
            {this.state.names.map((name, index) => {
              return (
                <div key={index}>
                  <input placeholder={`Name ${index + 1}`} className="form-control" id={`name-input-${index}`} type="text" onChange={(e) => this.updateName(e.target.value, index)} />
                </div>
              )
            })}
            <button className="btn btn-primary ml-2 add-name-button" onClick={this.addName}>Add a Name</button>
            <br />
            <button disabled={this.state.names.length < 3} className="btn btn-primary mt-3" onClick={this.generateAssignments}>Generate List</button>

            <div className="assignments mx-auto">
            {Object.keys(this.state.assignments).map((key) => {
              return (
                <>
                <div>{key}</div> 
                <div>-&gt;</div>
                <div>{this.state.assignments[key]}</div>
                </>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
