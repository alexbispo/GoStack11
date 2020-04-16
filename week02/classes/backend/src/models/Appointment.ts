import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  constructor(public provider: string, public date: Date) {
    this.id = uuid();
  }
}

export default Appointment;
