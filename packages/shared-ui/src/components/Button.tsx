import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    font-size: ${tokens.typography.fontSize.sm};
    padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
  `,
  md: css`
    font-size: ${tokens.typography.fontSize.md};
    padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  `,
  lg: css`
    font-size: ${tokens.typography.fontSize.lg};
    padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  `
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${tokens.colors.primary[500]};
    color: ${tokens.colors.neutral[0]};

    &:hover {
      background-color: ${tokens.colors.primary[600]};
    }
  `,
  secondary: css`
    background-color: ${tokens.colors.secondary[500]};
    color: ${tokens.colors.neutral[900]};

    &:hover {
      background-color: ${tokens.colors.secondary[600]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${tokens.colors.primary[500]};
    border: 1px solid ${tokens.colors.primary[200]};

    &:hover {
      background-color: ${tokens.colors.primary[50]};
    }
  `
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const StyledButton = styled.button<Required<Pick<ButtonProps, 'variant' | 'size'>> & { $fullWidth: boolean }>`
  font-family: ${tokens.typography.fontFamily};
  border: none;
  border-radius: ${tokens.radius.md};
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  ${(props) => sizeStyles[props.size]}
  ${(props) => variantStyles[props.variant]}
  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
      display: inline-flex;
      justify-content: center;
    `}

  &:focus-visible {
    outline: 3px solid ${tokens.colors.primary[200]};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton variant={variant} size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
}

Button.displayName = 'Button';

export default Button;
