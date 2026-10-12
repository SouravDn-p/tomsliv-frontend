function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-lg leading-none">•</span>
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default FilterSection;
