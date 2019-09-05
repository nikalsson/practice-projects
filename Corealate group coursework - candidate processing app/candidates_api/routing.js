const {
    addNewCandidate,
    getAllCandidates,
    getCandidatesByLecture,
    getCandidatesByWorkshop,
    getCandidateByEmail,
    getCandidatesByWorkshopAndLecture,
    getAllCandidatesForLecture,
    getAllCandidatesForWorkshop,
    countCandidatesWithDecision,
    getCandidateLists

} = require('./src/candidateController')

const { getCandidatesStatistics } = require('./src/candidatesStatistics')

const {
    moveToLecture,
    acceptLecture,
    acceptWorkshop,
    reject
} = require('./src/choiceController')

function choiceRouting(app) {
    app.put('/candidates/decision/mv_lec/:email', async (request, response) => {
        console.log("PUT /candidates/decision/mv_lec ", request.params)
        const { email } = request.params
        const candidate = await getCandidateByEmail(email, response);
        await moveToLecture(candidate[0], response);
    })

    app.put('/candidates/decision/acc_wor/:email', async (request, response) => {
        console.log("PUT /candidates/decision/acc_wor ", request.params)
        const { email } = request.params
        const candidate = await getCandidateByEmail(email, response)
        await acceptWorkshop(candidate[0], response);
    })

    app.put('/candidates/decision/acc_lec/:email', async (request, response) => {
        console.log("PUT /candidates/decision/acc_lec ", request.params)
        const { email } = request.params
        const candidate = await getCandidateByEmail(email, response)
        await acceptLecture(candidate[0], response);
    })

    app.put('/candidates/decision/rej/:email', async (request, response) => {
        console.log("PUT /candidates/decision/rej ", request.params)
        const { email } = request.params
        const candidate = await getCandidateByEmail(email, response)
        await reject(candidate[0],response);
    })
}

function candidateRouting(app) {
    app.get('/candidates', async (request, response) => {
        console.log("GET /candidates/")
        response.send(await getAllCandidates(response))
    })

    app.post('/candidates', async (request, response) => {
        const { name,
            lastname,
            email,
            role,
            company,
            workshop,
            is_lecture,
            motivation,
        } = request.body
        console.log("POST /candidates ", request.body)
        await addNewCandidate(name, lastname, email, role, company, workshop, is_lecture, motivation, response)
    })

    app.get('/candidates/lecture/:lecture', async (request, response) => {
        const { lecture } = request.params
        console.log("GET /candidates/lecture/", request.params);
        response.send(await getCandidatesByLecture(lecture, response));
    }
    )

    app.get('/candidates/workshop/:workshop', async (request, response) => {
        const { workshop } = request.params
        console.log("GET /candidates/workshop/", request.params);
        response.send(await getCandidatesByWorkshop(workshop, response));
    })

    app.get('/candidates/workshop/:workshop/lecture/:lecture', async (request, response) => {
        const { workshop, lecture } = request.params
        console.log("GET /candidates/workshop/lecture", request.params);
        response.send(await getCandidatesByWorkshopAndLecture(workshop, lecture, response));
    })

    app.get('/candidates/workshop', async (request, response) => {
        console.log("GET /candidate/workshop");
        response.send(await getAllCandidatesForWorkshop(response));
    })

    app.get('/candidates/lecture', async (request, response) => {
        console.log("GET /candidate/lecture");
        response.send(await getAllCandidatesForLecture(response));
    })

    app.get('/candidates/positivedecision', async (request, response) => {
        console.log("GET /candidates/positivedecision");
        response.send(await countCandidatesWithDecision(response));
    })

    app.get('/candidates/lists', async (request, response) => {
        console.log("GET /candidates/lists");
        const candidates = await getCandidateLists(response)
        if (candidates.length === 0) response.status(404).send("Nie znaleziono kandydatów");
        response.set('Access-Control-Expose-Headers', 'Content-Length');
        response.set('Access-Control-AllowOrigin', 'cross-origin');
        response.set('Content-Type', 'application-zip');
        getCandidatesStatistics(candidates, response);
    })
}




module.exports = {
    candidateRouting,
    choiceRouting
}