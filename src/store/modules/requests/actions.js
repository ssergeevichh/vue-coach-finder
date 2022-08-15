export default {
  async contactCoach(context, request) {
    const newRequest = {
      userEmail: request.email,
      userMessage: request.message,
    };
    const responce = await fetch(
      `https://vue-http-practice-13bfc-default-rtdb.firebaseio.com/requests/${request.coachId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      }
    );

    const responceData = await responce.json();

    if (!responce.ok) {
      const error = new Error(responceData.message || "Failed to fetch");
      throw error;
    }

    newRequest.id = responceData.name;
    newRequest.coachId = request.coachId;

    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const responce = await fetch(
      `https://vue-http-practice-13bfc-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const responceData = await responce.json();

    if (!responce.ok) {
      const error = new Error(responceData.message || "Failed to fetch");
      throw error;
    }

    const requests = [];

    for (const key in responceData) {
      const request = {
        id: key,
        userEmail: responceData[key].userEmail,
        userMessage: responceData[key].userMessage,
        coachId: coachId,
      };

      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
