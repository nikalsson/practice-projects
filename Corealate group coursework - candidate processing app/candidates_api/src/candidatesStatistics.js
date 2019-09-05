const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const archiver = require('archiver');
const uudidv1 = require('uuid/v1');


async function getCandidatesStatistics(candidates, response) {
  const archive = archiver('zip');
  const dir = './src/temp/' + uudidv1() + "/"
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const lists = prepareFilesList(candidates);

  archive.pipe(response);

  archive.on('error', (error) => {
    console.log(error);
    response.status(408).send("Nie udało się utworzyć raportu");
  });

  lists.map(async x => {
    await writeCsvFile(dir + x.fileName, x.data)
  });

  archive.directory(dir, false);

  archive.finalize();
}

function filterCandidatesForWorkshop(candidates, workshop) {
  return candidates.filter(candidate => candidate.decision === 'ACC_WOR' && candidate.workshop === workshop);

}

function filterCandidatesAcceptedForLectures(candidates) {
  return candidates.filter(candidate => candidate.decision === 'ACC_LEC');
}

function filterCandidatesMovedToLecture(candidates) {
  return candidates.filter(candidate => candidate.decision === "MV_LEC");
}

function filterRejectedCandidates(candidates) {
  return candidates.filter(candidate => candidate.decision === 'REJ');
}

function prepareFilesList(candidates) {
  const lists = [];

  for (let i = 1; i <= 6; i++) {
    lists.push({
      fileName: "workshop" + i + ".csv",
      data: filterCandidatesForWorkshop(candidates, i)
    })
  }

  lists.push({ fileName: "moved_to_lecture.csv", data: filterCandidatesMovedToLecture(candidates) })
  lists.push({ fileName: "accepted_to_lecture.csv", data: filterCandidatesAcceptedForLectures(candidates) });
  lists.push({ fileName: "rejected.csv", data: filterRejectedCandidates(candidates) });

  return lists;
}

async function writeCsvFile(path, data) {
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'name', title: 'Name' },
      { id: 'lastname', title: 'Surname' },
      { id: 'email', title: 'Email' },
    ]
  });

  await csvWriter
    .writeRecords(data)
    .catch(error => console.log(error))
}

module.exports = {
  getCandidatesStatistics,
  filterRejectedCandidates,
  filterCandidatesAcceptedForLectures,
  filterCandidatesForWorkshop,
  prepareFilesList,
  filterCandidatesMovedToLecture
}