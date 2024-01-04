const monday = [
  {
    id: 1,
    name: "PCC CS-591 GR 1.1 PCC CS-593 GR 2.2",
    type: "custom",
    startTime: new Date("2018-02-23T09:30:00"),
    endTime: new Date("2018-02-23T11:01:00"),
  },
  {
    id: 2,
    name: "PCC CS-593 GR 1.1",
    type: "custom",
    startTime: new Date("2018-02-23T11:10:00"),
    endTime: new Date("2018-02-23T12:50:00"),
  },
  {
    id: 3,
    name: "RECESS",
    type: "custom",
    startTime: new Date("2018-02-23T13:01:00"),
    endTime: new Date("2018-02-23T13:40:00"),
  },
  {
    id: 4,
    name: "ESC 591 GR-2",
    type: "custom",
    startTime: new Date("2018-02-23T14:01:00"),
    endTime: new Date("2018-02-23T15:20:00"),
  },
  {
    id: 5,
    name: "PCC CS-592",
    type: "custom",
    startTime: new Date("2018-02-23T15:30:00"),
    endTime: new Date("2018-02-23T17:01:00"),
  },
];
const tuesday = [
  {
    id: 1,
    name: "PCC CS-501",
    type: "custom",
    startTime: new Date("2018-02-23T09:30:00"),
    endTime: new Date("2018-02-23T11:01:00"),
  },
  {
    id: 2,
    name: "ESC CS-501",
    type: "custom",
    startTime: new Date("2018-02-23T11:10:00"),
    endTime: new Date("2018-02-23T12:01:00"),
  },
  {
    id: 3,
    name: "RECESS",
    type: "custom",
    startTime: new Date("2018-02-23T13:01:00"),
    endTime: new Date("2018-02-23T13:40:00"),
  },
  {
    id: 4,
    name: "PCC CS-502",
    type: "custom",
    startTime: new Date("2018-02-23T14:01:00"),
    endTime: new Date("2018-02-23T15:20:00"),
  },
  {
    id: 5,
    name: "HSMC 501",
    type: "custom",
    startTime: new Date("2018-02-23T16:10:00"),
    endTime: new Date("2018-02-23T17:01:00"),
  },
];
const wednesday = [
  {
    id: 1,
    name: "PEC IT 501B",
    type: "custom",
    startTime: new Date("2018-02-23T09:30:00"),
    endTime: new Date("2018-02-23T10:20:00"),
  },
  {
    id: 2,
    name: "HSMC 501",
    type: "custom",
    startTime: new Date("2018-02-23T11:10:00"),
    endTime: new Date("2018-02-23T12:01:00"),
  },
  {
    id: 3,
    name: "RECESS",
    type: "custom",
    startTime: new Date("2018-02-23T13:01:00"),
    endTime: new Date("2018-02-23T13:40:00"),
  },
  {
    id: 4,
    name: "ESC CS-591 GR-1",
    type: "custom",
    startTime: new Date("2018-02-23T13:41:00"),
    endTime: new Date("2018-02-23T15:20:00"),
  },
  {
    id: 5,
    name: "ESC CS-591 GR-2",
    type: "custom",
    startTime: new Date("2018-02-23T15:21:00"),
    endTime: new Date("2018-02-23T17:01:00"),
  },
];
const thrusday = [
  {
    id: 1,
    name: "PCC CS-502",
    type: "custom",
    startTime: new Date("2018-02-23T09:30:00"),
    endTime: new Date("2018-02-23T11:10:00"),
  },
  {
    id: 2,
    name: "PCC CS-501",
    type: "custom",
    startTime: new Date("2018-02-23T11:11:00"),
    endTime: new Date("2018-02-23T12:50:00"),
  },
  {
    id: 3,
    name: "RECESS",
    type: "custom",
    startTime: new Date("2018-02-23T13:01:00"),
    endTime: new Date("2018-02-23T13:40:00"),
  },
  {
    id: 4,
    name: "PCC CS-503",
    type: "custom",
    startTime: new Date("2018-02-23T13:41:00"),
    endTime: new Date("2018-02-23T15:20:00"),
  },
  {
    id: 5,
    name: "MC CS-501",
    type: "custom",
    startTime: new Date("2018-02-23T15:21:00"),
    endTime: new Date("2018-02-23T17:01:00"),
  },
];
const friday = [
  {
    id: 1,
    name: "PCC CS-503",
    type: "custom",
    startTime: new Date("2018-02-23T09:31:00"),
    endTime: new Date("2018-02-23T11:10:00"),
  },
  {
    id: 2,
    name: "ESC CS-501",
    type: "custom",
    startTime: new Date("2018-02-23T11:11:00"),
    endTime: new Date("2018-02-23T12:51:00"),
  },
  {
    id: 3,
    name: "RECESS",
    type: "custom",
    startTime: new Date("2018-02-23T13:01:00"),
    endTime: new Date("2018-02-23T13:40:00"),
  },
  {
    id: 4,
    name: "PCC CS-501",
    type: "custom",
    startTime: new Date("2018-02-23T13:41:00"),
    endTime: new Date("2018-02-23T15:21:00"),
  },
];

const CSEA = {
  monday: monday,
  tuesday: tuesday,
  wednesday: wednesday,
  thursday: thrusday,
  friday: friday,
};
const CSEB = {
  monday: friday,
  tuesday: thrusday,
  wednesday: tuesday,
  thursday: friday,
  friday: wednesday,
};

const ITA = {
  monday: tuesday,
  tuesday: wednesday,
  wednesday: monday,
  thursday: friday,
  friday: thrusday,
};
const ITB = {
  monday: wednesday,
  tuesday: friday,
  wednesday: tuesday,
  thursday: monday,
  friday: thrusday,
};
const ECEA = {
  monday: friday,
  tuesday: tuesday,
  wednesday: monday,
  thursday: friday,
  friday: thrusday,
};
const ECEB = {
  monday: tuesday,
  tuesday: thrusday,
  wednesday: friday,
  thursday: wednesday,
  friday: monday,
};
const EEA = CSEB;
const EEB = CSEA;
const FTA = ITB;
const FTB = ITA;
const CEA = CSEB;
const CEB = ITA;
const MEA = ITB;
const MEB = CSEB;
export const events = {
  CSEA,
  CSEB,
  ITA,
  ITB,
  ECEA,
  ECEB,
  EEA,
  EEB,
  FTA,
  FTB,
  CEA,
  CEB,
  MEA,
  MEB,
};
