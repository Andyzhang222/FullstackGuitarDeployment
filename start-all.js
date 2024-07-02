const { spawn } = require('child_process');

// Function to kill process on a specific port
const killPort = (port) => {
  const lsof = spawn('lsof', ['-ti', `tcp:${port}`]);
  lsof.stdout.on('data', (data) => {
    const pids = data.toString().trim().split('\n');
    pids.forEach((pid) => {
      spawn('kill', ['-9', pid]);
    });
  });
};

// Handle script exit
const handleExit = () => {
  killPort(3000);
  killPort(3001);
  process.exit();
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

// 启动前端
const frontend = spawn('yarn', ['start'], { cwd: 'frontend', stdio: 'inherit' });

// 启动后端
const backend = spawn('yarn', ['start'], { cwd: 'backend', stdio: 'inherit' });

// 捕获前端进程关闭事件
frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
});

// 捕获后端进程关闭事件
backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});