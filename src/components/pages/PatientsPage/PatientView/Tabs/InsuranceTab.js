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

  renderInsuranceForm({title, key}) {
    const { editing } = this.props.state
    const state = this.props.state[key] || {}
    const insurance = this.props.patient[key] || {}
    const onChange = newState => this.handleInsuranceChange(newState, key)
    return (
      <Form key={key}>
        <h2>
          {title}
        </h2>
        <Span
          label="Plan"
          placeholder="Plan"
          editing={editing}
          value={state.plan}
          onChange={plan => onChange({ plan })}
        >
          {insurance.plan || "None"}
        </Span>

        <Span
          label="BIN"
          placeholder="BIN"
          editing={editing}
          value={state.bin}
          onChange={bin => onChange({ bin })}
        >
          {insurance.bin || "None"}
        </Span>

        <Span
          label="ID"
          placeholder="ID"
          editing={editing}
          value={state.planId}
          onChange={planId => onChange({ planId })}
        >
          {insurance.planId || "None"}
        </Span>

        <Span
          label="PCN"
          placeholder="PCN"
          editing={editing}
          value={state.pcn}
          onChange={pcn => onChange({ pcn })}
        >
          {insurance.pcn || "None"}
        </Span>

        <Span
          label="Type"
          placeholder="Type"
          editing={editing}
          value={state.type}
          onChange={type => onChange({ type })}
        >
          {insurance.type || "None"}
        </Span>
      </Form>
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
      <div className={className}>
        {insurancesArray.map(this.renderInsuranceForm.bind(this))}
      </div>
    )
  }
}

export default InsuranceTab;
