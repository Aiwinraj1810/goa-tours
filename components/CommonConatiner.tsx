type CommonContainerProps = {
  children: React.ReactNode;
  hasPaddingY?: boolean;
};

const CommonContainer = ({
  children,
  hasPaddingY = true,
}: CommonContainerProps) => {
  return (
    <div className={hasPaddingY ? "py-28" : ""}>
      {children}
    </div>
  );
};

export default CommonContainer;