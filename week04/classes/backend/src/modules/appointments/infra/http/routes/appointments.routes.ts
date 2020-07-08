import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', async (req, res) => {
  const allAppointments = await appointmentsRepository.find();

  return res.json(allAppointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { providerId, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointmentService.execute({
    providerId,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
