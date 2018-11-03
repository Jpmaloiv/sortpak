import React, { Component } from 'react';

// Components
import {
  Form,
  Span,
} from '../../../../common'

class InsuranceTab extends Component {
  handleInsuranceChange(update, key) {
    const newState = {
      ...this.props.state[key],
      ...update
    }
    this.props.setState({ [key]: newState })
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
  }

  renderInsuranceForm({ title, key }) {
    const { editing } = this.props.state
    const state = this.props.state[key] || {}
    const insurance = this.props.patient[key] || {}
    const onChange = newState => this.handleInsuranceChange(newState, key)
    return (
      // <div>
      //   <h2>
      //     {title}
      //   </h2>
      //   <Span
      //     label="Plan"
      //     placeholder="Plan"
      //     editing={editing}
      //     value={state.plan}
      //     onChange={plan => onChange({ plan })}
      //   >
      //     {this.props.state.primInsPlan || "None"}
      //   </Span>

      //   <Span
      //     label="BIN"
      //     placeholder="BIN"
      //     editing={editing}
      //     value={state.bin}
      //     onChange={bin => onChange({ bin })}
      //   >
      //     {insurance.bin || "None"}
      //   </Span>

      //   <Span
      //     label="ID"
      //     placeholder="ID"
      //     editing={editing}
      //     value={state.planId}
      //     onChange={planId => onChange({ planId })}
      //   >
      //     {insurance.planId || "None"}
      //   </Span>

      //   <Span
      //     label="PCN"
      //     placeholder="PCN"
      //     editing={editing}
      //     value={state.pcn}
      //     onChange={pcn => onChange({ pcn })}
      //   >
      //     {insurance.pcn || "None"}
      //   </Span>

      //   <Span
      //     label="Type"
      //     placeholder="Type"
      //     editing={editing}
      //     value={state.type}
      //     onChange={type => onChange({ type })}
      //   >
      //     {insurance.type || "None"}
      //   </Span>
      // </div>
      <div></div>
    )
  }

  render() {
    const { className } = this.props
    const insurancesArray = [
      {
        title: 'Primary Insurance',
        key: 'primaryInsurance',
      },
      {
        title: 'Secondary Insurance',
        key: 'secondaryInsurance',
      },
    ]
    return (
      <div className='insuranceTab'>
        {/* {insurancesArray.map(this.renderInsuranceForm.bind(this))} */}
        <table>
          <h2>Primary Insurance</h2><br /><br />
          <tr><td><Span
            label='Plan'
          >{this.props.state.primInsPlan}</Span></td></tr>
          <tr><td><Span label='BIN'>{this.props.state.primInsBIN}</Span></td></tr>
          <tr><td><Span label='ID'>{this.props.state.primInsID}</Span></td></tr>
          <tr><td><Span label='PCN'>{this.props.state.primInsPCN}</Span></td></tr>
          <tr><td><Span label='Type'>{this.props.state.primInsType}</Span></td></tr>
        </table>
        <table>
          <h2>Secondary Insurance</h2><br /><br />
          <tr><td><Span
            label='Plan'
          >{this.props.state.secInsPlan}</Span></td></tr>
          <tr><td><Span label='BIN'>{this.props.state.secInsBIN}</Span></td></tr>
          <tr><td><Span label='ID'>{this.props.state.secInsID}</Span></td></tr>
          <tr><td><Span label='PCN'>{this.props.state.secInsPCN}</Span></td></tr>
          <tr><td><Span label='Type'>{this.props.state.secInsType}</Span></td></tr>
        </table>

      </div>
    )
  }
}

export default InsuranceTab;
