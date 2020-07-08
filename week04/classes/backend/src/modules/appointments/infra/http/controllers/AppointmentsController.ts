import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { providerId, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );
    const appointment = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
    });

    return res.json(appointment);
  }

  // public async index(req: Request, res: Response): Promise<Response> {
  //   const allAppointments = await this.appointmentsRepository.find();

  //   return res.json(allAppointments);
  // }
}
