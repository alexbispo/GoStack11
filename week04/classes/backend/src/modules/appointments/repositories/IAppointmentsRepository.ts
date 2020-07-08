import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;

  create(createAppointmentDto: ICreateAppointmentDTO): Promise<Appointment>;

  find(): Promise<Appointment[]>;
}
