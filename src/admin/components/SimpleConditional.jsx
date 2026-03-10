export const PageError = ({ message, error }) => {
  return (
    <div className="bg-white w-full rounded-2xl p-4 font-admin">
      <section
        id="error"
        className="flex flex-col justify-between items-center mb-8"
      >
        <p>{message}</p>
        <p className="text-sm text-gray-600 italic">
          {error?.message || String(error)}
        </p>
      </section>
    </div>
  );
};

export const PageLoading = () => {
  return (
    <div className="flex flex-col items-center mb-4">
      <LucidePackage className="animate-spinalt" />
      <p>Loading...</p>
    </div>
  );
};

export const PageEmpty = () => {
  <div className="w-full text-center">
    <p>Sadly there's no data here</p>
  </div>;
};
