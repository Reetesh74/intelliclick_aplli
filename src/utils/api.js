const BASE_URL =
  "https://intelliclick-server-dev-1082184296521.us-central1.run.app/api";

export const getAllPlans = async (planType) => {
  try {
    const endpoint = `/plan/read/get-all-plans?planType=${planType}`;
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI0ODZjMDA2NmU3ZWUzMzFiZDJhN2UiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJiaXJhZy5ncHRhQGdtYWlsLmNvbSIsIm5hbWUiOiJCaXJhaiIsImlhdCI6MTczMTkyODI5NH0.osI7Pi8odYkFJhTxpaxf4ZMwIExOMIR4evhnWyTsYP0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};
