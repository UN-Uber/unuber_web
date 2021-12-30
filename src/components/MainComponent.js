import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';
import { TransitionGroup} from 'react-transition-group';
import CreateClient from '../components/CreateClientComponent';
import {addClient, fetchClient, fetchClients, fetchCardsClient, updateClient, deleteClient} from '../redux/actionCreators';

const mapStateToProps = state => {
    return{
        client : state.client,
        clients: state.clients
    }
}

const mapDispatchToProps = (dispatch) => ({
    addClient: (client) => dispatch(addClient(client)),
    fetchClients: () => {dispatch(fetchClients())},
    fetchClient: (id) => {dispatch(fetchClient(id))},
    fetchCardsClient: (id) => {dispatch(fetchCardsClient(id))},
    updateClient: (id, client) => dispatch(updateClient(id,client)),
    deleteClient: (id) => dispatch(deleteClient(id))
});

class Main extends Component{
    componentDidMount(){
        console.log("Se monto componente pricipal");
    }

    render(){
        const HomePage = () => {
            return(
                <h1>Esta es la pagina pricipal</h1>
            );
        }

        const AddClientElement = () => {
            return(
                <CreateClient addClient={this.props.addClient} fetchClients={this.props.fetchClients} />
            );
        };

        return(
            <div>
                <TransitionGroup>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route path="/client" component={AddClientElement}/>
                        <Redirect to="/home" />
                    </Switch>
                </TransitionGroup>
            </div>
        );
    }
}


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main)))





