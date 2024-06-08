
import fs from "fs";


//Función que lee en el archivo db.json
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  };
  
//Función que escribe en el archivo db.json
const writeData = (data) => {
    try {
      fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
};



const getTickets = (req, res) => {
  try{
  const data = readData();
   res.json(data.tickets);
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
};

const getTicket = (req, res) => {
  try{
    const data = readData();
    const id = parseInt(req.params.id);
    const ticket = data.tickets.find((ticket) => ticket.id === id); 
    res.json(ticket);    
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
};


const addTickets = (req, res) => {
  try{
    const data = readData();
    const body = req.body;
    const { titulo, descripcion, tipo, fechahorasolicitud, prioridad, estado} = body;
    if (titulo === undefined || descripcion === undefined || tipo === undefined || fechahorasolicitud === undefined || prioridad === undefined || estado === undefined){
      res.status(400).JSON({message: "Favor ingrese todos los valores"});
    }    
    const newTicket = {
      id: data.tickets.length + 1,
       ...body,
    };
    data.tickets.push(newTicket);
    writeData(data);
    res.json({message: "Ticket Creado"});  
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
};

const deleteTicket = (req, res) => {
  try{
    const data = readData();
    const id = parseInt(req.params.id);
    const ticketIndex = data.tickets.findIndex((ticket) => ticket.id === id);
    if (ticketIndex != -1){
      data.tickets.splice(ticketIndex, 1);
      writeData(data);
      res.json({message: "Ticket eliminado en forma exitosa"});
    }else{
      res.json({message: "El ticket no existe"});
    }
    
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
};

const updateTicket = (req, res) => {
  try{
    const data = readData();
    const body = req.body;
    const { titulo, descripcion, tipo, fechahorasolicitud, prioridad, estado} = body;
    if (titulo === undefined || descripcion === undefined || tipo === undefined || fechahorasolicitud === undefined || prioridad === undefined || estado === undefined){
      res.status(400).JSON({message: "Favor ingrese todos los valores"});
    }    
    const id = parseInt(req.params.id);
    const ticketIndex = data.tickets.findIndex((ticket) => ticket.id === id);
    data.tickets[ticketIndex] = {
        ...data.tickets[ticketIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Ticket actualizado en forma exitosa"});
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
};



export const methods = {
  getTickets,
  getTicket,
  deleteTicket,
  addTickets,
  updateTicket
};