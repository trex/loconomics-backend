declare var sails: any;

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
      defaultsTo: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
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
    //const targetUserId = this.req.param('id')
    const {id, start, end} = inputs

    //sails.log(`targetUserId: ${targetUserId}`)
    sails.log(`id: ${id}`)
    sails.log(`start: ${start}`)
    sails.log(`end: ${end}`)

    // const sql = await sails.helpers.mssql()
    // const profileData = await sql.query(``)
    // const userProfile = profileData.recordset[0]

    const record = {
      incrementsSizeInMinutes: 10
    }
    return exits.success(record)
  }
}
