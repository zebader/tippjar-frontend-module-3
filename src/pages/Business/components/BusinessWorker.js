import React, { Component } from 'react'
import businessService from './../../../lib/business-service';

export default class BusinessWorker extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgUrl:"",
      name : "",
      type: "",
      rating: 0,
      tips: 0,
      };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { name,type } = this.state;
    console.log("Ha hecho submit")

    businessService.updateWorker({ name,type },id)
    .then(() => {
      this.props.history.push('/business');
    })
    .catch((err) => console.log(err)); 
  }

  deleteWorker = () => {
    const { id } = this.props.match.params;
    businessService.deleteWorker(id)
    	.then(() => {
        this.props.history.push('/business')
      })
    	.catch( (err) => console.log(err));
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {

    businessService.getAWorker(this.props.match.params.id)
    .then((worker) => {
      const selectedWorker = worker;
      this.setState({...selectedWorker});
    })
    .catch((err) => console.log(err));

  }
  
  render() {
    return (
      <article className="worker-profile">
        <div className="worker-profile-wrapper">
          <div className="worker-profile-img">
            <img src={this.state.imgUrl} alt={this.state.name}/>
          </div>
          <div className="worker-profile-info">
            <h4>{this.state.name}</h4>
            <h5>{this.state.type}</h5>
            <p>{this.state.rating}</p>
            <p>{this.state.tips}</p>
            <button onClick={() => this.deleteWorker()}>
            DELETE WORKER
            </button>
          </div>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <label>Your worker name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Your worker position:</label>
          <input
            type="text"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
          <input type="submit" value="UPDATE WORKER" />
        </form>


      </article>



    )
  }
}