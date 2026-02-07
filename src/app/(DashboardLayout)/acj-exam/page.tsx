"use client";
import React from "react";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useExamWizardStore } from "@/store/useExamWizardSteps";
import CreateExamForm from "../components/create-acj-exam/CreateExamForm";
import StationManagement from "../components/question-selection/StationManagement";
import AssignTrainee from "../components/assign-trainee/AssignTrainee";
import ReviewDetails from "../components/review-details/ReviewDetails";

export default function ImockExam() {
  const step = useExamWizardStore((s) => s.step);
  return (
    <PageContainer title="Exam Listing" description="Exam Listing">
      <>
        {step === "createExam" ? <CreateExamForm /> : null}
        {step === "questionData" ? <StationManagement /> : null}
        {step === "assignTrainee" ? <AssignTrainee /> : null}
        {step === "reviewDetails" ? <ReviewDetails /> : null}
      </>
    </PageContainer>
  );
}
