"use client";
import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import LoadingButton from "@/components/ui/LoadingButton";
import { Dayjs } from "dayjs";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Loading from "../../loading";
import { useRouter, useSearchParams } from "next/navigation";
import CommonPopup from "../../../../utils/commonpopup/index";
import ExamWizardSteps from "@/components/ExamWizardSteps";
import { ExamForm } from "@/components/ui/ExamForm";
import { useExamManagement } from "@/hooks/useExamManagement";
import { ExamDataProcessor } from "@/business/exam/examDataProcessor";
import { ExamType } from "@/business/exam/types";
import toast from "../../components/Toast";
import {
  primaryButon,
  secondaryButon,
} from "@/utils/commonstyles";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/Exam-Management",
    title: "Exam Management",
  },
  {
    title: "Create New Session",
  },
];

export default function CreateExamPage() {
  const searchRouter = useSearchParams();
  const examCourse: string | null = searchRouter.get("examcourse");
  const router = useRouter();

  const [examType, setExamType] = useState<ExamType | null>(null);
  const [isUnlimited, setIsUnlimited] = useState<boolean>(false);
  const [isTimeLimit, setIsTimeLimit] = useState<boolean>(false);
  const [availabilityDateValue, setAvailabilityDateValue] = useState<Dayjs | null>(null);
  const [dueDateValue, setDueDateValue] = useState<Dayjs | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [selectedHour, setSelectedHour] = useState("10");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedShift, setSelectedShift] = useState("AM");
  const [selectedHourDue, setSelectedHourDue] = useState("10");
  const [selectedMinuteDue, setSelectedMinuteDue] = useState("00");
  const [selectedShiftDue, setSelectedShiftDue] = useState("AM");

  const { createExam, fetchExamTypes, examTypes, isLoading } = useExamManagement();

  useEffect(() => {
    fetchExamTypes();
  }, [fetchExamTypes]);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const examData = ExamDataProcessor.prepareExamData(
        values,
        examType,
        examCourse || "",
        "America/Toronto",
        {
          hour: selectedHour,
          minute: selectedMinute,
          shift: selectedShift,
          date: availabilityDateValue,
        },
        {
          hour: selectedHourDue,
          minute: selectedMinuteDue,
          shift: selectedShiftDue,
          date: dueDateValue,
        },
        isTimeLimit
      );

      const result = await createExam(examData);
      
      if (result?.success) {
        toast({
          type: "success",
          message: "Exam has been created successfully.",
        });
        router.push(
          `/acj-exam/question-selection?examid=${result?.data?.ExamID}`
        );
      } else {
        toast({
          type: "error",
          message: "Failed to create exam. Please try again.",
        });
      }
    } catch (error) {
      toast({
        type: "error",
        message: "Sorry, something went wrong. Please try again.",
      });
      console.error("Error creating exam:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = () => {
    toast({
      type: "success",
      message: "Exam saved as draft successfully.",
    });
  };

  const handleModalClose = () => setOpenModal(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageContainer
      title="Situational Judgement Exam Create New Session"
      description="iMock Exam"
    >
      <ExamWizardSteps step={0} />

      <Box sx={{ mb: 3 }}>
        <Breadcrumb title="Create New Session" items={BCrumb} />
      </Box>

      <ExamForm
        examTypes={examTypes}
        examType={examType}
        setExamType={setExamType}
        isUnlimited={isUnlimited}
        setIsUnlimited={setIsUnlimited}
        isTimeLimit={isTimeLimit}
        setIsTimeLimit={setIsTimeLimit}
        availabilityDateValue={availabilityDateValue}
        setAvailabilityDateValue={setAvailabilityDateValue}
        dueDateValue={dueDateValue}
        setDueDateValue={setDueDateValue}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        selectedMinute={selectedMinute}
        setSelectedMinute={setSelectedMinute}
        selectedShift={selectedShift}
        setSelectedShift={setSelectedShift}
        selectedHourDue={selectedHourDue}
        setSelectedHourDue={setSelectedHourDue}
        selectedMinuteDue={selectedMinuteDue}
        setSelectedMinuteDue={setSelectedMinuteDue}
        selectedShiftDue={selectedShiftDue}
        setSelectedShiftDue={setSelectedShiftDue}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
      
      <Box mt={6}>
        <Box display={"flex"} gap={"12px"} justifyContent={"left"}>
          <Button
            sx={{
              ...secondaryButon,
              mr: "auto",
            }}
            onClick={handleSaveAsDraft}
          >
            Save as Draft
          </Button>
          
          <LoadingButton
            sx={{
              ...primaryButon,
            }}
            type="submit"
            loading={isSubmitting}
            loadingText="Creating..."
            onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                form.dispatchEvent(new Event('submit', { bubbles: true }));
              }
            }}
          >
            Next
          </LoadingButton>
        </Box>
      </Box>

      <CommonPopup
        open={openModal}
        onClose={handleModalClose}
        url={"/acj-exam"}
      />
    </PageContainer>
  );
}
