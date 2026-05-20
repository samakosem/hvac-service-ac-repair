type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div" | "article";
  id?: string;
};

export default function SectionWrapper({
  children,
  className = "",
  innerClassName = "",
  as: Tag = "section",
  id,
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={`py-16 lg:py-24 ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${innerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
