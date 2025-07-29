const app = require('express')();
const jobs = {};

app.post('/submit', (req, res) => {
    const jobId = Date.now();
    jobs[jobId] = { status: 'processing' };
    updateJob(jobId, 0);
    res.end("\n" + jobId + "\n");
});

app.get('/checkstatus', async (req, res) => {
    console.log(jobs[req.query.jobId]);
    // long polling, don't return until job is done
    while(await checkJobComplete(req.query.jobId) === false){};
    res.end("\n Job Status: Complete " + jobs[req.query.jobId] + "\n");
});

app.listen (3000, () => {
    console.log('Server is running on port 3000');
});

async function checkJobComplete(jobId) {
    return new Promise((resolve) => {
        if(jobs[jobId] < 100)
            this.setTimeout(() => resolve(false), 1000);
        else {
            resolve(true);
        }
    });
}

function updateJob(jobId, progress) {
    jobs[jobId] = progress;
    console.log(`Job ${jobId} updated to progress: ${progress}`);
    if (progress === 100) return;
    this.setTimeout(() => updateJob(jobId, progress + 10), 3000);
}