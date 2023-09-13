declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

// Quanto tiver uma declaracoa de svg, receba ele como um component