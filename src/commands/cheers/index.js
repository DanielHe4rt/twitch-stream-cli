import { dispatchCommand } from '../../utils';

function cheers(amount, commands) {
  const cheerCommand = commands.cheers;
  cheerCommand.params[0] = amount * 2;

  dispatchCommand(cheerCommand);
};

export default cheers;
