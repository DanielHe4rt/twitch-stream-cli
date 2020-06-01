import parseColor from 'parse-color';
import { dispatchCommand } from '../../utils';

function colorHandler(hex, commands) {
  if (!parseColor(hex).hex) return;

  const color = parseColor(hex);
  const colorValue = parseInt(color.hex.slice(1), 16);
  const bright = color.rgba.slice(-1) * 100;

  return Promise.all([
    dispatchCommand({
      ...commands.color,
      params: [colorValue, "smooth", 500],
    }),
    dispatchCommand({
      ...commands.bright,
      params: [bright, "smooth", 500],
    }),
  ]);
};

export default colorHandler;
