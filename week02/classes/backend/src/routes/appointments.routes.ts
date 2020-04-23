import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  try {
    console.log(req.user);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const allAppointments = await appointmentsRepository.find();

    return res.json(allAppointments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { providerId, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
