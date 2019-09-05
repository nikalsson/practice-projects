const {
    filterRejectedCandidates,
    filterCandidatesAcceptedForLectures,
    filterCandidatesForWorkshop,
    prepareFilesList,
    filterCandidatesMovedToLecture
} = require('../src/candidatesStatistics')

describe("filterRejectedCandidates", () => {
    test("should return only candidates rejected from workshops", () => {
        //given
        const candidates = [
            {decision: "MV_LEC"},
            {decision: "ACC_WOR"},
            {decision: "ACC_LEC"},
            {decision: "REJ"},
        ]
        //when
        const result = filterRejectedCandidates(candidates);
        //then
        expect(result).toStrictEqual([{decision:"REJ"}]);
    })
})

describe("filterCandidatesAcceptedForLectures", () => {
    test("should return only candidates accepted to lecture", () => {
        //given
        const candidates = [
            {decision: "MV_LEC"},
            {decision: "ACC_WOR"},
            {decision: "ACC_LEC"},
            {decision: "REJ"},
        ]
        //when
        const result = filterCandidatesAcceptedForLectures(candidates);
        //then
        expect(result).toStrictEqual([{decision: "ACC_LEC"}]);
    })
})

describe("filterCandidatesMovedToLecture", () => {
    test("should return only candidates moved to lecture", () => {
        //given
        const candidates = [
            {decision: "MV_LEC"},
            {decision: "ACC_WOR"},
            {decision: "ACC_LEC"},
            {decision: "REJ"},
        ]
        //when
        const result = filterCandidatesMovedToLecture(candidates);
        //then
        expect(result).toStrictEqual([{decision: "MV_LEC"}]);
    })
})

describe("filterCandidatesForWorkshop", () => {
    test("should return only candidates accepted to particular workshop", () => {
        //given
        const candidates = [
            {decision: "MV_LEC", workshop: 1},
            {decision: "ACC_WOR", workshop: 1},
            {decision: "ACC_LEC", workshop: 1},
            {decision: "REJ", workshop: 1},
        ]
        //when
        const result = filterCandidatesForWorkshop(candidates,1);
        //then
        expect(result).toStrictEqual([{decision:"ACC_WOR", workshop: 1}]);
    })
})

describe("filterCandidatesForWorkshop", () => {
    test("should return no candidates for incorrect parameter", () => {
        //given
        const candidates = [
            {decision: "MV_LEC", workshop: 1},
            {decision: "ACC_WOR", workshop: 1},
            {decision: "ACC_LEC", workshop: 1},
            {decision: "REJ", workshop: 1},
        ]
        //when
        const result = filterCandidatesForWorkshop(candidates,7);
        //then
        expect(result).toStrictEqual([]);
    })
})

describe("prepareFilesList", () => {
    test("should return proper file list", () => {
        //given
        const candidates = [
            {decision: "MV_LEC", workshop: 1},
            {decision: "ACC_WOR", workshop: 1},
            {decision: "ACC_WOR", workshop: 2},
            {decision: "ACC_WOR", workshop: 3},
            {decision: "ACC_WOR", workshop: 4},
            {decision: "ACC_WOR", workshop: 5},
            {decision: "ACC_WOR", workshop: 6},
            {decision: "ACC_LEC", workshop: 1},
            {decision: "REJ", workshop: 1},
        ]
        //when
        const result = prepareFilesList(candidates);
        //then
        expect(result).toStrictEqual(
            [
                { fileName: "workshop1.csv", data: [{decision: "ACC_WOR", workshop: 1}]},
                { fileName: "workshop2.csv", data: [{decision: "ACC_WOR", workshop: 2}] },
                { fileName: "workshop3.csv", data: [{decision: "ACC_WOR", workshop: 3}] },
                { fileName: "workshop4.csv", data: [{decision: "ACC_WOR", workshop: 4}] },
                { fileName: "workshop5.csv", data: [{decision: "ACC_WOR", workshop: 5}] },
                { fileName: "workshop6.csv", data: [{decision: "ACC_WOR", workshop: 6}] },
                { fileName: "moved_to_lecture.csv", data: [{decision: "MV_LEC", workshop: 1}] },
                { fileName: "accepted_to_lecture.csv", data: [{decision: "ACC_LEC", workshop: 1}] },
                { fileName: "rejected.csv", data: [{decision: "REJ", workshop: 1}] }
            ]
        )
    })
})