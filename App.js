import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Svg, { Path, Circle, Line, G,  Rect, Defs, LinearGradient, Stop, RadialGradient } from 'react-native-svg';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SunIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <RadialGradient id="sunGradient" cx="12" cy="12" r="5" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFF176" />
        <Stop offset="0.5" stopColor="#FFD700" />
        <Stop offset="1" stopColor="#FFA000" />
      </RadialGradient>
    </Defs>
    <Circle cx="12" cy="12" r="5" fill="url(#sunGradient)" />
    <Line x1="12" y1="1" x2="12" y2="3" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <Line x1="12" y1="21" x2="12" y2="23" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <Line x1="1" y1="12" x2="3" y2="12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <Line x1="21" y1="12" x2="23" y2="12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const MoonIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#CCCCFF" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
      fill="url(#moonGradient)" 
      stroke="#E1E1FF" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Circle cx="7" cy="5" r="0.5" fill="#FFFFFF" />
    <Circle cx="18" cy="4" r="0.7" fill="#FFFFFF" />
    <Circle cx="20" cy="7.5" r="0.5" fill="#FFFFFF" />
    <Circle cx="19" cy="20" r="0.4" fill="#FFFFFF" />
    <Circle cx="4" cy="15" r="0.6" fill="#FFFFFF" />
  </Svg>
);

const FewCloudIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <RadialGradient id="sunGradient2" cx="8" cy="8" r="4" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFF176" />
        <Stop offset="0.5" stopColor="#FFD700" />
        <Stop offset="1" stopColor="#FFA000" />
      </RadialGradient>
      <LinearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#E0E0E0" />
      </LinearGradient>
    </Defs>
    <Circle cx="8" cy="8" r="4" fill="url(#sunGradient2)" />
    <Path 
      d="M18 14h-2.7A5.5 5.5 0 1 0 7 14.5a4 4 0 0 0 0 8h11a4 4 0 0 0 0-8" 
      fill="url(#cloudGradient)" 
      stroke="#E6E6E6" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const CloudsIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="darkCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#E0E0E0" />
        <Stop offset="100%" stopColor="#9E9E9E" />
      </LinearGradient>
      <LinearGradient id="lightCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#BCBCBC" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M4 16h.17A7 7 0 0 1 16 9.83a3.5 3.5 0 0 1 4.83 4.83A5 5 0 0 1 19 22H4a4 4 0 0 1 0-8z" 
      fill="url(#darkCloudGradient)" 
      stroke="#B0B0B0" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path 
      d="M8 10h.17A5 5 0 0 1 18 10.83 2.5 2.5 0 0 1 20 16H10a3 3 0 0 1 0-6z" 
      fill="url(#lightCloudGradient)" 
      stroke="#E6E6E6" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      transform="translate(-2, -2)"
    />
  </Svg>
);

const RainIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="cloudGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EEEEEE" />
        <Stop offset="100%" stopColor="#9E9E9E" />
      </LinearGradient>
      <LinearGradient id="rainDropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#90CAF9" />
        <Stop offset="100%" stopColor="#1565C0" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M16 13a5 5 0 0 0-5-5A6 6 0 1 0 4 13a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#cloudGradient2)" 
      stroke="#CCCCCC" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path d="M8 15l-1 4" stroke="url(#rainDropGradient)" strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 17l-1 4" stroke="url(#rainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(4, -2)" />
    <Path d="M8 17l-1 4" stroke="url(#rainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(8, -1)" />
    <Path d="M8 15l-1 4" stroke="url(#rainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(12, 0)" />
  </Svg>
);

const HeavyRainIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="darkCloudGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#9E9E9E" />
        <Stop offset="100%" stopColor="#424242" />
      </LinearGradient>
      <LinearGradient id="heavyRainDropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#64B5F6" />
        <Stop offset="100%" stopColor="#0D47A1" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M16 13a5 5 0 0 0-5-5A6 6 0 1 0 4 13a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#darkCloudGradient2)" 
      stroke="#757575" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path d="M8 15l-1 6" stroke="url(#heavyRainDropGradient)" strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 15l-1 6" stroke="url(#heavyRainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(3, -1)" />
    <Path d="M8 15l-1 6" stroke="url(#heavyRainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(6, -0.5)" />
    <Path d="M8 15l-1 6" stroke="url(#heavyRainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(9, -1)" />
    <Path d="M8 14l-1 6" stroke="url(#heavyRainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(-3, -1)" />
    <Path d="M8 14l-1 6" stroke="url(#heavyRainDropGradient)" strokeWidth="2" strokeLinecap="round" transform="translate(12, -0.5)" />
  </Svg>
);

const SnowIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="snowCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EEEEEE" />
        <Stop offset="100%" stopColor="#BDBDBD" />
      </LinearGradient>
      <RadialGradient id="snowflakeGradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#E0FFFF" />
      </RadialGradient>
    </Defs>
    <Path 
      d="M16 13a5 5 0 0 0-5-5A6 6 0 1 0 4 13a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#snowCloudGradient)" 
      stroke="#CCCCCC" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <G transform="translate(6.5, 17)">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="url(#snowflakeGradient)" />
      <Line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(10.5, 19)">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="url(#snowflakeGradient)" />
      <Line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(14.5, 17)">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="url(#snowflakeGradient)" />
      <Line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(16.5, 20)">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="url(#snowflakeGradient)" />
      <Line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(4.5, 20)">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="url(#snowflakeGradient)" />
      <Line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
  </Svg>
);

const ThunderstormIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="stormCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#424242" />
        <Stop offset="100%" stopColor="#212121" />
      </LinearGradient>
      <LinearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFEB3B" />
        <Stop offset="100%" stopColor="#FFC107" />
      </LinearGradient>
      <LinearGradient id="rainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#64B5F6" />
        <Stop offset="100%" stopColor="#1976D2" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M16 13a5 5 0 0 0-5-5A6 6 0 1 0 4 13a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#stormCloudGradient)" 
      stroke="#424242" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path 
      d="M13 10l-4 6h4l-2 6l6-8h-4l2-4z" 
      fill="url(#lightningGradient)" 
      stroke="#FFA000" 
      strokeWidth="0.25" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path d="M8 14l-1 3" stroke="url(#rainGradient)" strokeWidth="1.5" strokeLinecap="round" transform="translate(-2, 0)" />
    <Path d="M8 15l-1 3" stroke="url(#rainGradient)" strokeWidth="1.5" strokeLinecap="round" transform="translate(14, -1)" />
    <Path d="M8 16l-1 3" stroke="url(#rainGradient)" strokeWidth="1.5" strokeLinecap="round" transform="translate(2, 0)" />
  </Svg>
);

const MistIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="mistGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#E0E0E0" stopOpacity="0.3" />
        <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <Stop offset="100%" stopColor="#E0E0E0" stopOpacity="0.3" />
      </LinearGradient>
      <LinearGradient id="mistGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <Stop offset="50%" stopColor="#E0E0E0" stopOpacity="0.3" />
        <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
      </LinearGradient>
    </Defs>
    <Rect x="2" y="6" width="20" height="2" rx="1" fill="url(#mistGradient1)" />
    <Rect x="2" y="10" width="20" height="3" rx="1.5" fill="url(#mistGradient2)" />
    <Rect x="2" y="15" width="20" height="2" rx="1" fill="url(#mistGradient1)" />
    <Rect x="2" y="19" width="20" height="3" rx="1.5" fill="url(#mistGradient2)" />
  </Svg>
);

const HazeIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <RadialGradient id="sunHazeGradient" cx="12" cy="9" r="4" fx="12" fy="9">
        <Stop offset="0%" stopColor="#FFF176" />
        <Stop offset="70%" stopColor="#FFD700" />
        <Stop offset="100%" stopColor="#FFA000" />
      </RadialGradient>
      <LinearGradient id="hazeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#E0E0E0" stopOpacity="0.5" />
        <Stop offset="50%" stopColor="#BDBDBD" stopOpacity="0.7" />
        <Stop offset="100%" stopColor="#E0E0E0" stopOpacity="0.5" />
      </LinearGradient>
    </Defs>
    <Circle cx="12" cy="9" r="4" fill="url(#sunHazeGradient)" opacity="0.7" />
    <Rect x="2" y="15" width="20" height="2" rx="1" fill="url(#hazeGradient1)" />
    <Rect x="2" y="18" width="20" height="2" rx="1" fill="url(#hazeGradient1)" />
    <Rect x="2" y="21" width="20" height="2" rx="1" fill="url(#hazeGradient1)" />
    <Circle cx="5" cy="14" r="0.3" fill="#D7CCC8" />
    <Circle cx="9" cy="17" r="0.4" fill="#D7CCC8" />
    <Circle cx="14" cy="16" r="0.3" fill="#D7CCC8" />
    <Circle cx="18" cy="14" r="0.4" fill="#D7CCC8" />
    <Circle cx="7" cy="20" r="0.3" fill="#D7CCC8" />
    <Circle cx="16" cy="19" r="0.3" fill="#D7CCC8" />
  </Svg>
);

// Drizzle Icon
const DrizzleIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="drizzleCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EEEEEE" />
        <Stop offset="100%" stopColor="#BDBDBD" />
      </LinearGradient>
      <LinearGradient id="drizzleDropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#B3E5FC" />
        <Stop offset="100%" stopColor="#0288D1" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M16 13a5 5 0 0 0-5-5A6 6 0 1 0 4 13a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#drizzleCloudGradient)" 
      stroke="#CCCCCC" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Line x1="7" y1="16" x2="6.5" y2="18" stroke="url(#drizzleDropGradient)" strokeWidth="1" strokeLinecap="round" />
    <Line x1="10" y1="16" x2="9.5" y2="18" stroke="url(#drizzleDropGradient)" strokeWidth="1" strokeLinecap="round" />
    <Line x1="13" y1="16" x2="12.5" y2="18" stroke="url(#drizzleDropGradient)" strokeWidth="1" strokeLinecap="round" />
    <Line x1="16" y1="16" x2="15.5" y2="18" stroke="url(#drizzleDropGradient)" strokeWidth="1" strokeLinecap="round" />
    <Line x1="8" y1="19" x2="7.5" y2="21" stroke="url(#drizzleDropGradient)" strokeWidth="1" strokeLinecap="round" />
    <Line x1="11" y1="19" x2="10.5" y2="21" stroke="url(#drizzleDropGradient)" strokeWidth="1" strokeLinecap="round" />
    <Line x1="14" y1="19" x2="13.5" y2="21" stroke="url(#drizzleDropGradient)" strokeWidth="1" strokeLinecap="round" />
  </Svg>
);

const SleetIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="sleetCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EEEEEE" />
        <Stop offset="100%" stopColor="#9E9E9E" />
      </LinearGradient>
      <LinearGradient id="sleetRainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#90CAF9" />
        <Stop offset="100%" stopColor="#1565C0" />
      </LinearGradient>
      <RadialGradient id="sleetSnowGradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#E0FFFF" />
      </RadialGradient>
    </Defs>
    <Path 
      d="M16 13a5 5 0 0 0-5-5A6 6 0 1 0 4 13a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#sleetCloudGradient)" 
      stroke="#CCCCCC" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Line x1="7" y1="16" x2="6" y2="19" stroke="url(#sleetRainGradient)" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="14" y1="16" x2="13" y2="19" stroke="url(#sleetRainGradient)" strokeWidth="1.5" strokeLinecap="round" />
    
    <G transform="translate(9.5, 17)">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="url(#sleetSnowGradient)" />
      <Line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(16.5, 19)">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="url(#sleetSnowGradient)" />
      <Line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
  </Svg>
);

const TornadoIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="tornadoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#BDBDBD" />
        <Stop offset="50%" stopColor="#757575" />
        <Stop offset="100%" stopColor="#424242" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M8 3h8 M7 6h10 M9 9h6 M10 12h4 M10 15h4 M11 18h2 M11.5 21h1" 
      stroke="url(#tornadoGradient)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const HurricaneIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="hurricaneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#B0BEC5" />
        <Stop offset="20%" stopColor="#78909C" />
        <Stop offset="40%" stopColor="#546E7A" />
        <Stop offset="60%" stopColor="#455A64" />
        <Stop offset="80%" stopColor="#37474F" />
        <Stop offset="100%" stopColor="#263238" />
      </LinearGradient>
      <RadialGradient id="hurricaneEyeGradient" cx="12" cy="12" r="2">
        <Stop offset="0%" stopColor="#ECEFF1" />
        <Stop offset="100%" stopColor="#CFD8DC" />
      </RadialGradient>
    </Defs>
    <Path 
      d="M12 3a9 9 0 0 1 0 18 9 9 0 0 1 0-18z" 
      fill="none" 
      stroke="url(#hurricaneGradient)" 
      strokeWidth="1.5"
      strokeLinecap="round" 
    />
    <Path 
      d="M12 5a7 7 0 0 1 0 14 7 7 0 0 1 0-14z" 
      fill="none" 
      stroke="url(#hurricaneGradient)" 
      strokeWidth="1.5"
      strokeLinecap="round" 
    />
    <Path 
      d="M12 7a5 5 0 0 1 0 10 5 5 0 0 1 0-10z" 
      fill="none" 
      stroke="url(#hurricaneGradient)" 
      strokeWidth="1.5"
      strokeLinecap="round" 
    />
    <Path 
      d="M12 9a3 3 0 0 1 0 6 3 3 0 0 1 0-6z" 
      fill="none" 
      stroke="url(#hurricaneGradient)" 
      strokeWidth="1.5"
      strokeLinecap="round" 
    />
    <Circle cx="12" cy="12" r="2" fill="url(#hurricaneEyeGradient)" />
  </Svg>
);

const WindyIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="windGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#B3E5FC" />
        <Stop offset="100%" stopColor="#4FC3F7" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M2 8h16c1.1 0 2 0.9 2 2s-0.9 2-2 2h-2" 
      fill="none" 
      stroke="url(#windGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path 
      d="M4 12h12c1.1 0 2 0.9 2 2s-0.9 2-2 2h-3" 
      fill="none" 
      stroke="url(#windGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path 
      d="M6 16h8c1.1 0 2 0.9 2 2s-0.9 2-2 2" 
      fill="none" 
      stroke="url(#windGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Path 
      d="M3 6h10c1.1 0 2-0.9 2-2s-0.9-2-2-2" 
      fill="none" 
      stroke="url(#windGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const HailIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="hailCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#9E9E9E" />
        <Stop offset="100%" stopColor="#424242" />
      </LinearGradient>
      <RadialGradient id="hailstoneGradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#BBDEFB" />
      </RadialGradient>
    </Defs>
    <Path 
      d="M16 13a5 5 0 0 0-5-5A6 6 0 1 0 4 13a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#hailCloudGradient)" 
      stroke="#757575" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Circle cx="7" cy="17" r="1.5" fill="url(#hailstoneGradient)" stroke="#81D4FA" strokeWidth="0.5" />
    <Circle cx="11" cy="17" r="1.8" fill="url(#hailstoneGradient)" stroke="#81D4FA" strokeWidth="0.5" />
    <Circle cx="15" cy="17" r="1.5" fill="url(#hailstoneGradient)" stroke="#81D4FA" strokeWidth="0.5" />
    <Circle cx="9" cy="20" r="1.8" fill="url(#hailstoneGradient)" stroke="#81D4FA" strokeWidth="0.5" />
    <Circle cx="13" cy="20" r="1.5" fill="url(#hailstoneGradient)" stroke="#81D4FA" strokeWidth="0.5" />
    <Circle cx="17" cy="20" r="1.8" fill="url(#hailstoneGradient)" stroke="#81D4FA" strokeWidth="0.5" />
  </Svg>
);

const BlizzardIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="blizzardCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#EEEEEE" />
        <Stop offset="100%" stopColor="#9E9E9E" />
      </LinearGradient>
      <LinearGradient id="windLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#E0E0E0" />
        <Stop offset="100%" stopColor="#BDBDBD" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M16 10a5 5 0 0 0-5-5A6 6 0 1 0 4 10a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z" 
      fill="url(#blizzardCloudGradient)" 
      stroke="#BDBDBD" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <G transform="translate(5, 14)">
      <Circle cx="1" cy="1" r="1" fill="#FFFFFF" />
      <Line x1="1" y1="0" x2="1" y2="2" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1" x2="2" y2="1" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(18, 15)">
      <Circle cx="1" cy="1" r="1" fill="#FFFFFF" />
      <Line x1="1" y1="0" x2="1" y2="2" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1" x2="2" y2="1" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(10, 19)">
      <Circle cx="1" cy="1" r="1" fill="#FFFFFF" />
      <Line x1="1" y1="0" x2="1" y2="2" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1" x2="2" y2="1" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <G transform="translate(15, 20)">
      <Circle cx="1" cy="1" r="1" fill="#FFFFFF" />
      <Line x1="1" y1="0" x2="1" y2="2" stroke="#E0FFFF" strokeWidth="0.3" />
      <Line x1="0" y1="1" x2="2" y2="1" stroke="#E0FFFF" strokeWidth="0.3" />
    </G>
    <Path d="M4 15h6" stroke="url(#windLineGradient)" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M12 15h5" stroke="url(#windLineGradient)" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M6 18h8" stroke="url(#windLineGradient)" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M15 18h5" stroke="url(#windLineGradient)" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M3 21h6" stroke="url(#windLineGradient)" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M11 21h7" stroke="url(#windLineGradient)" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const PartlyCloudyNightIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="moonNightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#CCCCFF" />
      </LinearGradient>
      <LinearGradient id="nightCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#E0E0E0" />
        <Stop offset="100%" stopColor="#9E9E9E" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M17 8a6 6 0 0 1-8.6 6 4 4 0 0 0 0.1 3A6 6 0 0 0 17 8z" 
      fill="url(#moonNightGradient)" 
      stroke="#E1E1FF" 
      strokeWidth="0.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <Circle cx="8" cy="5" r="0.5" fill="#FFFFFF" />
    <Circle cx="5" cy="9" r="0.4" fill="#FFFFFF" />
    <Circle cx="18" cy="4" r="0.3" fill="#FFFFFF" />
    <Path 
      d="M16 16a3 3 0 0 0-3-3 3.5 3.5 0 1 0-7 0 2.5 2.5 0 0 0 0 5h10a2.5 2.5 0 0 0 0-5" 
      fill="url(#nightCloudGradient)" 
      stroke="#BDBDBD" 
      strokeWidth="0.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

const SunriseIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <RadialGradient id="sunriseGradient" cx="12" cy="12" r="4" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFF176" />
        <Stop offset="0.5" stopColor="#FFD700" />
        <Stop offset="1" stopColor="#FFA000" />
      </RadialGradient>
      <LinearGradient id="horizonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#FF9800" />
        <Stop offset="100%" stopColor="#FFE0B2" />
      </LinearGradient>
    </Defs>
    <Rect x="2" y="16" width="20" height="4" rx="1" fill="url(#horizonGradient)" />
    <Path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="url(#sunriseGradient)" />
    <Line x1="12" y1="4" x2="12" y2="6" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="4.93" y1="7.93" x2="6.34" y2="9.34" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="19.07" y1="7.93" x2="17.66" y2="9.34" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="3" y1="12" x2="5" y2="12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="21" y1="12" x2="19" y2="12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M8 16v-3m0 0l-2 2m2-2l2 2" stroke="#FF9800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 16v-3m0 0l-2 2m2-2l2 2" stroke="#FF9800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SunsetIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <RadialGradient id="sunsetGradient" cx="12" cy="12" r="4" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFCCBC" />
        <Stop offset="0.5" stopColor="#FF8A65" />
        <Stop offset="1" stopColor="#E64A19" />
      </RadialGradient>
      <LinearGradient id="sunsetHorizonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#E64A19" />
        <Stop offset="100%" stopColor="#FFCCBC" />
      </LinearGradient>
    </Defs>
    <Rect x="2" y="16" width="20" height="4" rx="1" fill="url(#sunsetHorizonGradient)" />
    <Path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="url(#sunsetGradient)" />
    <Line x1="12" y1="4" x2="12" y2="6" stroke="#FF8A65" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="4.93" y1="7.93" x2="6.34" y2="9.34" stroke="#FF8A65" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="19.07" y1="7.93" x2="17.66" y2="9.34" stroke="#FF8A65" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="3" y1="12" x2="5" y2="12" stroke="#FF8A65" strokeWidth="1.5" strokeLinecap="round" />
    <Line x1="21" y1="12" x2="19" y2="12" stroke="#FF8A65" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M8 13v3m0 0l-2-2m2 2l2-2" stroke="#E64A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 13v3m0 0l-2-2m2 2l2-2" stroke="#E64A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SandstormIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="sandGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#D7CCC8" stopOpacity="0.8" />
        <Stop offset="50%" stopColor="#BCAAA4" stopOpacity="0.9" />
        <Stop offset="100%" stopColor="#A1887F" stopOpacity="0.8" />
      </LinearGradient>
      <LinearGradient id="sandGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#BCAAA4" stopOpacity="0.9" />
        <Stop offset="50%" stopColor="#A1887F" stopOpacity="0.8" />
        <Stop offset="100%" stopColor="#8D6E63" stopOpacity="0.9" />
      </LinearGradient>
    </Defs>
    <Circle cx="8" cy="6" r="3.5" fill="#FFA000" opacity="0.5" />
    <Path 
      d="M2 10q5 -3 10 0t10 0" 
      fill="none"
      stroke="url(#sandGradient1)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    <Path 
      d="M2 14q5 -3 10 0t10 0" 
      fill="none"
      stroke="url(#sandGradient2)" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
    <Path 
      d="M2 18q5 -3 10 0t10 0" 
      fill="none"
      stroke="url(#sandGradient1)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />
    <Circle cx="5" cy="12" r="0.5" fill="#D7CCC8" />
    <Circle cx="8" cy="15" r="0.6" fill="#D7CCC8" />
    <Circle cx="12" cy="13" r="0.4" fill="#D7CCC8" />
    <Circle cx="15" cy="11" r="0.5" fill="#D7CCC8" />
    <Circle cx="18" cy="16" r="0.4" fill="#D7CCC8" />
    <Circle cx="10" cy="17" r="0.5" fill="#D7CCC8" />
    <Circle cx="20" cy="14" r="0.6" fill="#D7CCC8" />
    <Circle cx="17" cy="19" r="0.5" fill="#D7CCC8" />
  </Svg>
);

const SmokeIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="smokeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#78909C" stopOpacity="0.2" />
        <Stop offset="100%" stopColor="#37474F" stopOpacity="0.6" />
      </LinearGradient>
      <LinearGradient id="smokeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#90A4AE" stopOpacity="0.3" />
        <Stop offset="100%" stopColor="#546E7A" stopOpacity="0.7" />
      </LinearGradient>
      <LinearGradient id="smokeGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#607D8B" stopOpacity="0.4" />
        <Stop offset="100%" stopColor="#455A64" stopOpacity="0.8" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M12 22c-1-5 2-5 2-10-2 0-6 0-4-5 1-3 5-3 6-6" 
      fill="none"
      stroke="url(#smokeGradient1)" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
    <Path 
      d="M8 22c0-4 3-4 3-8-3 0-4 0-2-4 1-2 4-2 4-5" 
      fill="none"
      stroke="url(#smokeGradient2)" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
    <Path 
      d="M16 22c-2-4 1-4 1-7-2 0-3 0-2-3 0.5-1.5 3-1.5 3-4" 
      fill="none"
      stroke="url(#smokeGradient3)" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
  </Svg>
);

const RainbowIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="rainbowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#FF5252" /> 
        <Stop offset="16.6%" stopColor="#FF9800" /> 
        <Stop offset="33.2%" stopColor="#FFEB3B" /> 
        <Stop offset="49.8%" stopColor="#4CAF50" /> 
        <Stop offset="66.4%" stopColor="#2196F3" /> 
        <Stop offset="83%" stopColor="#3F51B5" /> 
        <Stop offset="100%" stopColor="#9C27B0" /> 
      </LinearGradient>
      <RadialGradient id="sunRainbowGradient" cx="6" cy="10" r="3" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFF176" />
        <Stop offset="0.7" stopColor="#FFD700" />
        <Stop offset="1" stopColor="#FFA000" />
      </RadialGradient>
    </Defs>
    <Circle cx="6" cy="10" r="3" fill="url(#sunRainbowGradient)" />
    <Path 
      d="M8 10a3 3 0 0 1 3 3h2a3 3 0 0 1 0 6" 
      fill="#FFFFFF" 
      stroke="#EEEEEE" 
      strokeWidth="0.75" 
    />
    <Path 
      d="M7 19a8 8 0 0 1 14-5" 
      fill="none"
      stroke="url(#rainbowGradient)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    <Path 
      d="M10 19a5 5 0 0 1 8-4" 
      fill="none"
      stroke="url(#rainbowGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <Path 
      d="M13 19a2 2 0 0 1 2-2" 
      fill="none"
      stroke="url(#rainbowGradient)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
  </Svg>
);

const HeatWaveIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <RadialGradient id="hotSunGradient" cx="12" cy="8" r="5" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFEB3B" />
        <Stop offset="0.5" stopColor="#FF9800" />
        <Stop offset="1" stopColor="#F44336" />
      </RadialGradient>
      <LinearGradient id="heatWaveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#FFEB3B" stopOpacity="0.6" />
        <Stop offset="50%" stopColor="#FF9800" stopOpacity="0.4" />
        <Stop offset="100%" stopColor="#FFEB3B" stopOpacity="0.6" />
      </LinearGradient>
      <LinearGradient id="heatWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#FF9800" stopOpacity="0.4" />
        <Stop offset="50%" stopColor="#F44336" stopOpacity="0.6" />
        <Stop offset="100%" stopColor="#FF9800" stopOpacity="0.4" />
      </LinearGradient>
    </Defs>
    <Circle cx="12" cy="8" r="5" fill="url(#hotSunGradient)" />
    <Line x1="12" y1="1" x2="12" y2="3" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Line x1="12" y1="13" x2="12" y2="15" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Line x1="5" y1="8" x2="7" y2="8" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Line x1="17" y1="8" x2="19" y2="8" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Line x1="7.05" y1="3.05" x2="8.46" y2="4.46" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Line x1="15.54" y1="11.54" x2="16.95" y2="12.95" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Line x1="7.05" y1="12.95" x2="8.46" y2="11.54" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Line x1="15.54" y1="4.46" x2="16.95" y2="3.05" stroke="#F44336" strokeWidth="2" strokeLinecap="round" />
    <Path 
      d="M2 16q5 -2 20 0" 
      fill="none"
      stroke="url(#heatWaveGradient1)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <Path 
      d="M2 19q5 -2 20 0" 
      fill="none"
      stroke="url(#heatWaveGradient2)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <Path 
      d="M2 22q5 -2 20 0" 
      fill="none"
      stroke="url(#heatWaveGradient1)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <Rect x="20" y="5" width="2" height="10" rx="1" fill="#FFFFFF" stroke="#F44336" strokeWidth="0.5" />
    <Rect x="20" y="10" width="2" height="5" rx="0" fill="#F44336" />
    <Circle cx="21" cy="15" r="1.5" fill="#F44336" />
  </Svg>
);

const DustDevilIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="dustDevilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#D7CCC8" stopOpacity="0.8" />
        <Stop offset="100%" stopColor="#A1887F" stopOpacity="0.9" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M9 20c1-2 6-3 5-6-1-3-4-3-3-6 1-3 5-3 3-6-1-2-3-2-2-4" 
      fill="none"
      stroke="url(#dustDevilGradient)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    <Circle cx="7" cy="18" r="0.5" fill="#D7CCC8" />
    <Circle cx="12" cy="20" r="0.4" fill="#D7CCC8" />
    <Circle cx="14" cy="16" r="0.6" fill="#D7CCC8" />
    <Circle cx="8" cy="14" r="0.5" fill="#D7CCC8" />
    <Circle cx="13" cy="12" r="0.4" fill="#D7CCC8" />
    <Circle cx="10" cy="10" r="0.6" fill="#D7CCC8" />
    <Circle cx="13" cy="8" r="0.5" fill="#D7CCC8" />
    <Circle cx="8" cy="6" r="0.4" fill="#D7CCC8" />
  </Svg>
);

const AcidRainIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="acidCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#E0E0E0" />
        <Stop offset="100%" stopColor="#9E9E9E" />
      </LinearGradient>
      <LinearGradient id="acidDropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#AED581" />
        <Stop offset="100%" stopColor="#8BC34A" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M5 10a3 3 0 0 1 3-3 4 4 0 0 1 7-1 3.5 3.5 0 0 1 5 3.5 3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3z" 
      fill="url(#acidCloudGradient)" 
      stroke="#BDBDBD" 
      strokeWidth="0.5" 
    />
    <Path d="M8 15l1 2h-2z" fill="url(#acidDropGradient)" />
    <Path d="M12 14l1 2h-2z" fill="url(#acidDropGradient)" />
    <Path d="M16 15l1 2h-2z" fill="url(#acidDropGradient)" />
    <Path d="M7 19l1 2h-2z" fill="url(#acidDropGradient)" />
    <Path d="M11 18l1 2h-2z" fill="url(#acidDropGradient)" />
    <Path d="M15 19l1 2h-2z" fill="url(#acidDropGradient)" />
    <Text x="7.5" y="16.2" fontSize="1" fill="#FFFFFF" textAnchor="middle">H</Text>
    <Text x="11.5" y="15.2" fontSize="1" fill="#FFFFFF" textAnchor="middle">S</Text>
    <Text x="15.5" y="16.2" fontSize="1" fill="#FFFFFF" textAnchor="middle">N</Text>
  </Svg>
);

const AuroraIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="auroraGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#4CAF50" stopOpacity="0.7" />
        <Stop offset="50%" stopColor="#2196F3" stopOpacity="0.5" />
        <Stop offset="100%" stopColor="#9C27B0" stopOpacity="0.7" />
      </LinearGradient>
      <LinearGradient id="auroraGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#9C27B0" stopOpacity="0.7" />
        <Stop offset="50%" stopColor="#2196F3" stopOpacity="0.5" />
        <Stop offset="100%" stopColor="#4CAF50" stopOpacity="0.7" />
      </LinearGradient>
      <RadialGradient id="starGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <Stop offset="0%" stopColor="#FFFFFF" />
        <Stop offset="100%" stopColor="#E0E0E0" />
      </RadialGradient>
    </Defs>
    <Rect x="0" y="0" width="24" height="24" fill="#263238" />
    <Path 
      d="M0 8c4-2 8 3 12-1 4-4 8 2 12-1v5c-4 3-8-3-12 1-4 4-8-1-12 1z"
      fill="url(#auroraGradient1)" 
      opacity="0.7"
    />
    <Path 
      d="M0 12c4-2 8 3 12-1 4-4 8 2 12-1v5c-4 3-8-3-12 1-4 4-8-1-12 1z"
      fill="url(#auroraGradient2)" 
      opacity="0.7"
    />
    <Circle cx="5" cy="5" r="0.5" fill="url(#starGradient)" />
    <Circle cx="10" cy="3" r="0.3" fill="url(#starGradient)" />
    <Circle cx="15" cy="4" r="0.4" fill="url(#starGradient)" />
    <Circle cx="20" cy="6" r="0.3" fill="url(#starGradient)" />
    <Circle cx="18" cy="2" r="0.5" fill="url(#starGradient)" />
    <Path d="M0 19l5-3 3 1 4-2 5 3 7-4v10H0z" fill="#000000" opacity="0.8" />
  </Svg>
);

const VolcanicAshIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="ashCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#757575" />
        <Stop offset="100%" stopColor="#424242" />
      </LinearGradient>
      <LinearGradient id="volcanoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#BF360C" />
        <Stop offset="100%" stopColor="#5D4037" />
      </LinearGradient>
      <RadialGradient id="lavaGradient" cx="12" cy="14" r="5" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFAB00" />
        <Stop offset="0.7" stopColor="#FF5722" />
        <Stop offset="1" stopColor="#BF360C" />
      </RadialGradient>
    </Defs>
    <Path d="M6 20l6-12 6 12z" fill="url(#volcanoGradient)" />
    <Path d="M10 17l2-1 2 1-1 3h-2z" fill="url(#lavaGradient)" />
    <Path 
      d="M12 4c-3 0-4 2-6 2-2 0-3 2-3 3 0 1 1 2 3 2 2 0 3-1 6-1 3 0 4 1 6 1 2 0 3-1 3-2 0-1-1-3-3-3-2 0-3-2-6-2z"
      fill="url(#ashCloudGradient)" 
    />
    <Circle cx="7" cy="9" r="0.4" fill="#BDBDBD" />
    <Circle cx="10" cy="8" r="0.5" fill="#BDBDBD" />
    <Circle cx="14" cy="8" r="0.4" fill="#BDBDBD" />
    <Circle cx="17" cy="9" r="0.5" fill="#BDBDBD" />
    <Circle cx="12" cy="10" r="0.4" fill="#BDBDBD" />
    <Circle cx="9" cy="11" r="0.3" fill="#BDBDBD" />
    <Circle cx="15" cy="11" r="0.3" fill="#BDBDBD" />
  </Svg>
);

const FreezingRainIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="freezingCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#ECEFF1" />
        <Stop offset="100%" stopColor="#B0BEC5" />
      </LinearGradient>
      <LinearGradient id="iceDropGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#B3E5FC" stopOpacity="0.6" />
        <Stop offset="100%" stopColor="#4FC3F7" stopOpacity="0.8" />
      </LinearGradient>
    </Defs>
    <Path 
      d="M5 10a3 3 0 0 1 3-3 4 4 0 0 1 7-1 3.5 3.5 0 0 1 5 3.5 3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3z" 
      fill="url(#freezingCloudGradient)" 
      stroke="#B0BEC5" 
      strokeWidth="0.5" 
    />
    <Path d="M7 14l1 3l-1 0z" fill="#81D4FA" stroke="#4FC3F7" strokeWidth="0.5" />
    <Path d="M11 16l1 3l-1 0z" fill="#81D4FA" stroke="#4FC3F7" strokeWidth="0.5" />
    <Path d="M15 15l1 3l-1 0z" fill="#81D4FA" stroke="#4FC3F7" strokeWidth="0.5" />
    <Path d="M8 18h2m-1-1v2" stroke="url(#iceDropGradient)" strokeWidth="0.75" strokeLinecap="round" />
    <Path d="M12 20h2m-1-1v2" stroke="url(#iceDropGradient)" strokeWidth="0.75" strokeLinecap="round" />
    <Path d="M16 19h2m-1-1v2" stroke="url(#iceDropGradient)" strokeWidth="0.75" strokeLinecap="round" />
    <Path d="M6 22l12 0m-10-1l8 0" stroke="#81D4FA" strokeWidth="0.75" strokeLinecap="round" />
  </Svg>
);

const MoonbowIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="moonbowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#B39DDB" stopOpacity="0.9" /> 
        <Stop offset="16.6%" stopColor="#9FA8DA" stopOpacity="0.9" />
        <Stop offset="33.2%" stopColor="#90CAF9" stopOpacity="0.9" /> 
        <Stop offset="49.8%" stopColor="#80DEEA" stopOpacity="0.9" /> 
        <Stop offset="66.4%" stopColor="#A5D6A7" stopOpacity="0.9" /> 
        <Stop offset="83%" stopColor="#FFE082" stopOpacity="0.9" /> 
        <Stop offset="100%" stopColor="#FFAB91" stopOpacity="0.9" /> 
      </LinearGradient>
      <RadialGradient id="moonGradient" cx="6" cy="6" r="3" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#E0E0E0" />
        <Stop offset="1" stopColor="#BDBDBD" />
      </RadialGradient>
    </Defs>
    <Rect x="0" y="0" width="24" height="24" fill="#263238" />
    <Circle cx="3" cy="4" r="0.3" fill="#E0E0E0" />
    <Circle cx="6" cy="3" r="0.2" fill="#E0E0E0" />
    <Circle cx="10" cy="4" r="0.3" fill="#E0E0E0" />
    <Circle cx="15" cy="3" r="0.2" fill="#E0E0E0" />
    <Circle cx="19" cy="5" r="0.3" fill="#E0E0E0" />
    <Circle cx="22" cy="3" r="0.2" fill="#E0E0E0" />
    <Circle cx="6" cy="6" r="3" fill="url(#moonGradient)" />
    <Circle cx="5" cy="5" r="0.7" fill="#263238" opacity="0.1" />
    <Circle cx="7.5" cy="7" r="0.5" fill="#263238" opacity="0.1" />
    <Path 
      d="M7 19a8 8 0 0 1 14-5" 
      fill="none"
      stroke="url(#moonbowGradient)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      opacity="0.7"
    />
    <Path 
      d="M10 19a5 5 0 0 1 8-4" 
      fill="none"
      stroke="url(#moonbowGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      opacity="0.7"
    />
    <Path 
      d="M13 19a2 2 0 0 1 2-2" 
      fill="none"
      stroke="url(#moonbowGradient)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      opacity="0.7"
    />
  </Svg>
);

const PollenIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <RadialGradient id="sunPollenGradient" cx="12" cy="12" r="4" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FFECB3" />
        <Stop offset="1" stopColor="#FFC107" />
      </RadialGradient>
    </Defs>
    <Circle cx="12" cy="12" r="4" fill="url(#sunPollenGradient)" />
    <Circle cx="8" cy="8" r="1" fill="#FFA000" opacity="0.8" />
    <Circle cx="16" cy="8" r="0.8" fill="#FFA000" opacity="0.8" />
    <Circle cx="16" cy="16" r="1.2" fill="#FFA000" opacity="0.8" />
    <Circle cx="8" cy="16" r="0.9" fill="#FFA000" opacity="0.8" />
    <Circle cx="12" cy="6" r="1" fill="#FFA000" opacity="0.8" />
    <Circle cx="18" cy="12" r="0.8" fill="#FFA000" opacity="0.8" />
    <Circle cx="12" cy="18" r="1.2" fill="#FFA000" opacity="0.8" />
    <Circle cx="6" cy="12" r="0.9" fill="#FFA000" opacity="0.8" />
    <Path d="M8 8l-1-1" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M16 8l1-1" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M16 16l1 1" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M8 16l-1 1" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M12 6l0-1" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M18 12l1 0" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M12 18l0 1" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M6 12l-1 0" stroke="#FFC107" strokeWidth="0.5" strokeLinecap="round" />
  </Svg>
);

const ExtremeColdIcon = () => (
  <Svg height="250" width="250" viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="coldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#E3F2FD" />
        <Stop offset="100%" stopColor="#90CAF9" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="24" height="24" fill="#E3F2FD" opacity="0.5" />
    <Rect x="11" y="6" width="2" height="12" rx="1" fill="#FFFFFF" stroke="#2196F3" strokeWidth="0.5" />
    <Rect x="11" y="16" width="2" height="2" rx="0" fill="#2196F3" />
    <Circle cx="12" cy="18" r="1.5" fill="#2196F3" />
    <Text x="12" y="13" fontSize="2" fill="#2196F3" textAnchor="middle">-</Text>
    <Path d="M12 4v7M9 5.5l6 4M15 5.5l-6 4M5 12h7M6.5 9l4 6M6.5 15l4-6M12 20v-7M9 18.5l6-4M15 18.5l-6-4M19 12h-7M17.5 9l-4 6M17.5 15l-4-6" 
      stroke="#2196F3" strokeWidth="0.75" strokeLinecap="round" />
    <Path d="M3 6l2 1M21 6l-2 1M3 18l2-1M21 18l-2-1" 
      stroke="#64B5F6" strokeWidth="0.5" strokeLinecap="round" />
    <Path d="M4 12h-2M22 12h-2" 
      stroke="#64B5F6" strokeWidth="0.5" strokeLinecap="round" />
  </Svg>
);

