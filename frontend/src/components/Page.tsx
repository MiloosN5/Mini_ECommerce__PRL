interface PageProps {
  blockPrefix: string;
  children: React.ReactNode;
}

const Page = ({ blockPrefix, children }: PageProps) => {
  return <div className={`page ${blockPrefix}-page`}>{children}</div>;
};

export default Page;
