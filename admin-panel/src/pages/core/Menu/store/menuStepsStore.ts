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

const AboutMenu = React.lazy(() => import("@/pages/core/Menu/steps/AboutMenu"));
const Categories = React.lazy(() => import("@/pages/core/Menu/steps/Categories"));
const Dishes = React.lazy(() => import("@/pages/core/Menu/steps/Dishes"));
const Modifiers = React.lazy(() => import("@/pages/core/Menu/steps/Modifiers"));

const useMenuStepsStore = create<StepsState>((set) => ({
  activeStep: 0,
  steps: [
    { component: AboutMenu, label: 'About the menu' },
    { component: Categories, label: 'Categories' },
    { component: Dishes, label: 'Dishes' },
    { component: Modifiers, label: 'Modifiers' },
  ],
  nextStep: () => set((state) => ({
    activeStep: state.activeStep < state.steps.length - 1 ? state.activeStep + 1 : state.activeStep,
  })),
  prevStep: () => set((state) => ({
    activeStep: state.activeStep > 0 ? state.activeStep - 1 : state.activeStep,
  })),
  setActiveStep: (step) => set({ activeStep: step }),
}));

export default useMenuStepsStore;
