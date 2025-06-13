
interface PlaceholderSectionProps {
  title: string;
}

const PlaceholderSection = ({ title }: PlaceholderSectionProps) => {
  return (
    <p className="text-muted-foreground">Configurações para {title}</p>
  );
};

export default PlaceholderSection;
