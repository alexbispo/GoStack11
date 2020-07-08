import { startOfHour } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface CreateAppointmentRequestDto {
  date: Date;
  providerId: string;
}

class CreateAppointmentService {
  public async execute({
    providerId,
    date,
  }: CreateAppointmentRequestDto): Promise<Appointment> {
    const startedDate = startOfHour(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      startedDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: startedDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
