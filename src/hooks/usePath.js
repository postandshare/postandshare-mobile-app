import {useMemo} from 'react';
import {curveBasis, line} from 'd3-shape';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {parse} from 'react-native-redash';
import { Dimensions } from 'react-native';


const {height, width} = Dimensions.get('window');


const NUM_TABS = 4;
const SCALE = 0.7;
const TAB_BAR_HEIGHT = 64;

const generateTabShapePath = (
  position,
  adjustedHeight,
) => {
  const adjustedWidth = width / NUM_TABS;
  const tabX = adjustedWidth * position;

  const lineGenerator = line().curve(curveBasis);
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (65 + 35) * SCALE, 0],
    [tabX - (50 - 10) * SCALE, -6 * SCALE],
    [tabX - (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 10) * SCALE, -6 * SCALE],
    [tabX + (65 + 35) * SCALE, 0],
    [tabX + 100 * SCALE, 0],
  ]);

  return `${tab}`;
};

const usePath = () => {
  const insets = useSafeAreaInsets();
  const tHeight = TAB_BAR_HEIGHT + insets.bottom;
  const adjustedHeight = tHeight - insets.bottom;

  const containerPath = useMemo(() => {
    return `M0,0L${width},0L${width},0L${width},${tHeight}L0,${tHeight}L0,0`;
  }, [tHeight]);

  // const curvedPaths = useMemo(() => {
  //   return Array.from({length: NUM_TABS}, (_, index) => {
  //     const tabShapePath = generateTabShapePath(index + 0.5, adjustedHeight);
  //     return parse(`${tabShapePath}`);
  //   });
  // }, [adjustedHeight]);
  // const curvedPaths = useMemo(() => {
  //   return Array.from({length: NUM_TABS}, (_, index) => {
  //     const tabShapePath = generateTabShapePath(index + 0.5, adjustedHeight);
  //     console.log(tabShapePath, "in usePath");  // Log the output
  //     return parse(`${tabShapePath}`);
  //   });
  // }, [adjustedHeight]);
  console.log(width , "in usePath");

  const curvedPaths = useMemo(() => {
    return Array.from({length: NUM_TABS}, (_, index) => {
      if (isNaN(index + 0.5) || isNaN(adjustedHeight)) {
        console.error('Invalid input to generateTabShapePath');
      } else {
        const tabShapePath = generateTabShapePath(index + 0.5, adjustedHeight);
        console.log(tabShapePath, "in usePath");  // Log the output
        return parse(`${tabShapePath}`);
      }
    });
  }, [adjustedHeight]);

  return {containerPath, curvedPaths, tHeight};
};

export default usePath;
