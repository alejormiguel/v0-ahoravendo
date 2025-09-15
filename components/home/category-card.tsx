import React from 'react';
import { Button } from '../ui/button';

interface CategoryCardProps {
  imageUrl: string;
  altText?: string;
  variant: 'large' | 'medium' | 'small' | 'small-flex';
  buttonPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  divClassName?: string;
  imageClassName?: string;
  hasMask?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  imageUrl,
  altText = "",
  variant,
  buttonPosition = 'bottom-right',
  divClassName = "",
  imageClassName = "",
  hasMask = false,
  buttonText = "",
  onButtonClick
}) => {
  const getCardClassName = () => {
    switch (variant) {
      case 'large':
        return "relative h-[332px] w-[856px] max-md:w-full max-md:h-[280px] max-md:max-w-[600px] max-sm:h-60";
      case 'medium':
        return "relative aspect-[2.5/1]";
      case 'small':
        return "relative rounded-xl w-[338px] max-md:w-full max-md:h-[300px] max-md:max-w-[600px] max-sm:h-[260px]";
      case 'small-flex':
        return "flex relative flex-col flex-1 items-start min-w-0 rounded-xl h-[354px] max-md:w-full max-md:h-[300px] max-md:max-w-[600px] max-sm:h-[260px]";
      default:
        return "";
    }
  };

  const getButtonClassName = () => {
    if(buttonPosition === 'bottom-left') {
      return "left-8 bottom-8";
    }
    else if(buttonPosition === 'bottom-center') {
      return "left-1/2 transform -translate-x-1/2 bottom-8";
    }
    else if(buttonPosition === 'bottom-right') {
      return "right-8 bottom-8";
    }
    return ``;
  };

  const renderButton = () => {
    if (buttonText) {
      return (
        <Button
          variant="outline"
          className={`absolute whitespace-nowrap rounded-xl text-primary-foreground px-4 py-2 ` + getButtonClassName()}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      );
    }
    return null;
  }

  return (
    <div className={getCardClassName() + ` ${divClassName}`}>
      <img
        src={imageUrl}
        alt={altText}
        className={`object-cover rounded-xl size-full ${imageClassName}`}
      />
      { renderButton()}
    </div>
  );
};
