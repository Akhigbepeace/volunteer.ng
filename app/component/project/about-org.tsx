import { IoLogoAppleAr } from "react-icons/io5";

const AboutOrg = () => {
  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6">
          <h2 className="text-2xl font-bold text-primary">About the org</h2>

          <p className="text-gray-700 mt-1">
            Marin City Community Development Corporation
          </p>

          {/* Causes */}
          <h3 className="text-md font-bold text-gray-800 mt-4">Causes</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Employment Services", "Human Services", "Youth Development"].map(
              (cause) => (
                <span
                  key={cause}
                  className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-lg"
                >
                  {cause}
                </span>
              )
            )}
          </div>

          {/* Posted By */}
          <h3 className="text-md font-bold text-gray-800 mt-4">Posted by</h3>
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-900 font-bold">
              HJ
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">Harald J</p>
              <p className="text-sm text-gray-600">Finance Director</p>
            </div>
          </div>

          {/* Mission */}
          <h3 className="text-md font-bold text-gray-800 mt-4">Our mission</h3>
          <p className="text-gray-700 mt-2">
            Our mission is to enhance social, economic, and climate justice for
            underserved, marginalized, and low-income people through employment
            services, mental health, and education.
          </p>

          {/* What we do */}
          <h3 className="text-md font-bold text-gray-800 mt-4">What we do</h3>
          <p className="text-gray-700 mt-2">
            We offer the following: Job Readiness Training - Employment Services
            - Financial Education - Youth Services - Construction Trades Program
            - Small Medium Enterprise - Affordable Housing Assistance -
            Empowerment Clubhouse (Mental Health) - Vendor for State of
            California Dept of Rehabilitation
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">✨ Fun Fact</h3>
          <p className="text-gray-700 mt-3">
            Our Empowerment Clubhouse members prepare{" "}
            <span className="font-bold">$2.00</span> a day lunches for the staff
            so that they may practice independent living and dining with a
            social flair! We are 5 minutes away from the San Francisco Golden
            Gate Bridge.
          </p>
          <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            More about the org
          </button>

          {/* Sponsor */}
          <div className="mt-6 text-center">
            <p className="text-gray-700 text-sm">
              Our project is sponsored by:
            </p>
            <div className="flex justify-center mt-3">
              <IoLogoAppleAr size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOrg;
