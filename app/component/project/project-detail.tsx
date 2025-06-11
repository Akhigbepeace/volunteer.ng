import { Project } from "@/data/project";
import React from "react";

type Props = {
  project: Project;
};

const ProjectDetails: React.FC<Props> = ({ project }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-bold text-primary">Project details</h2>

      <div className="mt-10">
        <h3 className="text-lg font-bold text-secondary">What we need</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
          {project.requirements?.map((item, index) => (
            <li key={index}>{item}</li>
          )) || (
            <li className="text-gray-500 italic">
              No specific requirements listed.
            </li>
          )}
        </ul>
      </div>

      {project.description && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-secondary">
            Additional details
          </h3>
          <p className="text-gray-700 mt-2">{project.description}</p>
        </div>
      )}

      {project.skills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-secondary">Required Skills</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {project.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {project.benefits && project.benefits.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-secondary">Benefits</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {project.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-bold text-secondary">Project Timeline</h3>
        <p className="text-gray-700 mt-2">Duration: {project.duration}</p>
        {project.startDate && (
          <p className="text-gray-700">Start: {project.startDate}</p>
        )}
        {project.endDate && (
          <p className="text-gray-700">End: {project.endDate}</p>
        )}
        <p className="text-gray-700">Deadline: {project.deadline}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-secondary">Other Info</h3>
        <p className="text-gray-700">
          Number of hours: {project.numberOfHours} hrs
        </p>
        <p className="text-gray-700">Status: {project.status}</p>
        {project.location.length > 0 && (
          <p className="text-gray-700">Location: {project.location}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
