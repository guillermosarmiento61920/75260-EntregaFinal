// ticket.model.js
import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

export const TicketModel = model('ticket', ticketSchema);

