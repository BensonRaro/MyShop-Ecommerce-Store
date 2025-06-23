const Heading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full">
      <h2 className="lg:text-3xl text-xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-gray-400 dark:text-gray-300 mt-2 mb-2">
        {description}
      </p>
    </div>
  );
};

export default Heading;
