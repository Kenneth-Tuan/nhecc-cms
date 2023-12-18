// key name is the format of API, value name is the format of frontend
const keyMappingObject = {
  AwbNo: "awbNumber",
  Consignee: "consignee",
  Dest: "destination",
  FlightDate: "flightDate",
  FlightNo: "flightNumber",
  HwbNo: "houseAwbNumber",
  LastUpdate: "lastUpdate",
  MsgId: "msgId",
  Org: "origin",
  User: "user",
  StatusSent: "statusSent",
  StatusFMA: "statusFMA",
  StatusFNA: "statusFNA",
  StatusPrinted: "statusPrinted",
  Hse: "hse",
};

export function getAPIKey(value) {
  return Object.keys(keyMappingObject).find(
    (key) => keyMappingObject[key] === value
  );
}

export function adaptArrayToFrontendFormat(arr) {
  const result = arr.map((obj) => {
    return adaptObjectToFrontendFormat(obj);
  });

  return result;
}

export function adaptObjectToFrontendFormat(payload) {
  const result = Object.entries(payload)
    .filter(([key]) => keyMappingObject.hasOwnProperty(key))
    .reduce((acc, cur) => {
      const [key, value] = cur;
      const nextKey = keyMappingObject[key];
      acc[nextKey] = value;

      return acc;
    }, {});

  return result;
}

export function adaptArrayToAPIFormat(arr) {
  const result = arr.map((obj) => {
    return adaptObjectToAPIFormat(obj);
  });

  return result;
}

export function adaptObjectToAPIFormat(payload) {
  const result = Object.entries(payload)
    .filter(([key]) => Object.values(keyMappingObject).includes(key))
    .reduce((acc, cur) => {
      const [key, value] = cur;
      const nextKey = Object.keys(keyMappingObject).find(
        (_key) => keyMappingObject[_key] === key
      );
      acc[nextKey] = value?.value;

      return acc;
    }, {});

  return result;
}
