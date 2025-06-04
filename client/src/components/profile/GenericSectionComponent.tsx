import React from "react";

interface GenericSectionComponentProps {
  title: string;
}

const GenericSectionComponent: React.FC<GenericSectionComponentProps> = ({
  title,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600">This section is under development.</p>
    </div>
  );
};

export default GenericSectionComponent;
