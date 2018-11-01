import React from 'react'

import { ActionBox, SearchBar, Selector } from '../../../../common'
import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

class ScriptSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      RX: false,
      HC: false,
      special: false,
      SP: false,
      thirdParty: false,
      statusReceived: '',
      statusReview: '',
      statusPriorAuth: '',
      statusProcess: '',
      statusCopayAssistance: '',
      statusSchedule: '',
      statusQA: '',
      statusFill: '',
      statusShipped: '',
      statusDone: '',
      statusCancelled: '',
      statusRefill: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.statusQuery = this.statusQuery.bind(this);
  }


  handleClick(e) {
    this.setState({ special: e.includes(1) }, this.submitSearch)
  }

  statusQuery(e) {
    this.setState({ statusReceived: e.includes(1) }, this.submitSearch)
    this.setState({ statusReview: e.includes(2) }, this.submitSearch)
    this.setState({ statusPriorAuth: e.includes(3) }, this.submitSearch)
    this.setState({ statusProcess: e.includes(4) }, this.submitSearch)
    this.setState({ statusCopayAssistance: e.includes(5) }, this.submitSearch)
    this.setState({ statusSchedule: e.includes(6) }, this.submitSearch)
    this.setState({ statusQA: e.includes(7) }, this.submitSearch)
    this.setState({ statusFill: e.includes(8) }, this.submitSearch)
    this.setState({ statusShipped: e.includes(9) }, this.submitSearch)
    this.setState({ statusDone: e.includes(10) }, this.submitSearch)
    this.setState({ statusCancelled: e.includes(11) }, this.submitSearch)
    this.setState({ statusRefill: e.includes(12) }, this.submitSearch)
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChange(e) {
    const key = e.target.value; // e.g. 'A'
    if (key === 'RX') { this.setState({ RX: true, HC: false }, this.submitSearch) }
    else if (key === 'HC') { this.setState({ RX: false, HC: true }, this.submitSearch) }
    else if (key === 'SP') { this.setState({ SP: true, thirdParty: false }, this.submitSearch) }
    else if (key === 'Third Party') { this.setState({ SP: false, thirdParty: true }, this.submitSearch) }
  }


  submitSearch = (event) => {
    let searchParams = "?patient=null";
    let status = "";
    if (this.state.RX) searchParams += '&homeCare=0'
    if (this.state.HC) searchParams += '&homeCare=1'
    if (this.state.thirdParty) searchParams += '&location=' + true
    if (this.state.special) searchParams += '&salesCode=M'
    if (this.state.statusReceived) status += ',Received'
    if (this.state.statusReview) status += ',Review'
    if (this.state.statusPriorAuth) status += ',Prior Auth'
    if (this.state.statusProcess) status += ',Process'
    if (this.state.statusCopayAssistance) status += ',Copay Assistance'
    if (this.state.statusSchedule) status += ',Schedule'
    if (this.state.statusQA) status += ',QA'
    if (this.state.statusFill) status += ',Fill'
    if (this.state.statusShipped) status += ',Shipped'
    if (this.state.statusDone) status += ',Done'
    if (this.state.statusCancelled) status += ',Cancelled'
    if (this.state.statusRefill) status += ',Refill'
    var statusFilter = status.substring(1);
    console.log(statusFilter);
    if (status) searchParams += '&status=' + statusFilter
    this.props.searchFunc(searchParams);
  }


  render() {

    const {
      filterValue,
      searchValue
    } = this.state

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

    return (
      <div className="scriptList">

        <ActionBox>
          <div className='main'>

            <ButtonGroup
              className="scriptSearch"
              value={this.state.value}
              onClick={this.handleChange}
            >
              <label>Type</label>
              <Button className="first" value='RX'>RX</Button>
              <Button className="last" value='HC'>HC</Button>
            </ButtonGroup>

            <ToggleButtonGroup className="scriptSearch" type="checkbox" onChange={this.handleClick}>
              <label>Special</label>
              <ToggleButton className='single' value={1}>Medicare</ToggleButton>
            </ToggleButtonGroup>

            <ButtonGroup
              className="scriptSearch"
              value={this.state.value}
              onClick={this.handleChange}
            >
              <label>Type</label>
              <Button className="first" value='SP'>SP</Button>
              <Button className="last" value='Third Party'>Third Party</Button>
            </ButtonGroup>



            <SearchBar
              className="searchBar"
              style={{ 'width': '350px' }}
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
          <div className="main" style={{ paddingTop: 0 }}>
            <ToggleButtonGroup className="scriptSearch" type="checkbox" onChange={this.statusQuery}>
              <label>Type</label>
              <ToggleButton className='first' value={1}>Received</ToggleButton>
              <ToggleButton value={2}>Review</ToggleButton>
              <ToggleButton value={3}>Prior Auth</ToggleButton>
              <ToggleButton value={4}>Process</ToggleButton>
              <ToggleButton value={5}>Copay Assistance</ToggleButton>
              <ToggleButton value={6}>Schedule</ToggleButton>
              <ToggleButton value={7}>QA</ToggleButton>
              <ToggleButton value={8}>Fill</ToggleButton>
              <ToggleButton value={9}>Shipped</ToggleButton>
              <ToggleButton value={10}>Done</ToggleButton>
              <ToggleButton value={11}>Cancelled</ToggleButton>
              <ToggleButton className='last' value={12}>Refill</ToggleButton>

            </ToggleButtonGroup>

            {/* <ToggleSwitch
              label="Type"
              options={StatusValues}
              selected={filterValue}
              onSelect={filterValue => this.setState({ searchValue })}
              allowsMultipleSelection
            /> */}
          </div>
        </ActionBox>
      </div>
    )
  }
}


export default ScriptSearch;