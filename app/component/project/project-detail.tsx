import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const Details = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6">
          <h2 className="text-2xl font-bold text-primary">Project details</h2>
          <div className="mt-10">
            <h3 className="text-lg font-bold text-secondary">What we need</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>
                Setup of selected CRM system (e.g. Airtable, Salsa CRM,
                Salesforce, etc.), including customizations and history
                tracking.
              </li>
              <li>
                A customized set of views and reports for table-based editing
                and analysis.
              </li>
              <li>
                Migration of Organization&apos;s current database to identified
                CRM system.
              </li>
              <li>
                Training and guidelines on managing the system and generating
                reports.
              </li>
              <li>
                “Hand-off” documentation on object schemas and custom code.
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-secondary">
              Additional details
            </h3>
            <p className="text-gray-700 mt-2">
              We have Salesforce for NGOs and just recently added case
              management. We need help setting up intake case management so the
              program can be more effective.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-secondary">
              What we have in place
            </h3>
            <p className="text-gray-700 mt-2">
              We currently have Salesforce, which makes it easier to get
              started. We also have Salesforce Case Management.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-secondary">
              How this will help
            </h3>
            <p className="text-gray-700 mt-2">
              This project will save{" "}
              <span className="font-bold text-primary">$10,792</span>, allowing
              us to Unscab about monetary savings.
            </p>
          </div>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary">
            The right volunteer
          </h2>
          <div className="mt-4">
            <h3 className="text-md font-bold text-gray-800">
              Skills & experience
            </h3>
            <div className="mt-2">
              <span className="inline-block bg-white text-gray-900 text-sm font-medium px-3 py-1 rounded-lg border border-gray-300">
                Database Administration
              </span>
              <span className="inline-block bg-white text-gray-900 text-sm font-medium px-3 py-1 rounded-lg border border-gray-300 mt-2">
                Information Technology
              </span>
            </div>
          </div>

          <ul className="mt-4 list-inside list-disc">
            <li className="text-gray-700">Proficiency with CRM systems</li>
            <li>Experience in database design and light coding</li>
          </ul>

          <div className="mt-4">
            <h3 className="text-md font-bold text-gray-800">Availability</h3>
            <ul className="text-gray-700 mt-2 list-inside list-disc">
              <li>Works remotely from anywhere</li>
              <li> 20-50 hours over 4-8 weeks</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary flex items-center gap-2">
              <FaInfoCircle color="#FF" size={30} />
              Project may require a short interview.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
