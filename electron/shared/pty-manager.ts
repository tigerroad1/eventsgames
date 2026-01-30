import { spawn } from 'node-pty';
import os from 'os';

export class PtyManager {
  spawn(command: string, args: string[], cwd: string) {
    return spawn(command, args, {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd,
      env: process.env
    });
  }
}
