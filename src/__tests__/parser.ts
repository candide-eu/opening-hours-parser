import {expect} from "chai"
import {parse} from "../"

describe("parse a single expression", () => {
  context("some nonsense", () => {
    it("throws an error", () => {
      expect(() => parse("not a schedule")).to.throw()
    })

    it("empty string", () => {
      expect(parse("")).to.eql([])
    })
  })

  context("day range and time range", () => {
    it("Mo-Fr 10:00-18:00", () => {
      expect(parse("Mo-Fr 10:00-18:00")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 2, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 3, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 4, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 5, startTime: "10:00", endTime: "18:00"},
      ])
    })

    it("Mo-Fr 08:00-12:00,13:00-17:00", () => {
      expect(parse("Mo-Fr 08:00-12:00,13:00-17:00")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "08:00", endTime: "12:00"},
        {type: "open", dayOfWeek: 1, startTime: "13:00", endTime: "17:00"},
        {type: "open", dayOfWeek: 2, startTime: "08:00", endTime: "12:00"},
        {type: "open", dayOfWeek: 2, startTime: "13:00", endTime: "17:00"},
        {type: "open", dayOfWeek: 3, startTime: "08:00", endTime: "12:00"},
        {type: "open", dayOfWeek: 3, startTime: "13:00", endTime: "17:00"},
        {type: "open", dayOfWeek: 4, startTime: "08:00", endTime: "12:00"},
        {type: "open", dayOfWeek: 4, startTime: "13:00", endTime: "17:00"},
        {type: "open", dayOfWeek: 5, startTime: "08:00", endTime: "12:00"},
        {type: "open", dayOfWeek: 5, startTime: "13:00", endTime: "17:00"},
      ])
    })
  })

  context("day range", () => {
    it("Mo-Fr", () => {
      expect(parse("Mo-Fr")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 3, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 4, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 5, startTime: "00:00", endTime: "24:00"},
      ])
    })

    it("Fr-Su", () => {
      expect(parse("Fr-Su")).to.eql([
        {type: "open", dayOfWeek: 5, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 6, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 7, startTime: "00:00", endTime: "24:00"},
      ])
    })

    it("Sa-Fr", () => {
      expect(parse("Sa-Fr")).to.eql([
        {type: "open", dayOfWeek: 6, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 7, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 3, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 4, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 5, startTime: "00:00", endTime: "24:00"},
      ])
    })
  })

  context("multiple days", () => {
    it("Mo,Tu", () => {
      expect(parse("Mo,Tu")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "00:00", endTime: "24:00"},
      ])
    })

    it("24/7", () => {
      expect(parse("24/7")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 3, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 4, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 5, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 6, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 7, startTime: "00:00", endTime: "24:00"},
      ])
    })

    it("00:00-24:00", () => {
      expect(parse("00:00-24:00")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 3, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 4, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 5, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 6, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 7, startTime: "00:00", endTime: "24:00"},
      ])
    })
  })
})

