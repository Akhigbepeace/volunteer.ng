import { Volunteers } from "@/data/project";
import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaCalendarAlt,
  FaGraduationCap,
  FaTools,
} from "react-icons/fa";

export type StatusUpdateProps = {
  volunteerId: string;
  status: "accepted" | "rejected";
};

type VolunteersSectionProps = {
  volunteers: Volunteers[];
  onStatusUpdate?: (props: StatusUpdateProps) => void;
};

const VolunteersSection = (props: VolunteersSectionProps) => {
  const { volunteers, onStatusUpdate } = props;

  const normalizedVolunteers = volunteers.map((v) => ({
    ...v,
    status: v.status ?? "pending",
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <FaCheckCircle className="text-green-600" />;
      case "rejected":
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaClock className="text-yellow-600" />;
    }
  };

  if (normalizedVolunteers.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 mt-10">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Applied Volunteers
        </h2>
        <div className="text-center py-8">
          <FaUser className="mx-auto text-gray-400 text-4xl mb-4" />
          <p className="text-gray-500">
            No volunteers have applied for this project yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 mt-10">
      <h2 className="text-2xl font-bold text-primary my-6">
        Applied Volunteers ({volunteers.length})
      </h2>

      <div className="space-y-4">
        {normalizedVolunteers.map((volunteer) => (
          <div
            key={volunteer._id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-lg flex-shrink-0">
                      {volunteer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {volunteer.name}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center items-start gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaEnvelope className="text-xs text-blue-500" />
                        {volunteer.email}
                      </span>
                      {volunteer.phone && (
                        <span className="flex items-center gap-1">
                          <FaPhone className="text-xs text-green-500" />
                          {volunteer.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Compact Skills and Qualifications Section */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    {/* Experience */}
                    <div className="flex items-center gap-1">
                      <FaBriefcase className="text-blue-500 flex-shrink-0" />
                      <div>
                        <div className="text-gray-500 font-medium">
                          Experience
                        </div>
                        <div className="text-gray-800 font-semibold truncate">
                          {volunteer.experience}
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-green-500 flex-shrink-0" />
                      <div>
                        <div className="text-gray-500 font-medium">
                          Available
                        </div>
                        <div className="text-gray-800 font-semibold truncate">
                          {volunteer.availability}
                        </div>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div className="flex items-center gap-1">
                      <FaGraduationCap className="text-purple-500 flex-shrink-0" />
                      <div>
                        <div className="text-gray-500 font-medium">
                          Education
                        </div>
                        <div className="text-gray-800 font-semibold truncate">
                          {volunteer.qualifications}
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex items-center gap-1">
                      <FaTools className="text-orange-500 flex-shrink-0" />
                      <div>
                        <div className="text-gray-500 font-medium">Skills</div>
                        <div className="text-gray-800 font-semibold truncate">
                          {volunteer.skills}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {volunteer.message && (
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-700 mb-2 font-bold flex items-center gap-2">
                      <FaEnvelope className="text-gray-500 text-xs" />
                      Application Message:
                    </h4>
                    <blockquote className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-gray-300 italic">
                      {volunteer.message}
                    </blockquote>
                  </div>
                )}
              </div>

              {/* Status and Actions */}
              <div className="flex flex-row md:flex-col md:items-end justify-between items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium shadow-sm ${getStatusColor(
                    volunteer.status
                  )}`}
                >
                  {getStatusIcon(volunteer.status)}
                  <span className="capitalize">{volunteer.status}</span>
                </div>

                {/* Action buttons for project owner */}
                {volunteer.status === "pending" && onStatusUpdate && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onStatusUpdate({
                          volunteerId: volunteer._id,
                          status: "accepted",
                        })
                      }
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center gap-1"
                    >
                      <FaCheckCircle className="text-xs" />
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        onStatusUpdate({
                          volunteerId: volunteer._id,
                          status: "rejected",
                        })
                      }
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center gap-1"
                    >
                      <FaTimesCircle className="text-xs" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-2">
              <FaClock className="text-lg" />
              {
                normalizedVolunteers.filter((v) => v.status === "pending")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600 font-medium">Pending</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
              <FaCheckCircle className="text-lg" />
              {
                normalizedVolunteers.filter((v) => v.status === "accepted")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600 font-medium">Accepted</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200 shadow-sm">
            <div className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
              <FaTimesCircle className="text-lg" />
              {
                normalizedVolunteers.filter((v) => v.status === "rejected")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600 font-medium">Rejected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteersSection;
