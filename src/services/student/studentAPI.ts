// Mock student API for now
export const getStudentList = async (params: any) => {
  return {
    success: true,
    data: {
      results: []
    }
  };
};

export const assignStudent = async (data: any) => {
  return {
    success: true,
    message: "Student assigned successfully"
  };
};

export const removeStudent = async (data: any) => {
  return {
    success: true,
    message: "Student removed successfully"
  };
};

export const getLocationList = async (params: any) => {
  return {
    success: true,
    data: {
      results: []
    }
  };
};

export const getAvailableStudentList = async (params: any) => {
  return {
    success: true,
    data: {
      results: []
    }
  };
};

export const deleteStudent = async (data: any) => {
  return {
    success: true,
    message: "Student deleted successfully"
  };
};
