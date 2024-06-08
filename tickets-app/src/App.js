import React, { Fragment, useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import TicketList from './Components/TicketList';
import Form from './Components/Form';

function App() {

  const [ticket, setTicket] = useState({
    titulo: '',
    descripcion: '',
    tipo: '',
    fechahorasolicitud: '',
    prioridad: '',
    estado: ''
  });

  const [tickets, setTickets] = useState([]);

  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    const getTicket = () => {
      fetch("http://localhost:3001/api/tickets")
      .then(res => res.json())
      .then(res => setTickets(res))
    }
    getTicket()
    setListUpdated(false)
  }, [listUpdated]);
  

  return (
    <Fragment>
      <Navbar brand = "Tickets App"/>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: "center"}}>Lista de Ticket</h2>
            <TicketList ticket={ticket} setTicket={setTicket} tickets={tickets} setListUpdated={setListUpdated}/>
          </div>
          <div className="col-5">
          <h2 style={{textAlign: "center"}}>Nuevo Ticket</h2>
          <Form ticket={ticket} setTicket={setTicket}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
