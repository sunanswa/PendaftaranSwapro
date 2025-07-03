import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Langkah {currentStep + 1} dari {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-center mt-3 font-medium text-gray-800">
          {steps[currentStep].title}
        </p>
      </div>

      {/* Desktop Steps */}
      <div className="hidden md:flex justify-between items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={index} className="flex-1 relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-full w-full h-0.5 -ml-6 z-0">
                  <div className={`h-full transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                </div>
              )}
              
              {/* Step Circle */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <Icon size={20} />
                  )}
                </div>
                
                <p className={`mt-2 text-sm font-medium text-center max-w-24 ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;