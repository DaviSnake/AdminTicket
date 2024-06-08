import React from "react";

const TicketList = ({ticket, setTicket, tickets, setListUpdated}) => {
    
    const handleDelete = id => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:3001/api/tickets/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true)
    }

    const handleUpdate = id => {

        //validación de los datos
        if (ticket.titulo === "" || ticket.descripcion === "" || ticket.tipo === "" || ticket.fechahorasolicitud === "" || ticket.prioridad === "" || ticket.estado === "") {
            alert("Ingrese todos los datos");
            return
        }
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ticket)
        }
        fetch('http://localhost:3001/api/tickets/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
        setTicket({
            titulo: '',
            descripcion: '',
            tipo: '',
            fechahorasolicitud: '',
            prioridad: '',
            estado: ''
        })

        setListUpdated(true)
    }
    
    return (
      <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Prioridad</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            {tickets.map(ticket => (
                <tr key ={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.titulo}</td>
                    <td>{ticket.descripcion}</td>
                    <td>{ticket.tipo}</td>
                    <td>{ticket.fechahorasolicitud}</td>
                    <td>{ticket.prioridad}</td>
                    <td>{ticket.estado}</td>
                    <td>
                        <div className="mb-3">
                            <button onClick={() => handleDelete(ticket.id)} className="btn btn-danger">Eliminar</button>
                        </div>
                        <div className="mb-3">
                            <button onClick={() => handleUpdate(ticket.id)} className="btn btn-dark">Actualizar</button>
                        </div>
                    </td>
                </tr>
            ))}
            
        </tbody>
      </table>
    )
  }
  
  export default TicketList;
  