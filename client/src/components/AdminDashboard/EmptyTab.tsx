import React from "react";

interface EmptyTabProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const EmptyTab: React.FC<EmptyTabProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
    <div className="w-12 h-12 text-gray-400 mx-auto mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);