describe("parse two expressions", () => {
  context("day range and time range", () => {
    it("Su-We 10:00-18:00; Fr 08:00-19:00", () => {
      expect(parse("Su-We 10:00-18:00; Fr 08:00-19:00")).to.eql([
        {type: "open", dayOfWeek: 7, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 1, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 2, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 3, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 5, startTime: "08:00", endTime: "19:00"},
      ])
    })

    it("Su-We 10:00-18:00; Fr-Sa 08:00-19:00", () => {
      expect(parse("Su-We 10:00-18:00; Fr-Sa 08:00-19:00")).to.eql([
        {type: "open", dayOfWeek: 7, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 1, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 2, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 3, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 5, startTime: "08:00", endTime: "19:00"},
        {type: "open", dayOfWeek: 6, startTime: "08:00", endTime: "19:00"},
      ])
    })
  })

  context("overlapping day range and day range plus time range", () => {
    it("Su-We; Tu-Th 10:00-18:00", () => {
      expect(parse("Su-We; Tu-Th 10:00-18:00")).to.eql([
        {type: "open", dayOfWeek: 7, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 3, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 4, startTime: "10:00", endTime: "18:00"},
      ])
    })
  })

  context("day range plus days off", () => {
    it("Mo-Fr 10:00-18:00; We off", () => {
      expect(parse("Mo-Fr 10:00-18:00; We off")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 2, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 4, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 5, startTime: "10:00", endTime: "18:00"},
      ])
    })

    it("Mo-Fr 10:00-18:00; Tu-We off", () => {
      expect(parse("Mo-Fr 10:00-18:00; Tu-We off")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 4, startTime: "10:00", endTime: "18:00"},
        {type: "open", dayOfWeek: 5, startTime: "10:00", endTime: "18:00"},
      ])
    })
  })

  context("day range plus public holdays", () => {
    it("Mo-Fr; PH off", () => {
      expect(parse("Mo-Fr; PH off")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 3, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 4, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 5, startTime: "00:00", endTime: "24:00"},
        {type: "publicHoliday", isOpen: false},
      ])
    })

    it("Mo-Fr; PH 08:00-12:00", () => {
      expect(parse("Mo-Fr; PH 08:00-12:00")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 2, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 3, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 4, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 5, startTime: "00:00", endTime: "24:00"},
        {
          type: "publicHoliday",
          isOpen: true,
          startTime: "08:00",
          endTime: "12:00",
        },
      ])
    })
  })
})

describe("parse three expressions", () => {
  context("three single days", () => {
    it("Mo 08:00-12:00; We 08:00-13:00; Fr 08:00-14:00", () => {
      expect(parse("Mo 08:00-12:00; We 08:00-13:00; Fr 08:00-14:00")).to.eql([
        {type: "open", dayOfWeek: 1, startTime: "08:00", endTime: "12:00"},
        {type: "open", dayOfWeek: 3, startTime: "08:00", endTime: "13:00"},
        {type: "open", dayOfWeek: 5, startTime: "08:00", endTime: "14:00"},
      ])
    })
  })

  context("Test from real life", () => {
    it("We-Su; Fr,Sa off; ph 00:00-24:00", () => {
      expect(parse("We-Su; Fr,Sa off; ph 00:00-24:00")).to.eql([
        {type: "open", dayOfWeek: 3, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 4, startTime: "00:00", endTime: "24:00"},
        {type: "open", dayOfWeek: 7, startTime: "00:00", endTime: "24:00"},
        {
          type: "publicHoliday",
          isOpen: true,
          startTime: "00:00",
          endTime: "24:00",
        },
      ])
    })
  })
})

describe("Days of the year", () => {
  context("Only open for a season, 1st Aug to 21st Oct", () => {
    it("Aug 01 - Oct 31 00:00-24:00", () => {
      expect(parse("Aug 01 - Oct 31 00:00-24:00")).to.eql([
        {
          type: "open",
          dayOfWeek: 1,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "10-31",
        },
        {
          type: "open",
          dayOfWeek: 2,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "10-31",
        },
        {
          type: "open",
          dayOfWeek: 3,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "10-31",
        },
        {
          type: "open",
          dayOfWeek: 4,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "10-31",
        },
        {
          type: "open",
          dayOfWeek: 5,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "10-31",
        },
        {
          type: "open",
          dayOfWeek: 6,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "10-31",
        },
        {
          type: "open",
          dayOfWeek: 7,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "10-31",
        },
      ])
    })
  })

  context("Only open for a season, 1st Aug onwards", () => {
    it("Aug 01 Mo 00:00-24:00", () => {
      expect(parse("Aug 01 Mo 00:00-24:00")).to.eql([
        {
          type: "open",
          dayOfWeek: 1,
          startTime: "00:00",
          endTime: "24:00",
          startDay: "08-01",
          endDay: "12-31",
        },
      ])
    })
  })
})
