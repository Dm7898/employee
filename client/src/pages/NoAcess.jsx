function NoAcess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-red-600">
        You do not have access to this page.
      </h2>
    </div>
  );
}

export default NoAcess;
