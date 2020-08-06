import express from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes';

const classesRoutes = express.Router()

// interface User {
//   id: number
//   name: string
//   avatar: string
//   whatsapp: string
//   bio: string
// }
interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

classesRoutes
  // Create Class - 'classes'
  .post('/', async (req, resp) => {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction()
    try {

      const insertedUsers = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })

      const insertedClasses = await trx('classes').insert({
        subject,
        cost,
        user_id: insertedUsers[0]
      })

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id: insertedClasses[0],
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        }
      })
      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return resp.status(201).json({ message: 'user and classes was created!' })
    } catch (error) {
      console.log(error);
      await trx.rollback()

      return resp.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  })

  .get('/', async (req, resp) => {
    const filters = req.query

    const week_day = Number(filters.week_day)
    const subject = filters.subject as string
    const time = filters.time as string

    const timeConverted = convertHourToMinutes(time as string)
    console.log(timeConverted);

    // const cnn = await db('classes as c')
    const classes = await db('classes as c')
      // .join('class_schedule as s', 's.class_id', '=', 'c.id')
      .join('users as u', 'u.id', '=', 'c.user_id')
      .where('c.subject', subject)
      // .where('s.week_day', week_day)
      .whereExists(function () {
        this.select('s.*')
          .from('class_schedule as s')
          .whereRaw('`s`.`class_id` = `c`.`id`')
          .whereRaw('`s`.`week_day` = ??', [week_day])
          .whereRaw('`s`.`from` <= ??', [timeConverted])
          .whereRaw('`s`.`to` > ??', [timeConverted])
      })

    return resp.json(classes)
  })
  // Delete User
  .delete('/:id', (req, resp) => {
    return resp.json({ message: `User ${req.params.id} was deleted!` })

  })

export default classesRoutes
