import React from 'react'

import {ActionBox, SearchBar, Selector, ToggleSwitch} from '../../../../common'

class ScriptSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type1RX: true,
      type1HC: true, 
      special: true
    }

    this.handleClick = this.handleClick.bind(this);
  }


    handleClick() {
      this.setState(prevState => ({
        special: !prevState.special
      }));
      this.submitSearch();
    }

    handleType1() {
      this.setState(prevState => ({
        type1RX: !prevState.type1RX
      }));
      this.submitSearch();
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
   

    submitSearch = (event) => {
        // console.log(this.state.checked)
        console.log(this.state.special);
        let searchParams = "?";
        if (this.state.special) searchParams += "&salesCode=M"
        this.props.searchFunc(searchParams);
    }


    render() {

      console.log(this.state.isToggleOn);
      
          const {
            filterValue,
            searchValue
          } = this.state
      
          const Type1Options = [
            'RX',
            'HC',
          ]
      
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

    
        return(
            <div>

                <ActionBox>
              <div className='main'>
                <ToggleSwitch
                  label="Type"
                  options={Type1Options}
                  selected={filterValue}
                  onSelect={filterValue => this.setState({ filterValue })}
                />
                
                <ToggleSwitch               
                    label="Special"
                    options={SpecialOptions}
                    onClick={this.handleClick}                  
                    disabled={this.state.special}                                    
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