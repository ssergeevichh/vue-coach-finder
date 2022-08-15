export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const responce = await fetch(
      `https://vue-http-practice-13bfc-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coachData),
      }
    );

    context.commit("registerCoach", {
      id: userId,
      ...coachData,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const responce = await fetch(
      `https://vue-http-practice-13bfc-default-rtdb.firebaseio.com/coaches.json`
    );
    const responceData = await responce.json();
    if (!responce.ok) {
      const error = new Error(responceData.error || "Failed to fetch");
      throw error;
    }
    const coaches = [];

    for (const key in responceData) {
      const coach = {
        id: key,
        firstName: responceData[key].firstName,
        lastName: responceData[key].lastName,
        description: responceData[key].description,
        hourlyRate: responceData[key].hourlyRate,
        areas: responceData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestamp");
  },
};
