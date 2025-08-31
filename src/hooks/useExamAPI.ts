// hooks/useExamAPI.ts
import { updateFormData } from "@/store/customizer/examFormSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useExamAPI = () => {
  const dispatch = useDispatch();
  const examFormData = useSelector(
    (state: RootState) => state.examForm.formData
  );

  const updateExamData = async (data: any) => {
    try {
      dispatch(updateFormData(data));
      return {
        code: 200,
        success: true,
        message: "Exam updated successfully",
        data: true, // ← This returns 'true' instead of the actual data
      };
    } catch (error) {
      console.error("Error updating exam data:", error);
      return {
        code: 500,
        success: false,
        message: "Failed to update exam data",
        data: null,
      };
    }
  };

  const getOneExamForNewExamEdit = async () => {
    return examFormData;
  };

  return {
    updateExamData,
    getOneExamForNewExamEdit,
    examFormData,
  };
};
