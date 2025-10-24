import { Check } from "lucide-react";

const StepProgressBar = ({ currentStep }) => {
    // Placeholder for the progress bar
    return (
        <div className="flex w-50 h-10 border-1 items-center justify-center">
            <p>Current Step: {currentStep}</p>
        </div>
    );

//   const steps = [
//     { id: 1, name: "Getting Started" },
//     { id: 2, name: "Gathering Support" },
//     { id: 3, name: "Finalize" },
//   ];

//   return (
//     <>
//       <div className="flex justify-between">
//         {steps?.map((step, i) => {
//           const isActive = currentStep === i + 1;
//           return (
//             <div
//               key={i}
//               className={`relative flex flex-col justify-center items-center w-36 
//                 ${i !== 0 ? 'before:content-[""] before:bg-slate-200 before:absolute before:w-full before:h-[3px] before:right-2/4 before:top-1/3 before:-translate-y-2/4' : ''}
//                 ${i !== 0 ? 'before:bg-green-600' : ''}
//               `}
//             >
//               <div
//                 className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-white 
//                   bg-slate-700 
//                   ${isActive ? 'bg-sky-600' : ''}
//                   ${i + 1 < currentStep ? 'bg-green-600' : ''}
//                 `}
//               >
//                 {i + 1 < currentStep ? <Check size={24} /> : i + 1}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <p className='text-white'>{steps[currentStep - 1].name}</p>
//     </>
//   );
};

export default StepProgressBar;
