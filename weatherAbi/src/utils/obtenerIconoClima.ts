export const getIconoClima = (code: number) => {
  if (code === 1000) return "☀️";
  if (code === 1003) return "🌤";
  if ([1006, 1009].includes(code)) return "☁️";
  if ([1180,1183,1186,1189].includes(code)) return "🌧";
  if ([1210,1213,1216].includes(code)) return "❄️";
  if ([1273,1276].includes(code)) return "⛈";
  return "☁️";
};