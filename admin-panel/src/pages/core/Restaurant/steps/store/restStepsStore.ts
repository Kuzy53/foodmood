import { create } from 'zustand';
import React from "react";

interface Step {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  label: string;
}

interface StepsState {
  activeStep: number;
  steps: any;
  nextStep: () => void;
  prevStep: () => void;
  setActiveStep: (step: number) => void;
}

const FormAboutRest = React.lazy(() => import("@/pages/core/Restaurant/steps/FormAboutRest"));
const QRCodeStep = React.lazy(() => import("@/pages/core/Restaurant/steps/QRCodeStep"));

const useRestStepsStore = create<StepsState>((set) => ({
  activeStep: 0,
  steps: [
    { component: FormAboutRest, label: 'About the restaurant' },
    { component: QRCodeStep, label: 'QR code' },
  ],
  nextStep: () => set((state) => ({
    activeStep: state.activeStep < state.steps.length - 1 ? state.activeStep + 1 : state.activeStep,
  })),
  prevStep: () => set((state) => ({
    activeStep: state.activeStep > 0 ? state.activeStep - 1 : state.activeStep,
  })),
  setActiveStep: (step) => set({ activeStep: step }),
}));

export default useRestStepsStore;
