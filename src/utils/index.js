import {parse} from 'react-native-redash';


// export const getPathXCenter = (currentPath) => {

 
//   const curves = parse(currentPath).curves;
//   const startPoint = curves[0].to;
//   const endPoint = curves[curves.length - 1].to;
//   const centerX = (startPoint.x + endPoint.x) / 2;
//   return centerX;
// };


// export const getPathXCenter = (currentPath) => {
//   const parsedPath = parse(currentPath);
  
//   if (!parsedPath || !parsedPath.curves || parsedPath.curves.length === 0) {
//     console.error('Invalid path or no curves found');
//   } else {
//     const curves = parsedPath.curves;
//     const startPoint = curves[0].to;
//     const endPoint = curves[curves.length - 1].to;
//     const centerX = (startPoint.x + endPoint.x) / 2;
//     return centerX;
//   }
// };

export const getPathXCenter = (currentPath) => {
  if (typeof currentPath === 'undefined') {
    console.log('currentPath is undefined');
  } else {
    const parsedPath = parse(currentPath);
    
    if (!parsedPath) {
      console.log('Unable to parse currentPath');
    } else if (!parsedPath.curves || parsedPath.curves.length === 0) {
      console.log('No curves found in parsed path');
    } else {
      const curves = parsedPath.curves;
      const startPoint = curves[0].to;
      const endPoint = curves[curves.length - 1].to;
      const centerX = (startPoint.x + endPoint.x) / 2;
      return centerX;
    }
  }
};
export const getPathXCenterByIndex = (tabPaths, index) => {

  // const curves = tabPaths[index].curves;
  // const startPoint = curves[0].to;
  // const endPoint = curves[curves.length - 1].to;
  // const centerX = (startPoint.x + endPoint.x) / 2;
  // return centerX;

  console.log('Index:', index);  // Log the value of index
  console.log('tabPaths length:', tabPaths.length);  // Log the length of tabPaths
  
  if (!Array.isArray(tabPaths)) {
    console.log('tabPaths is not an array');
  } else if (index < 0 || index >= tabPaths.length) {
    console.log('Invalid index');
  } else if (typeof tabPaths[index] === 'undefined') {
    console.log('tabPaths[index] is undefined');
  } else {
    const curves = tabPaths[index].curves;
    
    if (!curves || curves.length === 0) {
      console.log('No curves found in tabPaths[index]');
    } else {
      const startPoint = curves[0].to;
      const endPoint = curves[curves.length - 1].to;
      const centerX = (startPoint.x + endPoint.x) / 2;
      return centerX;
    }
  }
};
