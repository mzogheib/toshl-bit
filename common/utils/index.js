// Source: http://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
const getTime = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  const date = localISOTime.substring(0, 10);
  const time = localISOTime.substring(11, 19);
  return { date, time };
};

export default {
  getTime,
};
