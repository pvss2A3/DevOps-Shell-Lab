export interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
  theory: string;
  commands: string[];
  examples: { command: string; description: string; output: string }[];
  tasks: string[];
}

export const exercises: Exercise[] = [
  {
    id: 1,
    title: "Basic Navigation Commands",
    description: "Learn fundamental commands for navigating the file system including pwd, ls, and cd.",
    difficulty: "beginner",
    category: "Basic Commands",
    estimatedTime: "15 min",
    theory: `File system navigation is the foundation of shell scripting. Every file and directory in Linux has a path, and understanding how to move around the file system is crucial.

The file system is organized as a tree structure starting from the root directory (/). Your current location in this tree is called the "working directory."

Key concepts:
- Absolute paths start with / (e.g., /home/user/documents)  
- Relative paths are relative to your current location (e.g., documents/file.txt)
- The tilde (~) represents your home directory
- Two dots (..) represent the parent directory
- One dot (.) represents the current directory`,
    commands: [
      "pwd - print working directory",
      "ls - list directory contents", 
      "ls -l - detailed list view",
      "ls -a - show hidden files",
      "cd - change directory",
      "cd .. - go to parent directory",
      "cd ~ - go to home directory",
      "ls -la - show all files with details",
      "cd - - go to previous directory"
    ],
    examples: [
      {
        command: "pwd",
        description: "Show current directory location",
        output: "/home/user"
      },
      {
        command: "ls",
        description: "List files and folders in current directory",
        output: "documents  downloads  example.txt  pictures"
      },
      {
        command: "ls -la",
        description: "List all files with detailed information",
        output: `total 16
drwxr-xr-x 5 user user 4096 Jan 15 10:30 .
drwxr-xr-x 3 root root 4096 Jan 15 09:15 ..
drwxr-xr-x 2 user user 4096 Jan 15 10:25 documents
drwxr-xr-x 2 user user 4096 Jan 15 10:20 downloads
-rw-r--r-- 1 user user  156 Jan 15 10:30 example.txt`
      },
      {
        command: "cd documents",
        description: "Navigate to the documents directory",
        output: ""
      }
    ],
    tasks: [
      "Use 'pwd' to check your current directory",
      "List all files using 'ls'",
      "Try 'ls -l' for detailed file information",
      "Navigate to a different directory using 'cd'",
      "Use 'cd ..' to go back to parent directory"
    ]
  },
  {
    id: 2,
    title: "File Operations",
    description: "Master creating, copying, moving, and deleting files and directories.",
    difficulty: "beginner", 
    category: "File Operations",
    estimatedTime: "20 min",
    theory: `File operations are essential for managing data in the shell. Understanding how to create, copy, move, and delete files safely is crucial for any system administrator or developer.

Important safety tips:
- Always double-check paths before deleting files
- Use -i flag with rm, cp, mv for interactive prompts
- Be extremely careful with wildcards (*)
- Regular backups prevent data loss

File permissions matter:
- Read (r): View file contents
- Write (w): Modify file contents  
- Execute (x): Run file as program`,
    commands: [
      "touch filename - create empty file",
      "mkdir dirname - create directory", 
      "cp source dest - copy files",
      "mv source dest - move/rename files",
      "rm filename - delete file",
      "rm -r dirname - delete directory recursively",
      "rmdir dirname - delete empty directory",
      "cp -r source dest - copy directory recursively",
      "mkdir -p path/to/dir - create nested directories"
    ],
    examples: [
      {
        command: "touch newfile.txt",
        description: "Create an empty file named newfile.txt",
        output: ""
      },
      {
        command: "mkdir projects",
        description: "Create a new directory called projects",
        output: ""
      },
      {
        command: "cp newfile.txt backup.txt",
        description: "Copy newfile.txt to backup.txt",
        output: ""
      },
      {
        command: "mv backup.txt documents/",
        description: "Move backup.txt to the documents directory",
        output: ""
      },
      {
        command: "rm newfile.txt",
        description: "Delete the file newfile.txt",
        output: ""
      }
    ],
    tasks: [
      "Create a new file using 'touch'",
      "Create a directory with 'mkdir'", 
      "Copy a file using 'cp'",
      "Move or rename a file with 'mv'",
      "Safely delete a file using 'rm'"
    ]
  },
  {
    id: 3,
    title: "Text Display and Manipulation",
    description: "Learn to view and manipulate text files using cat, echo, head, tail, and more.",
    difficulty: "beginner",
    category: "Text Manipulation", 
    estimatedTime: "25 min",
    theory: `Text manipulation is a core skill in shell scripting. Most configuration files, logs, and data in Linux systems are text-based, making these commands indispensable.

Text display commands help you:
- Quickly view file contents
- Monitor log files in real-time
- Extract specific portions of large files
- Combine multiple files
- Format output for better readability

Understanding text streams:
- stdin: Standard input (keyboard)
- stdout: Standard output (screen)
- stderr: Standard error (screen, usually)`,
    commands: [
      "cat filename - display entire file",
      "echo 'text' - display text",
      "head filename - show first 10 lines",
      "tail filename - show last 10 lines", 
      "tail -f filename - follow file changes",
      "less filename - view file page by page",
      "wc filename - count lines, words, characters",
      "more filename - view file page by page (basic)",
      "head -n 5 filename - show first 5 lines"
    ],
    examples: [
      {
        command: "cat example.txt",
        description: "Display the contents of example.txt",
        output: "This is a sample text file for testing commands.\nIt contains multiple lines of text.\nPerfect for learning text manipulation."
      },
      {
        command: "echo 'Hello, World!'",
        description: "Display the text 'Hello, World!' on screen",
        output: "Hello, World!"
      },
      {
        command: "head -5 example.txt",
        description: "Show first 5 lines of example.txt",
        output: "This is a sample text file for testing commands.\nIt contains multiple lines of text.\nPerfect for learning text manipulation."
      },
      {
        command: "wc example.txt",
        description: "Count lines, words, and characters in example.txt",
        output: "3 15 87 example.txt"
      }
    ],
    tasks: [
      "Display a file's contents using 'cat'",
      "Use 'echo' to print text to the terminal",
      "Show the first few lines with 'head'",
      "Display the last lines using 'tail'",
      "Count words in a file with 'wc'"
    ]
  },
  {
    id: 4,
    title: "File Permissions and Ownership",
    description: "Understand and modify file permissions, ownership, and security settings.",
    difficulty: "intermediate",
    category: "System Management",
    estimatedTime: "30 min", 
    theory: `File permissions and ownership are fundamental security concepts in Linux. Every file and directory has permissions that control who can read, write, or execute them.

Permission structure:
- User (u): The file owner
- Group (g): Members of the file's group
- Other (o): Everyone else

Permission types:
- Read (r/4): View file contents or list directory
- Write (w/2): Modify file or create/delete files in directory
- Execute (x/1): Run file as program or enter directory

Symbolic notation: rwxrwxrwx (user, group, other)
Octal notation: 755 = rwxr-xr-x

Common permission patterns:
- 644: rw-r--r-- (files: owner can edit, others can read)
- 755: rwxr-xr-x (executables: owner can edit/run, others can run) 
- 700: rwx------ (private: only owner has access)`,
    commands: [
      "ls -l - show detailed permissions",
      "chmod 755 filename - change permissions",
      "chmod u+x filename - add execute for user",
      "chmod g-w filename - remove write for group", 
      "chown user:group filename - change ownership",
      "chgrp group filename - change group ownership",
      "chmod -R 755 directory - change permissions recursively",
      "umask 022 - set default file creation permissions"
    ],
    examples: [
      {
        command: "ls -l example.txt",
        description: "Show detailed file information including permissions",
        output: "-rw-r--r-- 1 user user 87 Jan 15 10:30 example.txt"
      },
      {
        command: "chmod 755 script.sh",
        description: "Make script.sh executable by owner and readable by all",
        output: ""
      },
      {
        command: "chmod u+x filename",
        description: "Add execute permission for the file owner",
        output: ""
      },
      {
        command: "chown user:developers project.txt",
        description: "Change owner to 'user' and group to 'developers'",
        output: ""
      }
    ],
    tasks: [
      "Check file permissions using 'ls -l'",
      "Change file permissions with 'chmod'",
      "Add execute permission to a file",
      "Remove write permission using symbolic notation",
      "Change file ownership with 'chown'"
    ]
  },
  {
    id: 5,
    title: "Process Management",
    description: "Learn to monitor, control, and manage running processes in the system.",
    difficulty: "intermediate",
    category: "System Management",
    estimatedTime: "25 min",
    theory: `Process management is crucial for system administration. Every running program is a process with a unique Process ID (PID).

Process states:
- Running: Currently executing
- Sleeping: Waiting for an event
- Stopped: Suspended (can be resumed)
- Zombie: Finished but parent hasn't collected exit status

Process hierarchy:
- Parent processes spawn child processes
- Process tree shows relationships
- Killing parent may kill children

Signals:
- SIGTERM (15): Polite request to terminate
- SIGKILL (9): Force termination (cannot be ignored)
- SIGSTOP (19): Suspend process
- SIGCONT (18): Resume suspended process

Background vs Foreground:
- Foreground: Blocks terminal until completion
- Background: Runs independently (use & suffix)`,
    commands: [
      "ps - show running processes",
      "ps aux - detailed process list",
      "top - real-time process monitor",
      "htop - enhanced process monitor",
      "kill PID - terminate process",
      "kill -9 PID - force kill process",
      "killall name - kill by process name",
      "jobs - show background jobs",
      "nohup command & - run command immune to hangups",
      "pgrep name - find process ID by name",
      "pkill name - kill processes by name"
    ],
    examples: [
      {
        command: "ps",
        description: "Show processes for current user",
        output: "  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps"
      },
      {
        command: "ps aux | head -5",
        description: "Show detailed info for all processes (first 5)",
        output: "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1  22324  1234 ?        Ss   09:15   0:01 /sbin/init\nuser      1234  0.0  0.2  21456  2345 pts/0    Ss   10:30   0:00 bash"
      },
      {
        command: "kill 1234",
        description: "Terminate process with PID 1234",
        output: ""
      },
      {
        command: "killall firefox",
        description: "Terminate all Firefox processes",
        output: ""
      }
    ],
    tasks: [
      "List currently running processes with 'ps'",
      "Use 'ps aux' to see detailed process information",
      "Find the PID of a specific process",
      "Kill a process using its PID",
      "Use 'killall' to terminate processes by name"
    ]
  },
  {
    id: 6,
    title: "Environment Variables",
    description: "Work with environment variables, shell variables, and system configuration.",
    difficulty: "intermediate",
    category: "System Management",
    estimatedTime: "20 min",
    theory: `Environment variables are key-value pairs that define the environment in which processes run. They control program behavior and store system information.

Types of variables:
- Environment variables: Available to all child processes (exported)
- Shell variables: Only available in current shell session
- System variables: Set by the system (PATH, HOME, USER)

Common environment variables:
- PATH: Directories to search for executable files
- HOME: User's home directory path
- USER: Current username
- SHELL: Current shell program
- PWD: Present working directory

Variable scope:
- Local: Only in current shell
- Exported: Available to child processes
- Global: System-wide (in /etc/environment)

Best practices:
- Use uppercase for environment variables
- Quote values with spaces
- Unset variables when no longer needed`,
    commands: [
      "env - display all environment variables",
      "printenv - display environment variables",
      "echo $VARIABLE - display variable value",
      "export VAR=value - create environment variable",
      "unset VAR - remove variable",
      "set - display all variables (shell + environment)",
      "which command - show command location using PATH",
      "whereis command - locate binary, source, manual",
      "type command - show command type and location"
    ],
    examples: [
      {
        command: "echo $HOME",
        description: "Display the home directory path",
        output: "/home/user"
      },
      {
        command: "echo $PATH",
        description: "Show the PATH environment variable",
        output: "/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin"
      },
      {
        command: "export MY_VAR='Hello World'",
        description: "Create a new environment variable",
        output: ""
      },
      {
        command: "echo $MY_VAR",
        description: "Display the custom variable we just created",
        output: "Hello World"
      },
      {
        command: "which ls",
        description: "Find the location of the ls command",
        output: "/bin/ls"
      }
    ],
    tasks: [
      "Display all environment variables with 'env'",
      "Show the value of the HOME variable",
      "Create a custom environment variable",
      "Display your custom variable's value",
      "Find where a command is located using 'which'"
    ]
  },
  {
    id: 7,
    title: "Input/Output Redirection",
    description: "Master redirecting input, output, and errors between commands and files.",
    difficulty: "intermediate",
    category: "Text Manipulation", 
    estimatedTime: "30 min",
    theory: `Input/Output redirection is one of the most powerful features of the shell. It allows you to control where commands get their input and where they send their output.

Standard streams:
- stdin (0): Standard input, usually keyboard
- stdout (1): Standard output, usually screen
- stderr (2): Standard error, usually screen

Redirection operators:
- > : Redirect stdout to file (overwrite)
- >> : Redirect stdout to file (append)
- < : Redirect stdin from file
- 2> : Redirect stderr to file
- 2>&1 : Redirect stderr to stdout
- &> : Redirect both stdout and stderr
- | : Pipe stdout of one command to stdin of another

Common patterns:
- command > file : Save output to file
- command >> file : Append output to file  
- command 2> error.log : Save errors to log file
- command > output.txt 2>&1 : Save both output and errors
- command1 | command2 : Use output of command1 as input to command2

The /dev/null device:
- "Black hole" that discards all data sent to it
- Useful for suppressing unwanted output`,
    commands: [
      "command > file - redirect output to file",
      "command >> file - append output to file",
      "command < file - take input from file", 
      "command 2> file - redirect errors to file",
      "command &> file - redirect both output and errors",
      "command1 | command2 - pipe output to next command",
      "command > /dev/null - discard output",
      "command 2>&1 - redirect stderr to stdout",
      "tee file - write output to both file and stdout"
    ],
    examples: [
      {
        command: "echo 'Hello World' > greeting.txt",
        description: "Save text to a file (overwrites existing content)",
        output: ""
      },
      {
        command: "ls -l >> listing.txt",
        description: "Append directory listing to a file",
        output: ""
      },
      {
        command: "cat < greeting.txt",
        description: "Read file contents and display them",
        output: "Hello World"
      },
      {
        command: "ls nonexistent 2> errors.txt",
        description: "Redirect error message to a file",
        output: ""
      },
      {
        command: "ls | wc -l",
        description: "Count number of files in directory",
        output: "5"
      }
    ],
    tasks: [
      "Redirect command output to a file using '>'",
      "Append output to a file using '>>'",
      "Redirect input from a file using '<'",
      "Redirect error messages to a file with '2>'",
      "Use pipes to connect two commands with '|'"
    ]
  },
  {
    id: 8,
    title: "Pipes and Filters",
    description: "Combine commands using pipes and learn powerful text filtering tools.",
    difficulty: "intermediate",
    category: "Text Manipulation",
    estimatedTime: "35 min",
    theory: `Pipes and filters represent the Unix philosophy of "do one thing well" and combining simple tools to accomplish complex tasks.

The pipe (|) operator:
- Connects stdout of one command to stdin of another
- Creates a pipeline where data flows through multiple commands
- Enables powerful one-liners for complex text processing

Common filter commands:
- grep: Search for patterns in text
- sort: Sort lines of text  
- uniq: Remove duplicate lines
- cut: Extract columns from text
- sed: Stream editor for filtering and transforming text
- awk: Pattern scanning and processing language
- tr: Translate or delete characters

Pipeline patterns:
- Search → Sort → Remove duplicates
- Extract → Transform → Filter
- Count → Sort → Display top results

Performance considerations:
- Pipes process data in parallel
- Early filtering reduces data in pipeline
- Some commands (sort, uniq) require full input before output`,
    commands: [
      "grep pattern file - search for text patterns",
      "sort file - sort lines alphabetically",
      "uniq file - remove duplicate adjacent lines",
      "cut -d',' -f1 file - extract first column",
      "wc -l - count lines",
      "head -n 10 - show first 10 lines",
      "tail -n 10 - show last 10 lines",
      "awk '{print $1}' file - print first column",
      "sed 's/old/new/g' file - replace text patterns"
    ],
    examples: [
      {
        command: "cat /etc/passwd | grep user",
        description: "Search for lines containing 'user' in passwd file",
        output: "user:x:1000:1000:User:/home/user:/bin/bash"
      },
      {
        command: "ls -l | grep '^d'",
        description: "List only directories (lines starting with 'd')",
        output: "drwxr-xr-x 2 user user 4096 Jan 15 10:25 documents\ndrwxr-xr-x 2 user user 4096 Jan 15 10:20 downloads"
      },
      {
        command: "cat file.txt | sort | uniq",
        description: "Remove duplicate lines from sorted file",
        output: "line1\nline2\nline3"
      },
      {
        command: "ps aux | grep firefox | wc -l",
        description: "Count Firefox processes",
        output: "3"
      },
      {
        command: "cut -d':' -f1 /etc/passwd | sort",
        description: "Extract and sort usernames from passwd file",
        output: "root\nuser\ndaemon\nbin"
      }
    ],
    tasks: [
      "Use grep to search for text in a file",
      "Sort the output of a command using pipes",
      "Combine grep and wc to count matching lines",
      "Extract specific columns with cut",
      "Create a pipeline with 3 or more commands"
    ]
  },
  {
    id: 9,
    title: "Basic Shell Scripting",
    description: "Write your first shell scripts with variables, loops, and conditional statements.",
    difficulty: "advanced",
    category: "Scripting",
    estimatedTime: "45 min",
    theory: `Shell scripting allows you to automate repetitive tasks and create powerful command-line tools. A shell script is a text file containing a series of commands.

Script basics:
- Start with shebang: #!/bin/bash
- Make executable: chmod +x script.sh
- Run with: ./script.sh

Variables:
- No spaces around = : name="value"
- Use $ to access: echo $name
- Command substitution: result=$(command)
- Arguments: $1, $2, ... $9, $@, $#

Control structures:
- if/then/else/fi for conditions
- for/do/done for loops
- while/do/done for conditional loops
- case/esac for multiple conditions

Comparison operators:
- -eq : equal (numbers)
- -ne : not equal (numbers)  
- -lt : less than (numbers)
- -gt : greater than (numbers)
- = : equal (strings)
- != : not equal (strings)
- -z : string is empty
- -n : string is not empty

File tests:
- -f : file exists and is regular file
- -d : directory exists
- -r : file is readable
- -w : file is writable
- -x : file is executable`,
    commands: [
      "#!/bin/bash - shebang line",
      "chmod +x script.sh - make script executable",
      "./script.sh - run script",
      "if [ condition ]; then ... fi - conditional",
      "for var in list; do ... done - loop",
      "while [ condition ]; do ... done - while loop",
      "read variable - read user input",
      "case $var in pattern) ... ;; esac - case statement",
      "test -f file - test if file exists"
    ],
    examples: [
      {
        command: "#!/bin/bash\necho 'Hello, World!'",
        description: "Simple script that prints a greeting",
        output: "Hello, World!"
      },
      {
        command: "#!/bin/bash\nname=$1\necho \"Hello, $name!\"",
        description: "Script that greets user by name (using first argument)",
        output: "Hello, John!"
      },
      {
        command: "#!/bin/bash\nfor i in 1 2 3; do\n  echo \"Number: $i\"\ndone",
        description: "Script with a simple for loop",
        output: "Number: 1\nNumber: 2\nNumber: 3"
      },
      {
        command: "#!/bin/bash\nif [ -f \"file.txt\" ]; then\n  echo \"File exists\"\nelse\n  echo \"File not found\"\nfi",
        description: "Script that checks if a file exists",
        output: "File exists"
      }
    ],
    tasks: [
      "Create a simple script with a shebang line",
      "Make your script executable",
      "Write a script that uses variables",
      "Create a script with a for loop",
      "Write a script with an if statement"
    ]
  },
  {
    id: 10,
    title: "Functions and Advanced Scripting",
    description: "Create reusable functions, handle errors, and write production-ready scripts.",
    difficulty: "advanced", 
    category: "Scripting",
    estimatedTime: "40 min",
    theory: `Functions make scripts modular, reusable, and easier to maintain. Advanced scripting techniques help create robust, production-ready automation.

Function syntax:
function_name() {
    # commands
    return value  # optional
}

Function features:
- Local variables: local var="value"
- Arguments: $1, $2, etc. (separate from script arguments)
- Return values: return 0-255 (0 = success)
- Call functions like commands: function_name arg1 arg2

Error handling:
- Exit codes: 0 = success, non-zero = error
- set -e : Exit on any error
- set -u : Exit on undefined variables
- trap : Handle signals and cleanup
- || and && : Conditional execution

Advanced techniques:
- Arrays: arr=("item1" "item2")
- Command substitution: $(command) or \`command\`
- Process substitution: <(command)

Best practices:
- Always quote variables: "$var"
- Check arguments and prerequisites
- Provide usage information
- Use meaningful function names
- Comment complex logic
- Handle edge cases gracefully`,
    commands: [
      "function name() { ... } - define function",
      "local var=value - create local variable",
      "return 0 - return from function",
      "set -e - exit on error", 
      "set -u - exit on undefined variable",
      "trap 'cleanup' EXIT - run cleanup on exit",
      "$? - last command exit status",
      "declare -a array - declare array variable",
      "readonly var=value - create read-only variable"
    ],
    examples: [
      {
        command: "#!/bin/bash\ngreet() {\n  local name=$1\n  echo \"Hello, $name!\"\n}\ngreet \"World\"",
        description: "Simple function with local variable",
        output: "Hello, World!"
      },
      {
        command: "#!/bin/bash\ncheck_file() {\n  if [ -f \"$1\" ]; then\n    return 0\n  else\n    return 1\n  fi\n}\nif check_file \"test.txt\"; then\n  echo \"File exists\"\nfi",
        description: "Function that returns exit status",
        output: "File exists"
      },
      {
        command: "#!/bin/bash\nset -e\necho \"Starting...\"\nls /nonexistent  # This will cause script to exit\necho \"This won't print\"",
        description: "Script with error handling (exits on error)",
        output: "Starting...\nls: cannot access '/nonexistent': No such file or directory"
      },
      {
        command: "#!/bin/bash\ncleanup() {\n  echo \"Cleaning up...\"\n}\ntrap cleanup EXIT\necho \"Script running...\"",
        description: "Script with cleanup function that runs on exit",
        output: "Script running...\nCleaning up..."
      }
    ],
    tasks: [
      "Create a function that takes parameters",
      "Use local variables in a function",
      "Write a function that returns an exit status",
      "Add error handling with 'set -e'",
      "Create a cleanup function with 'trap'"
    ]
  }
];

export default exercises;