import axiosInstance from "../Interceptor/AxiosInterceptor";

// CREATE
const createCompany = async (company) => {
  try {
    const res = await axiosInstance.post(`/company/create`, company);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// UPDATE
const updateCompany = async (id, company) => {
  try {
    const res = await axiosInstance.put(`/company/update/${id}`, company);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// FETCH
const getCompany = async (employerId) => {
  try {
    const res = await axiosInstance.get(`/company/employer/${employerId}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export { createCompany, updateCompany, getCompany };
