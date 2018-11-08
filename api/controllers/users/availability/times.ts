declare var sails: any;

const oneDayMillis = 24 * 60 * 60 * 1000

module.exports = {
  friendlyName: 'Fetchs user availability, times the service professional is \
    available to be booked.',
  description: 'It returns the calendar availability by date ranges of variable \
    size, with startTime, endTime and availability of the time range/slot. \
    It includes extra properties with relevant information about the user \
    schedule.',
  inputs: {
    id: {
      example: '141',
      required: true
    },
    start: {
      example: '2018-10-24T22:00:00Z',
      defaultsTo: new Date().toISOString()
    },
    end: {
      example: '2018-10-25T22:00:00Z',
      defaultsTo: new Date(new Date().getTime() + oneDayMillis).toISOString()
    }
  },
  exits: {
    success: {
      outputExample: {
        incrementsSizeInMinutes: {
          example: 15
        }
      }
    },
    notFound: {
      responseType: 'notFound'
    }
  },
  fn: async function(inputs, exits) {
    const {id, start, end} = inputs
    // TODO implement Times

    //sails.log(`targetUserId: ${targetUserId}`)
    sails.log(`id: ${id}`)
    sails.log(`start: ${start}`)
    sails.log(`end: ${end}`)
    const schedulePreferences = await sails.helpers.getSchedulingPreferences(id)
    sails.log(`schedulePreferences: `, schedulePreferences)

    const useAdvanceTime = true
    // TODO do we need to implement the scheduling alert check now?
    //    https://github.com/loconomics/loconomics/blob/master/database/stored-procedures/TestAlertAvailability.StoredProcedure.sql#L14
    //    called here: https://github.com/loconomics/loconomics/blob/master/web/App_Code/LcCalendar.cs#L1748

      // TODO implement GetUserTimeline as Helper?
      // TODO implement GetTimelinePublicOutputFormat

    // const sql = await sails.helpers.mssql()
    // const profileData = await sql.query(``)
    // const userProfile = profileData.recordset[0]

    const record = {
      incrementsSizeInMinutes: 10
    }
    return exits.success(record)
  }
}
