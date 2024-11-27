const BASE_URL =
  "https://intelliclick-server-dev-1082184296521.us-central1.run.app/api";

// Function to retrieve the token dynamically
const getToken = () => localStorage.getItem("authToken");

// Generic function to fetch with authentication and improved response handling
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

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${error.message}`);
  }

  // Return full response object including status and ok
  return {
    status: response.status,
    ok: response.ok,
    data,
  };
};

// Helper function for error handling in API functions
const handleResponse = (response, errorMessage) => {
  if (!response.ok) {
    const error = response.data?.message || "Unknown error";
    throw new Error(`${errorMessage}: ${error}`);
  }
  return response.data;
};

// API functions using the improved fetchWithAuth

export const getAllPlans = async (planType) => {
  const endpoint = `/plan/read/get-all-plans?planType=${planType}`;
  const response = await fetchWithAuth(endpoint);
  return handleResponse(response, "Failed to fetch plans");
};

export const getStateData = async (countryCode) => {
  const endpoint = `/user/read/get-state-data?country=${countryCode}`;
  const response = await fetchWithAuth(endpoint);
  return handleResponse(response, "Failed to fetch state data");
};

export const getClassData = async () => {
  const endpoint = `/standard/read/get-all`;
  const response = await fetchWithAuth(endpoint);
  return handleResponse(response, "Failed to fetch class data");
};

export const getSubjectData = async () => {
  const endpoint = `/subject/read/get-all-subjects`;
  const response = await fetchWithAuth(endpoint);
  return handleResponse(response, "Failed to fetch subject data");
};

export const createOrUpdateStandard = async (standardDetails) => {
  const endpoint = `/standard/write/insert-or-update`;
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(standardDetails),
  });
  return response;
};

export const addOrUpdateSubject = async (subjectName, minAmount, maxAmount) => {
  const endpoint = `/subject/write/insert-or-update`;
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify({
      name: subjectName,
      minAmount,
      maxAmount,
    }),
  });
  return handleResponse(response, "Failed to create or update subject");
};

export const createOrUpdatePlan = async (planDetails) => {
  const endpoint = `/plan/write/create-or-update`;
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(planDetails),
  });
  return handleResponse(response, "Failed to create or update plan");
};

export const deleteStandard = async (standardId) => {
  const endpoint = `/standard/delete/delete-standard`;
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
    body: JSON.stringify({ id: standardId }),
  });

  return response;
};

export const deleteSubject = async (subjectId)=>{
  const endpoint = `/subject/delete/delete-subject`;
  const response = await fetchWithAuth(endpoint,{
    method:"DELETE",
    body:JSON.stringify({id:subjectId})
  });
  
  return response;
}
