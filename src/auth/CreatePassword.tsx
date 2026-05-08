import AuthLayout from "../components/layouts/AuthLayout";

const CreatePassword = () => {
  return (
    <AuthLayout contentWidth="max-w-sp517">
      <div className="mb-sp72">
        <h2 className="text-40 leading-60 uppercase text-black mb-6 font-bold">
          Create new password
        </h2>
        <input
          type="text"
          placeholder="New Password"
          className="w-full bg-white p-5 text-lg rounded-2xl mb-4"
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="w-full bg-white p-5 text-lg rounded-2xl"
        />
        <div className="mt-6">
          <p className="mb-4">Your password needs to include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Uppercase letters (A-Z)</li>
            <li>Lowercase letters (a-z)</li>
            <li>Numbers (0-9)</li>
            <li>Special characters (e.g., !, @, #, $, %)</li>
          </ul>
        </div>
      </div>
      <button className="bg-primary text-black py-sp18 w-full text-center text-lg rounded-2xl font-bold">
        Submit
      </button>
    </AuthLayout>
  );
};

export default CreatePassword;
