'use strict';
import {Button} from 'primereact/components/button/Button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: []};
		this.handleClick1 = this.handleClick1.bind(this);
	}

	componentDidMount() {
		client({method: 'GET', path: '/sample'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	};

	setstat(mesg){
		this.setState({msg: mesg});
	}
	handleClick1(){
		client({method: 'GET', path: '/sample'}).done(response => {
			// setstat(response.raw);
			console.log(response.entity);
			this.setState({msg: response.raw});
		});
	};
	render() {
		return (
			<div>
			<EmployeeList employees={this.state.employees} msg={this.state.msg}/>
			<Button label="Call REST" onClick = {this.handleClick1} className="ui-button-success"/>
			</div>
		)
	}
}
// end::app[]

// tag::employee-list[]
class EmployeeList extends React.Component{
	render() {
		
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
						<th>{this.props.msg}</th>
						<th>{this.props.employees}</th>
					</tr>
					
				</tbody>
			</table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		)
	}
}
// end::employee[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]

