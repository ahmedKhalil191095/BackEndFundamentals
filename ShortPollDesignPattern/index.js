const app = require('express')();
const jobs = {};

// How to test this example 
// Start the server: node index.js
// run this command in the terminal: curl -X POST http://localhost:3000/submit
// This will return a job ID that you can use to check the status.
// Check the status: curl "http://localhost:3000/checkstatus?jobId=your_job_id_here"


app.post('/submit', (req, res) => {
    const jobId = `${Date.now()}`
    jobs[jobId] = 0; 
    updateJob(jobId, 0);
    res.end("\n\n" + jobId + "\n\n");
});


app.get('/checkstatus', (req, res) => {
    console.log(jobs[req.query.jobId]);
    res.end('\n\nJobStatus: ' + jobs[req.query.jobId] + '%\n\n');
});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
console.log('Poll Design Pattern server is running on port 3000');

function updateJob(jobId, progress) {
    jobs[jobId] = progress;
    console.log(jobs);
    console.log(`Job ${jobId} updated to progress: ${progress}`);
    if (progress === 100) return;
    this.setTimeout(() => updateJob(jobId, progress + 10), 3000);
}