import chokidar from 'chokidar';

export class FileWatcher {
  watch(path: string, callback: (path: string) => void) {
    const watcher = chokidar.watch(path, { persistent: true });
    watcher.on('add', callback).on('change', callback);
    return watcher;
  }
}
