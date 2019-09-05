export async function changeCandidateDecision(email, url, decision, options, fetch) {
    return fetch(url + decision.toLowerCase() + '/' + email, options)
}

export async function getData(url, fetch) {
    return fetch(url);
  }