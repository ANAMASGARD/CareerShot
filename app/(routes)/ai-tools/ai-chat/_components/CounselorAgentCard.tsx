import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming this is your button component
import { ArrowRightCircleIcon} from 'lucide-react';

type counselorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type props = {
  counselorAgent: counselorAgent;
};

function CounselorAgentCard({ counselorAgent }: props) {
  return (
    <div>
      <Image
        src={counselorAgent.image}
        alt={counselorAgent.specialist}
        width={100}
        height={100}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold text-lg mt-2 text-gray-900 dark:text-white">
        {counselorAgent.specialist} {/* Added dynamic text for the specialist name */}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-1">
        {counselorAgent.description} {/* Added dynamic description */}
      </p>
      <Button className="w-full mt-3">
        + Start a Consultation <ArrowRightCircleIcon /> {/* Step 3: Use the imported icon */}
      </Button>
    </div>
  );
}

export default CounselorAgentCard;