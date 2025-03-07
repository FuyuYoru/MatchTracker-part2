import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { useClickOutside } from "react-native-click-outside";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  menuContent:
    | React.ReactNode
    | ((props: { closeMenu: () => void }) => React.ReactNode);
  classNames?: string;
  offsetX?: number;
  offsetY?: number;
  onChangeState?: (value: boolean) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  menuContent,
  classNames = "",
  offsetX = 0,
  offsetY = 0,
  onChangeState = (value) => console.log(value),
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    onChangeState(isOpen);
  }, [isOpen]);

  const ref = useClickOutside<View>(() => closeMenu());

  return (
    <View className={clsx("relative z-[1000]", classNames)} ref={ref}>
      <Pressable onPress={toggleMenu} className="w-full">
        {trigger}
      </Pressable>
      {isOpen && (
        <View
          className="absolute z-[1000] w-full sm:w-[170]"
          style={{
            top: offsetY,
            right: offsetX,
            zIndex: 1000,
            elevation: 1000,
          }}
        >
          <View
            className="dropdown-content z-[1000]"
            style={{ zIndex: 1000, elevation: 1000 }}
          >
            {typeof menuContent === "function"
              ? menuContent({ closeMenu })
              : menuContent}
          </View>
        </View>
      )}
    </View>
  );
};
