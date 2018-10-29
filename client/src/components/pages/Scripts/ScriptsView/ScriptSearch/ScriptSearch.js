import React from 'react'

import { ActionBox, SearchBar, Selector, ToggleSwitch } from '../../../../common'
import { Button, ButtonGroup } from 'react-bootstrap';

class ScriptSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: [1, 3],
      special: true,
      /* selected: {
        RX: false,
        HC: false,
      } */
      RX: false,
      HC: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    this.setState(prevState => ({
      special: !prevState.special
    }));
    // console.log(this.state.special)
    this.submitSearch();
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChange(e) {
    console.log(e.target.value);
    const key = e.target.value; // e.g. 'A'
    if (key === 'RX') {
      this.setState({
        RX: true,
        HC: false
      })
    } else if (key === 'HC') {
      this.setState({
        RX: false,
        HC: true
      })
    }
    this.submitSearch();
    // const value = !this.state.selected[key];
    //  const newSelected = Object.assign(this.state.selected, {[key]: value});
    //  console.log(newSelected)
    // this.setState({ selected: newSelected });
    // console.log('this.state', this.state); 
  }


  submitSearch = (event) => {
    console.log(this.state.RX, this.state.HC)
    let searchParams = "?";
    if (this.state.RX) searchParams += '&homeCare=false'
    if (this.state.HC) searchParams += '&homeCare=true'
    if (this.state.special) searchParams += "&salesCode=M"
    this.props.searchFunc(searchParams);
  }


  render() {
    // console.log(this.state.RX, this.state.HC)
    console.log(this.state.special)

    const {
      filterValue,
      searchValue
    } = this.state

    const Type2Options = [
      'SP',
      'Third Party',
    ]

    const SpecialOptions = [
      'Medicare',
    ]

    const RepOptions = [
      'All Reps',
      'No Reps',
      'EE',
    ]

    const SpecializationOptions = [
      'All Specializations',
      'No Specialization',
      'EE'
    ]

    const StatusValues = [
      "Received",
      "Review",
      "Prior Auth",
      "Process",
      "Copay Assistance",
      "Schedule",
      "QA",
      "Fill",
      "Shipped",
      "Done",
      "Cancelled",
      "Refill",
    ]


    return (
      <div>

        <ActionBox>
          <div className='main'>

            <ButtonGroup
              className="scriptSearch"
              value={this.state.value}
              onClick={this.handleChange}
            >
              <label>Type</label>
              <Button value='RX'>RX</Button>
              <Button value='HC'>HC</Button>
            </ButtonGroup>

            {/* <ToggleButtonGroup
              className="scriptSearch"
              type="checkbox"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <ToggleButton value={1}>RX</ToggleButton>
              <ToggleButton value={2}>HC</ToggleButton>
              
              
            </ToggleButtonGroup> */}

            <ToggleSwitch
              label="Special"
              options={SpecialOptions}
              onClick={this.handleClick}
            />

            <ToggleSwitch
              label="Type"
              options={Type2Options}
              selected={filterValue}
              onSelect={filterValue => this.setState({ filterValue })}
            />
            <SearchBar
              selected={searchValue}
              onSelect={searchValue => this.setState({ searchValue })}
              label="Search"
              placeholder="Search..."
            />
          </div>
        </ActionBox>
        <ActionBox>
          <div className="main">
            <Selector
              label="Rep"
              options={RepOptions}
              selected={filterValue}
              onSelect={filterValue => this.setState({ searchValue })}
            />
            <Selector
              label="Specialization"
              options={SpecializationOptions}
              selected={filterValue}
              onSelect={filterValue => this.setState({ searchValue })}
            />
          </div>
        </ActionBox>
        <ActionBox>
          <div className="main">
            <ToggleSwitch
              label="Type"
              options={StatusValues}
              selected={filterValue}
              onSelect={filterValue => this.setState({ searchValue })}
              allowsMultipleSelection
            />
          </div>
        </ActionBox>
      </div>
    )
  }
}


export default ScriptSearch;