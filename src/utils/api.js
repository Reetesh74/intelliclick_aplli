const BASE_URL =
  "https://intelliclick-server-dev-1082184296521.us-central1.run.app/api";

// Function to retrieve the token dynamically
const getToken = () => {
  return localStorage.getItem("authToken");
};

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: token,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Updated API methods using the generic fetchWithAuth
export const getAllPlans = (planType) => {
  const endpoint = `/plan/read/get-all-plans?planType=${planType}`;
  return fetchWithAuth(endpoint);
};

export const getStateData = (countryCode) => {
  const endpoint = `/user/read/get-state-data?country=${countryCode}`;
  return fetchWithAuth(endpoint);
};

export const getClassData = () => {
  const endpoint = `/standard/read/get-all`;
  return fetchWithAuth(endpoint);
};

export const getSubjectData = () => {
  const endpoint = `/subject/read/get-all-subjects`;
  return fetchWithAuth(endpoint);
};

export const createOrUpdateStandard = (standardDetails) => {
  const endpoint = `/standard/write/insert-or-update`;
  return fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(standardDetails),
  });
};

export const addOrUpdateSubject = (subjectName, minAmount, maxAmount) => {
  const endpoint = `/subject/write/insert-or-update`;
  return fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify({
      name: subjectName,
      minAmount,
      maxAmount,
    }),
  });
};

export const createOrUpdatePlan = (planDetails) => {
  const endpoint = `/plan/write/create-or-update`;
  return fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(planDetails),
  });
};

export const deleteStandard = (standardId) => {
  const endpoint = `/standard/delete/delete-standard`;
  return fetchWithAuth(endpoint, {
    method: "DELETE",
    body: JSON.stringify({ id: standardId }),
  });
};
