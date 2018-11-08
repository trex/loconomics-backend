declare var sails: any;

module.exports = {
  friendlyName: 'Query db for user scheduling preferences',
  description: 'Return a user\'s scheduling preferences from the database, default \
     preferences are set in DB if a record does not yet exis.  Can be used for \
     shared calendar syncing and scheduling preferences.',
  inputs: {
    userID: {
      type: 'number',
      example: 141,
      required: true
    }
  },
  fn: async function (inputs, exits) {
    const {userID} = inputs
    const sql = await sails.helpers.mssql()
    let result = {}
    const selectData = await sql.query(`SELECT
        AdvanceTime, MinTime, MaxTime, BetweenTime, UseCalendarProgram, CalendarType,
        CalendarURL, PrivateCalendarToken, IncrementsSizeInMinutes
      FROM CalendarProviderAttributes
      WHERE UserID =${userID}`)
    const record = selectData.recordset[0]
    let calendarAttributes = !!record
      ? {
        advanceTime: record.AdvanceTime,
        betweenTime: record.BetweenTime,
        incrementsSizeInMinutes: record.IncrementsSizeInMinutes
      }
      : undefined

    if (!calendarAttributes) {
      calendarAttributes = {
        advanceTime: 24.0,
        betweenTime: 0,
        incrementsSizeInMinutes: 15
      }
      const insertData = await sql.query(`INSERT INTO CalendarProviderAttributes (
  			UserID,
  			AdvanceTime,
  			BetweenTime,
  			CalendarURL,
  			PrivateCalendarToken,
  			IncrementsSizeInMinutes

  			-- Deprecated fields, to be removed:
  			,CalendarType
  			,UseCalendarProgram
  			,MinTime
  			,MaxTime
  		) VALUES (
  			${userID},
  			coalesce(${calendarAttributes.advanceTime}, 0),
  			coalesce(${calendarAttributes.betweenTime}, 0),
  			null,
  			null,
  			${calendarAttributes.incrementsSizeInMinutes}

  			-- Deprecated fields
  			,''
  			,1
  			,0
  			,0
  		)`)
    }

    return exits.success(calendarAttributes)
  }
};
