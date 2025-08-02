import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle } from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  commands: string[];
  tasks: string[];
  examples: { command: string; output: string }[];
}

interface TerminalPlaygroundProps {
  exercise: Exercise;
  onTaskComplete: (taskIndex: number) => void;
  completedTasks: Set<number>;
}

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const TerminalPlayground: React.FC<TerminalPlaygroundProps> = ({ 
  exercise, 
  onTaskComplete, 
  completedTasks 
}) => {
  const [currentInput, setCurrentInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: `Welcome to the DevOps Shell Lab - ${exercise.title}`,
      timestamp: new Date()
    },
    {
      type: 'output',
      content: 'Type "help" to see available commands or start practicing!',
      timestamp: new Date()
    }
  ]);
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [fileSystem, setFileSystem] = useState({
    '/': { type: 'directory', contents: ['home', 'etc', 'var', 'usr'] },
    '/home': { type: 'directory', contents: ['user'] },
    '/home/user': { type: 'directory', contents: ['documents', 'downloads', 'example.txt'] },
    '/home/user/example.txt': { type: 'file', content: 'Hello World!\nThis is a sample file.\nLine 3\nLine 4\nLine 5' },
    '/etc': { type: 'directory', contents: ['passwd', 'hosts'] },
    '/etc/passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash' }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const simulateCommand = (command: string): string => {
    const parts = command.trim().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        return `Available commands:
ls - list directory contents
pwd - print working directory
cd - change directory
mkdir - create directory
touch - create file
cat - display file contents
echo - display text
grep - search text
ps - show processes
whoami - show current user
clear - clear terminal
help - show this help`;

      case 'ls': {
        let showAll = false;
        let longFormat = false;
        let target = '';
        
        args.forEach(arg => {
          if (arg.startsWith('-')) {
            if (arg.includes('a')) showAll = true;
            if (arg.includes('l')) longFormat = true;
          } else {
            target = arg;
          }
        });
        
        let actualPath = currentDirectory;
        if (target) {
          if (target.startsWith('/')) {
            actualPath = target;
          } else if (target === '..') {
            actualPath = currentDirectory.split('/').slice(0, -1).join('/') || '/';
          } else {
            actualPath = currentDirectory === '/' ? `/${target}` : `${currentDirectory}/${target}`;
          }
        }
        
        const dirContents = fileSystem[actualPath as keyof typeof fileSystem];
        if (dirContents && dirContents.type === 'directory') {
          let files = [...dirContents.contents];
          
          if (showAll) {
            files = ['.', '..', ...files];
          }
          
          if (longFormat) {
            const longList = files.map((file) => {
              if (file === '.') return 'drwxr-xr-x  3 user user  4096 Jan 15 10:30 .';
              if (file === '..') return 'drwxr-xr-x  5 root root  4096 Jan 15 09:15 ..';
              
              const filePath = actualPath === '/' ? `/${file}` : `${actualPath}/${file}`;
              const fileObj = fileSystem[filePath as keyof typeof fileSystem];
              const isDir = fileObj?.type === 'directory';
              
              let permissions = '-rw-r--r--';
              if (isDir) permissions = 'drwxr-xr-x';
              
              const size = isDir ? '4096' : (fileObj?.content?.length || 1024).toString();
              const links = isDir ? '2' : '1';
              
              return `${permissions}  ${links} user user ${size.padStart(6)} Jan 15 10:30 ${file}`;
            });
            const totalBlocks = Math.ceil(files.length * 4);
            return `total ${totalBlocks}\n${longList.join('\n')}`;
          }
          
          return files.join('    ');
        }
        return `ls: cannot access '${target || actualPath}': No such file or directory`;
      }

      case 'pwd':
        return currentDirectory;

      case 'cd': {
        const newDir = args[0] || '/home/user';
        
        if (!newDir || newDir === '~') {
          setCurrentDirectory('/home/user');
          return '';
        }
        
        if (newDir === '..') {
          const parentDir = currentDirectory.split('/').slice(0, -1).join('/') || '/';
          setCurrentDirectory(parentDir);
          return '';
        }
        
        const fullPath = newDir.startsWith('/') ? newDir : `${currentDirectory}/${newDir}`;
        if (fileSystem[fullPath as keyof typeof fileSystem]?.type === 'directory') {
          setCurrentDirectory(fullPath);
          return '';
        }
        return `bash: cd: ${newDir}: No such file or directory`;
      }

      case 'mkdir': {
        if (!args[0]) return 'mkdir: missing operand';
        const dirName = args[0];
        return `Directory '${dirName}' created`;
      }

      case 'touch':
        if (!args[0]) return 'touch: missing file operand';
        return `File '${args[0]}' created`;

      case 'cat': {
        if (!args[0]) return 'cat: missing file operand';
        
        const fileName = args[0];
        const filePath = fileName.startsWith('/') ? fileName : `${currentDirectory}/${fileName}`;
        const file = fileSystem[filePath as keyof typeof fileSystem];
        
        if (file && file.type === 'file') {
          return file.content || '';
        }
        
        if (fileSystem[filePath as keyof typeof fileSystem]?.type === 'directory') {
          return `cat: ${fileName}: Is a directory`;
        }
        
        return `cat: ${fileName}: No such file or directory`;
      }

      case 'echo':
        return args.join(' ');

      case 'grep': {
        if (args.length < 2) return 'Usage: grep [OPTION]... PATTERN [FILE]...';
        
        const pattern = args[0];
        const grepFile = args[1];
        
        const grepFilePath = grepFile.startsWith('/') ? grepFile : `${currentDirectory}/${grepFile}`;
        const grepFileContent = fileSystem[grepFilePath as keyof typeof fileSystem];
        
        if (grepFileContent && grepFileContent.type === 'file') {
          const content = grepFileContent.content || '';
          const lines = content.split('\n');
          const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
          return matches.length > 0 ? matches.join('\n') : '';
        }
        
        return `grep: ${grepFile}: No such file or directory`;
      }

      case 'ps':
        return `  PID TTY          TIME CMD
 1001 pts/0    00:00:00 bash
 5678 pts/0    00:00:00 ps`;

      case 'whoami':
        return 'user';

      case 'clear':
        setTerminalHistory([]);
        return '';

      default:
        return `Command '${cmd}' not found. Type 'help' for available commands.`;
    }
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = currentInput.trim();
      if (!command) return;

      const newHistory = [...terminalHistory, {
        type: 'command' as const,
        content: `${currentDirectory} $ ${command}`,
        timestamp: new Date()
      }];

      const output = simulateCommand(command);
      if (output) {
        newHistory.push({
          type: 'output' as const,
          content: output,
          timestamp: new Date()
        });
      }

      exercise.tasks.forEach((task, index) => {
        if (!completedTasks.has(index)) {
          const taskKeywords = task.toLowerCase().split(' ');
          const commandLower = command.toLowerCase();
          
          if (taskKeywords.some(keyword => commandLower.includes(keyword))) {
            onTaskComplete(index);
            newHistory.push({
              type: 'output' as const,
              content: `✅ Task completed: ${task}`,
              timestamp: new Date()
            });
          }
        }
      });

      setTerminalHistory(newHistory);
      setCurrentInput('');
    }
  };

  const clearTerminal = () => {
    setTerminalHistory([{
      type: 'output',
      content: `Terminal cleared - ${exercise.title}`,
      timestamp: new Date()
    }]);
  };

  const runExample = (command: string) => {
    setCurrentInput(command);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        inputRef.current.dispatchEvent(event);
      }
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Shell Playground</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearTerminal}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-gray-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto p-4 font-mono text-sm"
          >
            {terminalHistory.map((line, index) => (
              <div key={index} className="mb-1">
                <span className={`${
                  line.type === 'command' ? 'text-green-400' :
                  line.type === 'error' ? 'text-red-400' :
                  'text-gray-300'
                }`}>
                  {line.content}
                </span>
              </div>
            ))}
            
            <div className="flex items-center text-green-400">
              <span className="mr-2">{currentDirectory} $</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-white"
                placeholder="Type a command..."
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
            <Play className="w-5 h-5 text-blue-400" />
            <span>Quick Examples</span>
          </h3>
          <div className="space-y-2">
            {exercise.examples.slice(0, 4).map((example, index) => (
              <button
                key={index}
                onClick={() => runExample(example.command)}
                className="w-full text-left p-2 bg-gray-900 hover:bg-gray-700 rounded-md text-sm font-mono text-green-400 transition-colors border border-gray-700"
              >
                {example.command}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Task Progress</h3>
          <div className="space-y-2">
            {exercise.tasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className={`flex-shrink-0 mt-1 w-4 h-4 rounded-full ${
                  completedTasks.has(index) ? 'bg-green-500' : 'bg-gray-600'
                }`}>
                  {completedTasks.has(index) && (
                    <CheckCircle className="w-3 h-3 text-white m-0.5" />
                  )}
                </div>
                <span className={`text-xs ${
                  completedTasks.has(index) ? 'text-green-400 line-through' : 'text-gray-300'
                }`}>
                  {task}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400 mb-1">
              {completedTasks.size} / {exercise.tasks.length} completed
            </div>
            <div className="bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks.size / exercise.tasks.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">💡 Tips</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Type "help" for available commands</li>
            <li>• Use Tab for auto-completion</li>
            <li>• Press Enter to execute commands</li>
            <li>• Practice the commands from the theory section</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TerminalPlayground;