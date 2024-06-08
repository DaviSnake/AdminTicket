import React from 'react';

const Form = ({ticket, setTicket}) => {
  
    const handleChange = e => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        //Validacion
        if (ticket.titulo === "" || ticket.descripcion === "" || ticket.tipo === "" || ticket.fechahorasolicitud === "" || ticket.prioridad === "" || ticket.estado === "") {
            alert("Ingrese todos los datos");
            return
        }

        //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ticket)
        }
        fetch('http://localhost:3001/api/tickets', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de ticket
        setTicket({
            titulo: '',
            descripcion: '',
            tipo: '',
            fechahorasolicitud: '',
            prioridad: '',
            estado: ''
        })

    }
  
    return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Titulo</label>
            <input name = "titulo" onChange={handleChange} type="text" id="title" className="form-control"/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <input name = "descripcion" onChange={handleChange} type="text" id="description" className="form-control"/>
        </div>
        <div className="mb-3">
            <label htmlFor="type" className="form-label">Tipo</label>
            <select name = "tipo" onChange={handleChange} id="type" className="form-select">
                <option selected>Seleccione una opción</option>
                <option value="Funcional">Funcional</option>
                <option value="Operacional">Operacional</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input name = "fechahorasolicitud" onChange={handleChange} type="text" id="fecha" className="form-control"/>
        </div>
        <div className="mb-3">
            <label htmlFor="prioridad" className="form-label">Prioridad</label>
            <select name = "prioridad" onChange={handleChange} id="prioridad" className="form-select">
                <option selected>Seleccione una opción</option>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="estado" className="form-label">Estado</label>
            <select name = "estado" onChange={handleChange} id="estado" className="form-select">
                <option selected>Seleccione una opción</option>
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  )
}

export default Form;