import React from "react";
import { IconProps } from "./types";

export interface GenericIconWrapperProps extends IconProps {
  icon: React.ComponentType<IconProps>;
}

export const Icon: React.FC<GenericIconWrapperProps> = ({
  icon: IconComponent,
  size = 24,
  className,
  title,
  ...props
}) => {
  return (
    <IconComponent
      size={size}
      className={className}
      title={title}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
      {...props}
    />
  );
};

export default Icon;
