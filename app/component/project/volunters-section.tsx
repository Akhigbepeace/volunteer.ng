import { Volunteers } from "@/data/project";
import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export type StatusUpdateProps = {
  volunteerId: string;
  status: "accepted" | "rejected";
};

interface VolunteersSectionProps {
  volunteers: Volunteers[];
  onStatusUpdate?: (props: StatusUpdateProps) => void;
}

const VolunteersSection = (props: VolunteersSectionProps) => {
  const { volunteers, volunteers: isOwner, onStatusUpdate } = props;

  const normalizedVolunteers = volunteers.map((v) => ({
    ...v,
    status: v.status ?? "pending",
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-lg flex-shrink-0">
                      {volunteer.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {volunteer.displayName}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center items-start gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaEnvelope className="text-xs" />
                        {volunteer.contactEmail}
                      </span>
                      {volunteer.phone && (
                        <span className="flex items-center gap-1">
                          <FaPhone className="text-xs" />
                          {volunteer.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {volunteer.skills && volunteer.skills.length > 0 && (
                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* {volunteer.message && (
                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Application Message:
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {volunteer.message}
                    </p>
                  </div>
                )} */}

                {/* Applied Date */}
                <p className="text-xs text-gray-500">
                  Applied on {formatDate(volunteer.createdAt)}
                </p>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-row md:flex-col md:items-end justify-between items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                    volunteer.status
                  )}`}
                >
                  {getStatusIcon(volunteer.status)}
                  <span className="capitalize">{volunteer.status}</span>
                </div>

                {/* Action buttons for project owner */}
                {isOwner &&
                  volunteer.status === "pending" &&
                  onStatusUpdate && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onStatusUpdate({
                            volunteerId: volunteer._id,
                            status: "accepted",
                          })
                        }
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          onStatusUpdate({
                            volunteerId: volunteer._id,
                            status: "rejected",
                          })
                        }
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
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
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {
                normalizedVolunteers.filter((v) => v.status === "pending")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {
                normalizedVolunteers.filter((v) => v.status === "accepted")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Accepted</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {
                normalizedVolunteers.filter((v) => v.status === "rejected")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteersSection;
