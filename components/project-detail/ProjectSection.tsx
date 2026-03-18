interface ProjectSectionProps {
  label: string;
  children: React.ReactNode;
}

export function ProjectSection({ label, children }: ProjectSectionProps) {
  return (
    <div className="mb-10">
      <p className="section-label">{label}</p>
      {children}
    </div>
  );
}
