type CommonContainerProps = {
  children: React.ReactNode;
  hasPaddingY?: boolean;
};

const CommonContainer = ({
  children,
  hasPaddingY = true,
}: CommonContainerProps) => {
  return (
    <div className={hasPaddingY ? "py-32 md:pt-48" : ""}>
      {children}
    </div>
  );
};

export default CommonContainer;