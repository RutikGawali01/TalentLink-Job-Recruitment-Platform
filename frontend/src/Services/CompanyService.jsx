import axiosInstance from "../Interceptor/AxiosInterceptor";

// ================= CREATE COMPANY =================
const createCompany = async (company) => {
  try {
    const res = await axiosInstance.post(`/company/create`, company);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ================= UPDATE COMPANY =================
const updateCompany = async (id, company) => {
  try {
    const res = await axiosInstance.put(`/company/update/${id}`, company);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ================= GET COMPANY BY EMPLOYER =================
const getCompany = async (employerId) => {
  try {
    const res = await axiosInstance.get(`/company/employer/${employerId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ================= GET JOIN REQUESTS =================
const getJoinRequests = async (companyId) => {
  try {
    const res = await axiosInstance.get(`/company/join-requests/${companyId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ================= APPROVE REQUEST =================
const approveRequest = async (requestId) => {
  try {
    const res = await axiosInstance.post(
      `/company/approve-request/${requestId}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ================= REJECT REQUEST =================
const rejectRequest = async (requestId) => {
  try {
    const res = await axiosInstance.post(
      `/company/reject-request/${requestId}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getCompanyMember = async (employerId) => {
  try {
    const res = await axiosInstance.get(`/company/member/${employerId}`);

    return res.data;
  } catch (error) {
    if (error.response?.status === 204) {
      return null;
    }

    throw error;
  }
};

const checkStatus = async (employerId) => {
  if (!employerId) return;

  try {
    const res = await axiosInstance.get(
      `/company/request-status/${employerId}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error checking company request status:", error);

     throw new Error(
      error.response?.data?.errorMessage || "Error checking company request status",
    );
  }
};



export {
  createCompany,
  updateCompany,
  getCompany,
  getJoinRequests,
  approveRequest,
  rejectRequest,
  getCompanyMember,
  checkStatus,
  
};
