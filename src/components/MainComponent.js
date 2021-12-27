import { Routes, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';
import { TransitionGroup} from 'react-transition-group';
import CreateClient from '../components/CreateClientComponent';

const mapStateToProps = state => {
    return{
        client : state.client,
        clients: state.clients
    }
}

const mapDispatchToProps = (dispatch) => ({
    addClient: (client) => dispatch(addClient(client)),
    fetchClients: () => {dispatch(fetchClients())},
    fetchClient: () => {dispatch(fetchClient())},
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

        return(
            <div>
                <TransitionGroup>
                    <Routes>
                        <Route path='/home' element={HomePage} />
                        <Route path="/client" element={CreateClient}/>
                        <Redirect to="/home" />
                    </Routes>
                </TransitionGroup>
            </div>
        );
    }
}


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main)))