const SunriseIconExtra = () => (
  <Svg height="18" width="18" viewBox="0 0 24 24">
    <Path
      d="M17 18a5 5 0 0 0-10 0M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M8 6l4-4 4 4"
      stroke="#FFC300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const WindIcon = () => (
  <Svg height="18" width="18" viewBox="0 0 24 24">
    <Path
      d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
      stroke="lightblue"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TemperatureIcon = () => (
  <Svg height="18" width="18" viewBox="0 0 24 24">
    <Path
      d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"
      stroke="orange"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const getWeatherIcon = (weatherId, isDayTime) => {
  if (weatherId === 800) {
    return isDayTime ? <SunIcon /> : <MoonIcon />;
  }
  
  if (weatherId === 801) {
    return isDayTime ? <FewCloudIcon /> : <PartlyCloudyNightIcon />;
  }
  
  if (weatherId >= 802 && weatherId <= 804) {
    return <CloudsIcon />;
  }
  
  if (weatherId >= 200 && weatherId <= 232) {
    if ([202, 212, 221, 232].includes(weatherId)) {
      return <ThunderstormIcon />;
    }
    return <ThunderstormIcon />;
  }
  
  if (weatherId >= 300 && weatherId <= 321) {
    return <DrizzleIcon />;
  }
  
  if (weatherId >= 500 && weatherId <= 531) {
    if (weatherId === 511) {
      return <FreezingRainIcon />;
    }
    if ([502, 503, 504, 522].includes(weatherId)) {
      return <HeavyRainIcon />;
    }
    if ([611, 612, 613, 615, 616].includes(weatherId)) {
      return <SleetIcon />;
    }
    return <RainIcon />;
  }
  
  if (weatherId >= 600 && weatherId <= 622) {
    if ([602, 622].includes(weatherId)) {
      return <BlizzardIcon />;
    }
    return <SnowIcon />;
  }
  
  if (weatherId >= 700 && weatherId <= 799) {
    switch(weatherId) {
      case 701: 
      case 741: 
        return <MistIcon />;
      case 711: 
        return <SmokeIcon />;
      case 721: 
        return <HazeIcon />;
      case 731: 
        return <DustDevilIcon />;
      case 751: 
      case 761: 
        return <SandstormIcon />; 
      case 762: 
        return <VolcanicAshIcon />;
      case 771: 
        return <WindyIcon />;
      case 781: 
        return <TornadoIcon />;
      default:
        return <MistIcon />; 
    }
  }
  
  if (weatherId === 9000) { 
    return <SunriseIcon />;
  }
  
  if (weatherId === 9001) { 
    return <SunsetIcon />;
  }
  
  if (weatherId === 9100) { 
    return <HurricaneIcon />;
  }
  
  if (weatherId === 9101) { 
    return <HailIcon />;
  }
  
  if (weatherId === 9102) { 
    return <AcidRainIcon />;
  }
  
  if (weatherId === 9103) { 
    return <RainbowIcon />;
  }
  
  if (weatherId === 9104) { 
    return <HeatWaveIcon />;
  }
  
  if (weatherId === 9105) { 
    return <AuroraIcon />;
  }
  
  if (weatherId === 9106) { 
    return <MoonbowIcon />;
  }
  
  if (weatherId === 9107) { 
    return <PollenIcon />;
  }
  
  if (weatherId === 9108) { 
    return <ExtremeColdIcon />;
  }
  
  // Default fallback
  return isDayTime ? <SunIcon /> : <MoonIcon />;
};

const App = () => {
  // State variables
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDayTime, setIsDayTime] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [currentCity, setCurrentCity] = useState('Mumbai');
  const [errorMessage, setErrorMessage] = useState('');



  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const API_KEY = '09f9f4a93987f0e80ba17a197abf6e3e';

  const checkDayTime = (sunrise, sunset) => {
    const now = new Date().getTime() / 1000; 
    return now > sunrise && now < sunset;
  };

  const fetchWeatherData = async city => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setCurrentCity(data.name);

      const isDaytime = checkDayTime(data.sys.sunrise, data.sys.sunset);
      setIsDayTime(isDaytime);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      Alert.alert('Error', error.message);
    }
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setCurrentCity(data.name);

      const isDaytime = checkDayTime(data.sys.sunrise, data.sys.sunset);
      setIsDayTime(isDaytime);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      Alert.alert('Error', error.message);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);

    try {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Weather App needs access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            throw new Error('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
          Alert.alert(
            'Location Permission',
            'Please enable location permissions in your device settings to use this feature.',
            [{text: 'OK', onPress: () => setLoading(false)}],
          );
          return;
        }
      }
      else if (Platform.OS === 'ios') {
        try {
          const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (result !== RESULTS.GRANTED) {
            throw new Error('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
          Alert.alert(
            'Location Permission',
            'Please enable location permissions in your device settings to use this feature.',
            [{text: 'OK', onPress: () => setLoading(false)}],
          );
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          fetchWeatherByCoords(latitude, longitude);
          setModalVisible(false);
        },
        error => {
          setLoading(false);
          console.warn('Location error:', error);

          let errorMsg = 'Unable to get location. ';
          let actionMsg = '';

          switch (error.code) {
            case 1: 
              errorMsg += 'Location permission denied.';
              actionMsg =
                'Please enable location permissions in your device settings.';
              break;
            case 2: 
              errorMsg += 'Location information unavailable.';
              actionMsg =
                'Please check if your device has location services enabled and try again. If on an emulator, this feature may not work properly.';
              break;
            case 3: 
              errorMsg += 'Location request timed out.';
              actionMsg = 'Please try again or use city search instead.';
              break;
            default:
              errorMsg += error.message;
          }

          Alert.alert('Location Error', errorMsg + '\n\n' + actionMsg, [
            {
              text: 'Search by City',
              onPress: () => setModalVisible(true),
            },
            {
              text: 'Try Again',
              onPress: () => getCurrentLocation(),
            },
          ]);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      setLoading(false);
      console.warn('Permission error:', error);
      Alert.alert('Error', 'Failed to access location: ' + error.message);
    }
  };

  useEffect(() => {
    const loadCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem('savedCity');
        if (storedCity) {
          setCurrentCity(storedCity);
          fetchWeatherData(storedCity); 
        }
      } catch (error) {
        console.error('Error loading city:', error);
      }
    };
  
    loadCity();
  }, []);

  
  const handleSubmit = async () => {
    if (cityInput.trim() !== '') {
      try {
        await AsyncStorage.setItem('savedCity', cityInput); 
        setCurrentCity(cityInput); 
        fetchWeatherData(cityInput); 
      } catch (error) {
        console.error('Error saving city:', error);
      }
    }
  
    setCityInput('');
    setModalVisible(false);
  };
  
  useEffect(() => {
    fetchWeatherData(currentCity);
    
    const intervalId = setInterval(() => {
      fetchWeatherData(currentCity);
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [currentCity]);
  
  


 
  


   const formatTime = (timestamp, timezoneOffset) => {
    if (!timestamp || typeof timestamp !== "number") return "Invalid Time";
    if (timezoneOffset === undefined || typeof timezoneOffset !== "number") return "Invalid Timezone";
      
    const date = new Date(timestamp * 1000);
    
    const browserTimezoneOffset = date.getTimezoneOffset() * 60; 
    
    const adjustedDate = new Date((timestamp + timezoneOffset + browserTimezoneOffset) * 1000);
    
    return adjustedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getWeatherDescription = () => {
    if (
      !weatherData ||
      !weatherData.weather ||
      weatherData.weather.length === 0
    ) {
      return isDayTime ? 'GOOD MORNING' : 'GOOD NIGHT';
    }

    return weatherData.weather[0].description.toUpperCase();
  };

  const theme = isDayTime
    ? {
        background: '#e5ecf4',
        text: '#333333',
        secondaryText: '#666666',
        statusBar: 'dark-content',
      }
    : {
        background: '#313745',
        text: '#ffffff',
        secondaryText: '#94a3b8',
        statusBar: 'light-content',
      };

  if (loading) {
    return (
      <View style={[styles.container, {backgroundColor: theme.background, display: "flex", justifyContent: 'center', alignItems: 'center'}]}>
        <StatusBar barStyle={theme.statusBar} />
        <ActivityIndicator
          size="large"
          color={isDayTime ? '#ff9500' : '#ffffff'}
        />
        <Text style={[styles.loadingText, {color: theme.text}]}>
          Loading weather data...
        </Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={[styles.container, {backgroundColor: theme.background, display: "flex", justifyContent: 'center', alignItems: 'center'}]}>
        <StatusBar barStyle={theme.statusBar} />
        <Text style={[styles.errorText, {color: theme.text}]}>
          {errorMessage}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isDayTime ? '#ff9500' : '#4682B4'},
          ]}
          onPress={() => fetchWeatherData('Mumbai')}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar barStyle={theme.statusBar} />

      <View style={styles.header}>
        <View></View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setModalVisible(true)}>
          <Text style={{fontSize: 24, color: theme.text}}>⋮</Text>
        </TouchableOpacity>
      </View>

      {weatherData && (
        <View style={styles.weatherContent}>
          <View style={[styles.weatherIconContainer, { flex: 4 }]}>
          {weatherData.weather && weatherData.weather.length > 0 ? (
              getWeatherIcon(weatherData.weather[0].id, isDayTime)
            ) : isDayTime ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </View>

          <Text style={[styles.cityName, {color: theme.text}]}>
            {currentCity}
          </Text>

          <Text style={[styles.temperature, {color: theme.text}]}>
            {Math.round(weatherData.main.temp)}°C
          </Text>

          <Text
            style={[styles.weatherDescription, {color: theme.secondaryText}]}>
            {getWeatherDescription()}
          </Text>

          <View
            style={[
              styles.divider,
              {backgroundColor: isDayTime ? '#e0e0e0' : '#2d3748'},
            ]}
          />

          <View style={[styles.additionalInfo,{flex: 1}]}>
          <View style={styles.infoItem}>
            <SunriseIconExtra />
            <Text style={[styles.infoLabel, {color: theme.secondaryText}]}>
              {isDayTime ? 'SUNRISE' : 'SUNSET'}
            </Text>
            <Text style={[styles.infoValue, {color: theme.text}]}>
              {weatherData && weatherData.sys
                ? formatTime(
                    isDayTime ? weatherData.sys.sunrise : weatherData.sys.sunset,
                    weatherData.timezone 
                  )
                : "Loading..."}
            </Text>
          </View>



            <Text style={[styles.infoSeparator, {color: theme.secondaryText}]}>
              |
            </Text>

            <View style={styles.infoItem}>
              <TemperatureIcon />
              <Text style={[styles.infoLabel, {color: theme.secondaryText}]}>
                TEMPERATURE
              </Text>
              <Text style={[styles.infoValue, {color: theme.text}]}>
                {Math.round(weatherData.main.temp)}°
              </Text>
            </View>

            <Text style={[styles.infoSeparator, {color: theme.secondaryText}]}>
              |
            </Text>

            <View style={styles.infoItem}>
              <WindIcon />
              <Text style={[styles.infoLabel, {color: theme.secondaryText}]}>
                WIND
              </Text>
              <Text style={[styles.infoValue, {color: theme.text}]}>
                {Math.round(weatherData.wind.speed)}m/s
              </Text>
            </View>

            
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: isDayTime ? '#ffffff' : '#0f172a',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
            ]}>
            <Text style={[styles.modalTitle, {color: theme.text}]}>
              Weather Settings
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, {color: theme.secondaryText}]}>
                City
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDayTime ? '#f5f5f5' : '#1e293b',
                    color: theme.text,
                    borderColor: isDayTime ? '#e0e0e0' : '#2d3748',
                  },
                ]}
                placeholder="Enter city name"
                placeholderTextColor={isDayTime ? '#999999' : '#64748b'}
                value={cityInput}
                onChangeText={setCityInput}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isDayTime ? '#ff9500' : '#4682B4',
                  marginTop: 20,
                },
              ]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isDayTime ? '#4682B4' : '#3b82f6',
                  marginTop: 10,
                },
              ]}
              onPress={getCurrentLocation}>
              <Text style={styles.buttonText}>Use Current Location</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={[
                styles.cancelButton,
                {
                  borderColor: isDayTime ? '#ff9500' : '#4682B4',
                  marginTop: 10,
                },
              ]}
              onPress={() => setModalVisible(false)}>
              <Text style={[styles.cancelButtonText, {color: theme.text}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  cityName: {
    fontSize: 50,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  dateTime: {
    fontSize: 14,
    marginTop: 4,
  },
  menuButton: {
    padding: 5,
  },
  weatherContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  weatherIconContainer: {
    marginBottom: 30,
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 100,
    fontWeight: 'bold',
    letterSpacing: -1,
    marginBottom: 15, 
    paddingTop: 30
  },
  weatherDescription: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 5,
    letterSpacing: 2,
  },
  weatherUser: {
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 25,
  },
  divider: {
    height: 1,
    width: '60%',
    marginVertical: 25,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  infoItem: {
    alignItems: 'center', flex: 1
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoSeparator: {
    fontSize: 20,
    fontWeight: '200',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
  },
});

export default App;
