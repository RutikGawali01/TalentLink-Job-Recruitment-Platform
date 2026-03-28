import axiosInstance from "../Interceptor/AxiosInterceptor";


const uploadResume = async (file, userId) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("userId", userId);

  try {
    const response = await axiosInstance.post("/api/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Resume upload failed:", error);
    throw new Error(
      error.response?.data?.errorMessage || "Resume upload failed:",
    );
  }
};

 const analyzeResume = async (userId, resumeBase64) => {
  try {
    const response = await axiosInstance.post(
      `/api/resume/analyze/${userId}`,
      {
        resumeBase64: resumeBase64,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Analyze Resume Error:", error);
    throw error;
  }
};

export const analyzeWithUpload = async (file, userId, jobId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  formData.append("jobId", jobId);

  const response = await axiosInstance.post(
    "/api/resume/analyze-with-job",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const analyzeWithSavedResume = async (userId, jobId) => {
  const response = await axiosInstance.post(
    "/api/resume/analyze-with-job",
    null,
    {
      params: {
        userId,
        jobId,
      },
    }
  );

  return response.data;
};


export const getAnalysis = async (userId, jobId) => {
  try {
    const response = await axiosInstance.get("/api/resume/analysis", {
      params: {
        userId,
        jobId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get Analysis Error:", error);

    // If no analysis found → return null (important)
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};



export {
  uploadResume,
  analyzeResume
};
