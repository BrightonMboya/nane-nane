import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import util from "helpers/util";

const useAutoScroll = () => {
  const yCoordinates = useRef({});
  let scrollRef = null;

  const setScrollRef = (ref: any) => {
    if (ref) scrollRef = ref;
  };

  const scrollTo = (errors) => {
    const firstInvalidKey = util.getFirstConditionalKey(
      yCoordinates.current,
      "y",
      errors,
    );
    if (yCoordinates.current[firstInvalidKey].ref) {
      yCoordinates.current[firstInvalidKey].ref.handleFocus({
        nativeEvent: { text: "Dummy name" },
      });
    }

    scrollRef.scrollTo(0, yCoordinates.current[firstInvalidKey].y);
  };

  const captureRef = (inputKey) => (ref) => {
    if (ref) {
      if (yCoordinates.current[inputKey]) {
        yCoordinates.current[inputKey].ref = ref;
      } else {
        yCoordinates.current[inputKey] = {};
        yCoordinates.current[inputKey].ref = ref;
      }
    }
  };

  const scrollTracker = (component: React.FC, inputKey: string | number) => {
    let viewRef: View;

    const getScrollToY = (py: number) =>
      py - Dimensions.get("window").height / 5.5;

    const getCoordinates = () => {
      viewRef.measure((fx, fy, width, height, px, py) => {
        if (yCoordinates.current[inputKey]) {
          if (!yCoordinates.current[inputKey].y) {
            yCoordinates.current[inputKey].y = getScrollToY(py);
          }
        } else {
          yCoordinates.current[inputKey] = {};
          yCoordinates.current[inputKey].y = getScrollToY(py);
        }
      });
    };

    return (
      <View
        testID={`${inputKey}Wrapper`}
        /* eslint-disable-next-line no-return-assign */
        ref={(ref) => {
          if (ref) viewRef = ref;
        }}
        onLayout={getCoordinates}
      >
        {component}
      </View>
    );
  };

  return {
    scrollTracker,
    setScrollRef,
    scrollTo,
    captureRef,
  };
};

export default useAutoScroll;
