// import React, { useEffect, useRef } from 'react';
// import { Box, Typography, Container, Stack, Sheet } from '@mui/joy';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import ExpandableDock from './dock/ExpandableDock';
// import Footer from './Footer';
// import Abtfoundation from '../assets/Abtfoundation.png';
// import Abtvision from '../assets/Abtvisions4.0.png';
// import Abtimplement2 from '../assets/Abtimplement2.png';
// import Abdigitali from '../assets/Abdigital.png';

// gsap.registerPlugin(ScrollTrigger);

// const AboutUs = () => {
//   const wrapperRef = useRef(null);
//   const titleRef = useRef(null); // Ref for title animation
//   const stageRef = useRef(null);
//   const txtRef = useRef(null);
//   const charsRef = useRef([]); // Array of char refs
//   const bodyRef = useRef(document.body);

//   // ✅ Define all animation constants at component scope
//   const weightInit = 600;    // Initial font weight
//   const weightTarget = 400;  // Target font weight when draggedddddddddd
//   const weightDiff = weightInit - weightTarget;
//   const stretchInit = 150;   // Initial font stretch percentage %%%%%%%%
//   const stretchTarget = 80;  // Target font stretch when dragged
//   const stretchDiff = stretchInit - stretchTarget;
//   const maxYScale = 2.5;     // Maximum vertical scale
//   const elasticDropOff = 0.8; // Elastic dispersion factor

//   // Custom SplitText function if you don't have premium plugin
//   const splitTextIntoChars = (text) => {
//     const container = document.createElement('div');
//     container.style.position = 'relative';
//     container.style.display = 'inline-block';

//     text.split('').forEach((char, index) => {
//       const span = document.createElement('span');
//       span.textContent = char === ' ' ? '\u00A0' : char;
//       span.className = 'char';
//       span.style.cssText = `
//           position: relative;
//           display: inline-block;
//           padding-top: 1.08vw;
//           text-align: center;
//           will-change: font-weight, font-stretch, transform;
//         `;
//       container.appendChild(span);
//     });

//     return container;
//   };

//   // Mouse interaction handlers
//   useEffect(() => {
//     let isMouseDown = false;
//     let mouseInitialY = 0;
//     let mouseFinalY = 0;
//     let distY = 0;
//     let charIndexSelected = 0;
//     let charH = 0;
//     let elasticDropOff = 0.8;
//     let dragYScale = 0;
//     const weightInit = 600;
//     const weightTarget = 400;
//     const weightDiff = weightInit - weightTarget;
//     const stretchInit = 150;
//     const stretchTarget = 80;
//     const stretchDiff = stretchInit - stretchTarget;
//     const maxYScale = 2.5;

//     const calculateCharHeight = () => {
//       if (txtRef.current) {
//         charH = txtRef.current.offsetHeight;
//       }
//     };

//     const initTextEvents = () => {
//       const chars = charsRef.current.filter(Boolean);
//       const numChars = chars.length;

//       // Mouse events
//       const handleMouseDown = (e, index) => {
//         mouseInitialY = e.clientY;
//         charIndexSelected = index;
//         isMouseDown = true;
//         bodyRef.current.classList.add('grab');
//         console.clear();
//       };

//       const handleMouseMove = (e) => {
//         if (isMouseDown) {
//           mouseFinalY = e.clientY;
//           calcDist();
//           setFontDragDimensions();
//         }
//       };

//       const handleMouseUp = (e) => {
//         if (isMouseDown) {
//           mouseFinalY = e.clientY;
//           isMouseDown = false;
//           snapBackText();
//           bodyRef.current.classList.remove('grab');
//         }
//       };

//       // Add event listeners
//       bodyRef.current.addEventListener('mouseup', handleMouseUp);
//       bodyRef.current.addEventListener('mousemove', handleMouseMove);

//       chars.forEach((char, index) => {
//         if (char) {
//           char.addEventListener('mousedown', (e) => handleMouseDown(e, index));
//         }
//       });

//       // Cleanup
//       return () => {
//         bodyRef.current.removeEventListener('mouseup', handleMouseUp);
//         bodyRef.current.removeEventListener('mousemove', handleMouseMove);
//         chars.forEach((char) => {
//           if (char) {
//             char.removeEventListener('mousedown', handleMouseDown);
//           }
//         });
//       };
//     };

//     const calcDist = () => {
//       let maxYDragDist = charH * (maxYScale - 1);
//       distY = mouseInitialY - mouseFinalY;
//       dragYScale = distY / maxYDragDist;
//       if (dragYScale > (maxYScale - 1)) {
//         dragYScale = maxYScale - 1;
//       } else if (dragYScale < -0.5) {
//         dragYScale = -0.5;
//       }
//     };

//     const setFontDragDimensions = () => {
//       const chars = charsRef.current.filter(Boolean);
//       const numChars = chars.length;

//       gsap.to(chars, {
//         y: (index) => {
//           let fracDispersion = calcFracDispersion(index, numChars);
//           return fracDispersion * -50;
//         },
//         fontWeight: (index) => {
//           let fracDispersion = calcFracDispersion(index, numChars);
//           return weightInit - (fracDispersion * weightDiff);
//         },
//         fontStretch: (index) => {
//           let fracDispersion = calcFracDispersion(index, numChars);
//           return stretchInit - (fracDispersion * stretchDiff);
//         },
//         scaleY: (index) => {
//           let fracDispersion = calcFracDispersion(index, numChars);
//           let scaleY = 1 + fracDispersion;
//           if (scaleY < 0.5) scaleY = 0.5;
//           return scaleY;
//         },
//         ease: 'power4',
//         duration: 0.6,
//       });
//     };

//     const calcFracDispersion = (index, numChars) => {
//       let dispersion = 1 - (Math.abs(index - charIndexSelected) / (numChars * elasticDropOff));
//       return dispersion * dragYScale;
//     };

//     const snapBackText = () => {
//       const chars = charsRef.current.filter(Boolean);
//       const numChars = chars.length;

//       gsap.to(chars, {
//         y: 0,
//         fontWeight: weightInit,
//         fontStretch: stretchInit,
//         scaleY: 1,
//         ease: 'elastic(0.35, 0.1)',
//         duration: 1,
//         stagger: {
//           each: 0.02,
//           from: charIndexSelected,
//         },
//       });
//     };

//     // Initialize events after animation
//     const timeoutId = setTimeout(() => {
//       initTextEvents();
//       calculateCharHeight();
//     }, 2000); // Wait for initial animation to complete

//     // Resize handler
//     const handleResize = () => {
//       calculateCharHeight();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // Initial title animation
//   useEffect(() => {
//     if (titleRef.current) {
//       const text = titleRef.current.textContent;

//       // Clear the content and replace with split chars
//       titleRef.current.innerHTML = '';

//       // Create split text container
//       const splitContainer = splitTextIntoChars(text);
//       titleRef.current.appendChild(splitContainer);

//       // Set refs for all chars
//       const chars = splitContainer.querySelectorAll('.char');
//       charsRef.current = Array.from(chars);

//       // Animate in
//       gsap.fromTo(
//         chars,
//         {
//           y: (i) => {
//             const rect = chars[0].getBoundingClientRect();
//             return -(rect.y + 500); // Off-screen buffer
//           },
//           fontWeight: weightTarget || 400,
//           fontStretch: '80%',
//           scaleY: 2,
//         },
//         {
//           y: 0,
//           fontWeight: 600,
//           fontStretch: '150%',
//           scaleY: 1,
//           ease: 'elastic(0.2, 0.1)',
//           duration: 1.5,
//           delay: 0.5,
//           stagger: {
//             each: 0.05,
//             from: 'random',
//           },
//         }
//       );
//     }
//   }, []);


//   useEffect(() => {
//     // Smooth skew effect like the CodePen example
//     let proxy = { skew: 0 },
//       skewSetter = gsap.quickSetter('.skew-section', 'skewY', 'deg'),
//       clamp = gsap.utils.clamp(-20, 20);

//     let scrollDist = 0;
//     let requestId = null;

//     function onScroll() {
//       scrollDist = window.scrollY || window.pageYOffset;
//       if (!requestId) {
//         requestAnimationFrame(applySkew);
//       }
//     }

//     function applySkew() {
//       let lastScroll = scrollDist,
//         current = window.scrollY || window.pageYOffset,
//         velocity = current - lastScroll;
//       proxy.skew = clamp(velocity * 0.13);
//       skewSetter(proxy.skew);
//       requestId = null;
//     }

//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   // Fade-in GSAP on sections & image
//   useEffect(() => {
//     gsap.utils.toArray('.reveal-section').forEach((section) => {
//       gsap.fromTo(
//         section,
//         { autoAlpha: 0, y: 70 },
//         {
//           scrollTrigger: {
//             trigger: section,
//             start: 'top 85%',
//             end: 'bottom 20%',
//             toggleActions: 'play none none reverse',
//           },
//           duration: 1,
//           autoAlpha: 1,
//           y: 0,
//           ease: 'power3.out',
//         }
//       );
//     });
//     gsap.utils.toArray('.about-img').forEach(img => {
//       gsap.fromTo(img, { autoAlpha: 0, y: 40, scale: 0.97 }, {
//         scrollTrigger: {
//           trigger: img,
//           start: 'top 85%',
//           end: 'bottom 40%',
//           toggleActions: 'play none none reverse',
//         },
//         duration: 1.2,
//         autoAlpha: 1,
//         y: 0,
//         scale: 1,
//         ease: 'power2.out',
//       });
//     });
//   }, []);

//   return (
//     <>
//       <ExpandableDock />
//       <style jsx global>{`
//         @font-face {
//           font-family: 'GT-Flexa';
//           src: url('https://assets.codepen.io/61488/GT-Flexa-VF-Trial.woff2');
//           font-display: block;
//           font-style: normal;
//           font-weight: 100 800;
//           font-stretch: 10% 200%;
//         }

//         // body {
//         //   cursor: url("data:image/svg+xml,%3Csvg width='64px' height='64px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'%3E%3Cpath d='M419.99,560.0013c83.627,0,151.67-68.041,151.67-151.67v-198.33A46.6565,46.6565,0,0,0,499.047,171.22a46.6714,46.6714,0,0,0-70-23.3323,46.7853,46.7853,0,0,0-44.055-31.219,46.2641,46.2641,0,0,0-23.332,6.2773V46.669a46.668,46.668,0,1,0-93.336,0v272.79l-64.145-32.082a70.2983,70.2983,0,0,0-31.289-7.375,44.6638,44.6638,0,0,0-31.5,76.23l150.88,150.87A179.4167,179.4167,0,0,0,420,560ZM172.9,303.33a21.3182,21.3182,0,0,0-15.0035,36.379l150.9,150.88a156.058,156.058,0,0,0,111.18,46.082c70.77,0,128.36-57.562,128.36-128.33V210.001a23.332,23.332,0,1,0-46.664,0v58.332a11.668,11.668,0,0,1-23.336,0V186.669a23.332,23.332,0,1,0-46.664,0v81.668a11.668,11.668,0,0,1-23.336,0v-105a23.332,23.332,0,0,0-46.664,0v105a11.668,11.668,0,0,1-23.336,0V46.677a23.332,23.332,0,0,0-46.664,0v291.67a11.66,11.66,0,0,1-16.8712,10.43l-81.035-40.508a46.9273,46.9273,0,0,0-20.863-4.9258Z' transform='translate(0 -0.001)' fill='%23fff'/%3E%3Cpath d='M420,560a179.4167,179.4167,0,0,1-127.73-52.898L141.39,356.232a44.6638,44.6638,0,0,1,31.5-76.23,70.2983,70.2983,0,0,1,31.289,7.375l64.145,32.082V46.669a46.668,46.668,0,1,1,93.336,0v76.277a46.2641,46.2641,0,0,1,23.332-6.2773,46.7853,46.7853,0,0,1,44.055,31.219,46.6714,46.6714,0,0,1,70,23.3323A46.6565,46.6565,0,0,1,571.66,210.0013v198.33c0,83.629-68.043,151.67-151.67,151.67ZM172.9,303.33a21.3182,21.3182,0,0,0-15.0035,36.379l150.9,150.88a156.058,156.058,0,0,0,111.18,46.082c70.77,0,128.36-57.562,128.36-128.33V210.001a23.332,23.332,0,1,0-46.664,0v58.332a11.668,11.668,0,0,1-23.336,0V186.669a23.332,23.332,0,1,0-46.664,0v81.668a11.668,11.668,0,0,1-23.336,0v-105a23.332,23.332,0,0,0-46.664,0v105a11.668,11.668,0,0,1-23.336,0V46.677a23.332,23.332,0,0,0-46.664,0v291.67a11.66,11.66,0,0,1-16.8712,10.43l-81.035-40.508a46.9273,46.9273,0,0,0-20.863-4.9258Z' transform='translate(0 -0.001)'/%3E%3C/svg%3E") 32 32, pointer;
//         // }

//         body.grab {
//           cursor: url("data:image/svg+xml,%3Csvg width='64px' height='64px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'%3E%3Cpath d='M419.9949,560.0013a179.4167,179.4167,0,0,1-127.73-52.898l-46.691-46.668a81.2138,81.2138,0,0,1-23.914-57.77v-35.352a81.1643,81.1643,0,0,1,23.918-57.75l22.75-22.723v-53.504a46.6566,46.6566,0,0,1,72.613-38.7813,46.691,46.691,0,0,1,88.106,0,46.6714,46.6714,0,0,1,70,23.3323,46.6566,46.6566,0,0,1,72.613,38.7813v151.67c0,83.625-68.039,151.66-151.67,151.66Zm-151.6526-221.66a11.666,11.666,0,1,0,23.332,0v-46.645a.19.19,0,0,1,.0039-.0469V233.34a23.332,23.332,0,1,1,46.664,0v35a11.666,11.666,0,1,0,23.332,0l.0039-58.336a23.332,23.332,0,1,1,46.664,0V268.34a11.666,11.666,0,1,0,23.332,0l.0039-35a23.332,23.332,0,1,1,46.664,0v35a11.666,11.666,0,1,0,23.332,0l.0039-11.668a23.332,23.332,0,1,1,46.664,0l-.0039,151.67c0,70.768-57.59,128.33-128.36,128.33a156.1776,156.1776,0,0,1-111.21-46.059l-46.691-46.668a58.0537,58.0537,0,0,1-17.078-41.254v-35.352a57.9448,57.9448,0,0,1,17.082-41.254l6.2539-6.2539Z' fill='%23fff'/%3E%3Cpath d='M419.9949,560.0013a179.4167,179.4167,0,0,1-127.73-52.898l-46.691-46.668a81.2138,81.2138,0,0,1-23.914-57.77v-35.352a81.1643,81.1643,0,0,1,23.918-57.75l22.75-22.723v-53.504a46.6566,46.6566,0,0,1,72.613-38.7813,46.691,46.691,0,0,1,88.106,0,46.6714,46.6714,0,0,1,70,23.3323,46.6566,46.6566,0,0,1,72.613,38.7813v151.67c0,83.625-68.039,151.66-151.67,151.66Zm-151.66-240.17-6.2539,6.2539a57.9448,57.9448,0,0,0-17.082,41.254v35.352a58.0537,58.0537,0,0,0,17.078,41.254l46.691,46.668a156.1776,156.1776,0,0,0,111.21,46.059c70.77,0,128.36-57.562,128.36-128.33l.0039-151.67a23.332,23.332,0,1,0-46.664,0l-.0039,11.668a11.666,11.666,0,1,1-23.332,0v-35a23.332,23.332,0,1,0-46.664,0l-.0039,35a11.666,11.666,0,1,1-23.332,0v-58.336a23.332,23.332,0,1,0-46.664,0l-.0039,58.336a11.666,11.666,0,1,1-23.332,0v-35a23.332,23.332,0,1,0-46.664,0v58.309a.19.19,0,0,0-.0039,.0469v46.645a11.666,11.666,0,1,1-23.332,0Z'/%3E%3C/svg%3E") 32 32, pointer;
//         }

//         .stage {
//           position: relative;
//           display: grid;
//           place-items: center;
//           width: 100%;
//           min-height: 25vh;
//           visibility: visible;
//         }

//           // .txt {
//           //   margin: 0;
//           //   font-size: clamp(3rem, 8vw, 6rem);
//           //   font-family: 'GT-Flexa', sans-serif;
//           //   font-weight: 600;
//           //   font-stretch: 150%;
//           //   line-height: 0.8;
//           //   letter-spacing: -0.05em;
//           //   user-select: none;
//           //   text-shadow: 0 0.05em 0 #23c5e2ff,
//           //               0 0.1em 0.1em rgba(24, 195, 201, 0.8),
//           //               0 0.4em 0.3em rgba(83, 127, 223, 0.25);
//           //   color: #000000ff;
//           //   // background: linear-gradient(135deg, #60a5fa 50%, #22d3ee 30%);
//           //   -webkit-background-clip: text;
//           //   background-clip: text;
//           //   text-align: center;
//           //   padding: 2rem 0;
//           // }

//           .txt {
//                 margin: 0;
//                 font-size: clamp(3rem, 8vw, 6rem);
//                 font-family: 'GT-Flexa', sans-serif;
//                 font-weight: 600;
//                 font-stretch: 150%;
//                 line-height: 0.8;
//                 letter-spacing: -0.05em;
//                 user-select: none;
//                 text-shadow: 0 0.05em 0 #00d9ffff,
//                             0 0.1em 0.1em rgba(0, 0, 0, 1),
//                             0 0.4em 0.3em rgba(213, 215, 219, 1);
                
//                 /* Gradient Text Setup */
//                 color: transparent;
//                 background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
//                 -webkit-background-clip: text;
//                 -webkit-text-fill-color: transparent;
//                 background-clip: text;
                
//                 text-align: center;
//                 padding: 2rem 0;
//               }



//         .char {
//           position: relative;
//           display: inline-block;
//           transform-origin: center bottom;
//           padding: 0.5rem;
//           transition: all 0.3s ease;
//         }

//         .char:hover {
//           cursor: grab;
//         }
//       `}</style>

//       <Box
//         ref={wrapperRef}
//         sx={{
//           minHeight: '100vh',
//           background: '#fcfdff',
//           // color: '#334155',
//           marginTop: { '30px': '0px', 'md': '50px' },
//           pt: { xs: 2, md: 7 },
//           pb: 10,
//           px: { xs: 1, md: 0 },
//         }}
//       >
//         <Box className="stage" ref={stageRef}>
//           <Typography
//             ref={titleRef}
//             className="txt"
//             component="h1"
//             sx={{
//               fontFamily: 'GT-Flexa, sans-serif',
//               fontWeight: 600,
//               fontStretch: '150%',
//               lineHeight: 0.8,
//               letterSpacing: '-0.05em',
//               textAlign: 'center',
//               color: 'white',
//               // textShadow: '0 0.05em 0 #FFB0C0, 0 0.1em 0.1em rgba(70,0,35, 0.3), 0 0.4em 0.3em rgba(70,0,35, 0.1)',
//               margin: 0,
//               padding: { xs: '1rem 0', md: '2rem 0' },
//             }}
//           >
//             About Us
//           </Typography>
//         </Box>

//         <Container sx={{ mb: 10 }}>
//           {/* <Typography
//             level="h1"
//             sx={{
//               fontWeight: 900,
//               fontSize: { xs: '2.1rem', md: '3.8rem' },
//               mb: 2,
//               color: '#0ea5e9',
//               letterSpacing: '-0.5px',
//               textAlign: 'center',
//             }}
//           >
//             About Us
//           </Typography> */}
//           <Typography
//             level="body-lg"
//             sx={{
//               maxWidth: '716px',
//               mx: 'auto',
//               color: '#64748b',
//               textAlign: 'center',
//               fontSize: { xs: 18, md: 22 },
//               fontWeight: 500,
//               mb: 4,
//             }}
//           >
//             We're a technology-driven team with decades of industry expertise, helping organizations succeed through innovation, transparency, and smart implementation.
//           </Typography>
//         </Container>

//         {/* Foundation Section */}
//         <Container className="reveal-section skew-section" sx={{ mb: 14 }}>
//           <Stack
//             direction={{ xs: 'column', md: 'row' }}
//             alignItems="center"
//             spacing={{ xs: 5, md: 8 }}
//           >
//             <Box flex={1}>
//               <Typography
//                 level="h2"
//                 sx={{
//                   fontWeight: 800,
//                   color: '#0ea5e9',
//                   mb: 2,
//                   fontSize: { xs: '1.5rem', md: '2.4rem' },
//                 }}
//               >
//                 Foundation
//               </Typography>
//               <Typography
//                 level="body-lg"
//                 sx={{
//                   color: '#334155',
//                   fontSize: { xs: 16, md: 20 },
//                 }}
//               >
//                 FashionONE ERP is a creation of more than 20 years experienced experts in Apparel Industry domain together with highly skilled software coding team ready to challenge the new technology innovations in Software industry that helps today’s manufacturing simplified.
//               </Typography>
//             </Box>
//             <Box flex={1} textAlign="center">
//               <img src={Abtfoundation}
//                 alt="Modern ERP Foundation"
//                 className="about-img"
//                 style={{ width: '85%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd88' }}
//               />
//             </Box>
//           </Stack>
//         </Container>

//         {/* Our Vision Section */}
//         <Container className="reveal-section skew-section" sx={{ mb: 14 }}>
//           <Stack
//             direction={{ xs: 'column-reverse', md: 'row' }}
//             alignItems="center"
//             spacing={{ xs: 5, md: 8 }}
//           >
//             <Box flex={1} textAlign="center">
//               <img src={Abtvision}
//                 alt="Team vision analytics"
//                 className="about-img"
//                 style={{ width: '85%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd60' }}
//               />
//             </Box>
//             <Box flex={1}>
//               <Typography
//                 level="h2"
//                 sx={{
//                   fontWeight: 800,
//                   color: '#0ea5e9',
//                   mb: 2,
//                   fontSize: { xs: '1.5rem', md: '2.4rem' },
//                 }}
//               >
//                 Our Vision
//               </Typography>
//               <Typography
//                 level="body-lg"
//                 sx={{
//                   color: '#334155',
//                   fontSize: { xs: 16, md: 20 },
//                 }}
//               >
//                 To bring the best innovative, modern technology machineries and software together to optimize factory manufacturing process through IoT and Data Analytic, thus enabling smart factory (Industry 4.0) in action for Apparel Industry.
//               </Typography>
//             </Box>
//           </Stack>
//         </Container>

//         {/* Implementation Section */}
//         <Container className="reveal-section skew-section" sx={{ mb: 14 }}>
//           <Stack
//             direction={{ xs: 'column', md: 'row' }}
//             alignItems="center"
//             spacing={{ xs: 5, md: 8 }}
//           >
//             <Box flex={1}>
//               <Typography
//                 level="h2"
//                 sx={{
//                   fontWeight: 800,
//                   color: '#0ea5e9',
//                   mb: 2,
//                   fontSize: { xs: '1.5rem', md: '2.4rem' },
//                 }}
//               >
//                 {/* Implementation */}
//                 Digitilization
//               </Typography>
//               <Typography
//                 level="body-lg"
//                 sx={{
//                   color: '#334155',
//                   fontSize: { xs: 16, md: 20 },
//                 }}
//               >
//                 Digital technologies are transforming the apparel supply chain and manufacturing by challenging old operating models. We Kleidsys Technologies transforming the apparel supply chain from design, manufacturing, distribution and sales into digital technology
//                 {/* Our expertise and Engineering team will study in deep of each application and process to recommend the most suitable automation solution based on your need and budget and get it implemented at its best efficiency. */}
//               </Typography>
//             </Box>
//             <Box flex={1} textAlign="center">
//               {/* <img src={Abtimplement2} */}
//               <img src={Abdigitali}
//                 alt="Implementation consulting illustration"
//                 className="about-img"
//                 style={{ width: '85%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd75' }}
//               />
//             </Box>
//           </Stack>
//         </Container>

//         <Container className="reveal-section skew-section"
//         //  sx={{ mb: 1 }}
//         >
//           <Stack
//             direction={{ xs: 'column-reverse', md: 'row' }}
//             alignItems="center"
//             spacing={{ xs: 5, md: 8 }}
//           >
//             <Box flex={1} textAlign="center">
//               <img src={Abtimplement2}
//                 alt="Team vision analytics"
//                 className="about-img"
//                 style={{ width: '80%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd60' }}
//               />
//             </Box>
//             <Box flex={1}>
//               <Typography
//                 level="h2"
//                 sx={{
//                   fontWeight: 800,
//                   color: '#0ea5e9',
//                   mb: 2,
//                   fontSize: { xs: '1.5rem', md: '2.4rem' },
//                 }}
//               >
//                 Implementation
//               </Typography>
//               <Typography
//                 level="body-lg"
//                 sx={{
//                   color: '#334155',
//                   fontSize: { xs: 16, md: 20 },
//                 }}
//               >
//                 {/* Digital technologies are transforming the apparel supply chain and manufacturing by challenging old operating models. We Kleidsys Technologies transforming the apparel supply chain from design, manufacturing, distribution and sales into digital technology           
//                  */}
//                 Our expertise and Engineering team will study in deep of each application and process to recommend the most suitable automation solution based on your need and budget and get it implemented at its best efficiency.
//               </Typography>
//             </Box>
//           </Stack>
//         </Container>

//         {/* Footer section for some polish */}
//         {/* <Box sx={{ mt: 20, textAlign: 'center', color: '#7dd3fc', fontWeight: 500 }}>
//           &copy; {new Date().getFullYear()} KleidSys Technology Private Limited. All rights reserved.
//         </Box> */}
//       </Box>
//       <Footer />
//     </>
//   );
// };
// export default AboutUs;


import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Stack } from '@mui/joy';
import * as Scrollytelling from '@bsmnt/scrollytelling';
import gsap from 'gsap';
import ExpandableDock from './dock/ExpandableDock';
import Footer from './Footer';
import Abtfoundation from '../assets/Abtfoundation.png';
import Abtvision from '../assets/Abtimplement2.png';
import Abtimplement2 from '../assets/Abtimplement2.png';
import Abdigitali from '../assets/Abdigital.png';

const coloredSegments = [
  { text: "A tech-driven team", color: "#09efeb" },
  { text: "with decades of expertise", color: "#5aa1e9" },
  { text: "and a world-class coding crew,", color: "#ff6600" },
  { text: "delivering smart, innovative solutions.", color: "#00f2ff" }
];

const AboutUs = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const charsRef = useRef([]);
  const stickyTextRef = useRef(null);

  // Animation constants for interactive title
  const weightInit = 600;
  const weightTarget = 400;
  const weightDiff = weightInit - weightTarget;
  const stretchInit = 150;
  const stretchTarget = 80;
  const stretchDiff = stretchInit - stretchTarget;
  const maxYScale = 2.5;
  const elasticDropOff = 0.8;

  // Smooth scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyTextRef.current) return;
      
      const stickySection = stickyTextRef.current;
      const rect = stickySection.getBoundingClientRect();
      const sectionHeight = stickySection.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress when sticky section is in viewport
      const scrollStart = -rect.top;
      const scrollEnd = sectionHeight - viewportHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
      
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split text utility for interactive title
  const splitTextIntoChars = (text) => {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.display = 'inline-block';

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'char';
      span.style.cssText = `
        position: relative;
        display: inline-block;
        padding-top: 1.08vw;
        text-align: center;
        will-change: font-weight, font-stretch, transform;
      `;
      container.appendChild(span);
    });

    return container;
  };

  // Interactive title mouse effects
  useEffect(() => {
    let isMouseDown = false;
    let mouseInitialY = 0;
    let mouseFinalY = 0;
    let distY = 0;
    let charIndexSelected = 0;
    let charH = 0;
    let dragYScale = 0;

    const calculateCharHeight = () => {
      if (titleRef.current) {
        charH = titleRef.current.offsetHeight;
      }
    };

    const calcDist = () => {
      let maxYDragDist = charH * (maxYScale - 1);
      distY = mouseInitialY - mouseFinalY;
      dragYScale = distY / maxYDragDist;
      dragYScale = Math.max(-0.5, Math.min(maxYScale - 1, dragYScale));
    };

    const calcFracDispersion = (index, numChars) => {
      let dispersion = 1 - (Math.abs(index - charIndexSelected) / (numChars * elasticDropOff));
      return dispersion * dragYScale;
    };

    const setFontDragDimensions = () => {
      const chars = charsRef.current.filter(Boolean);
      const numChars = chars.length;

      gsap.to(chars, {
        y: (index) => calcFracDispersion(index, numChars) * -50,
        fontWeight: (index) => weightInit - (calcFracDispersion(index, numChars) * weightDiff),
        fontStretch: (index) => stretchInit - (calcFracDispersion(index, numChars) * stretchDiff),
        scaleY: (index) => {
          let fracDispersion = calcFracDispersion(index, numChars);
          return Math.max(0.5, 1 + fracDispersion);
        },
        ease: 'power4',
        duration: 0.6,
      });
    };

    const snapBackText = () => {
      const chars = charsRef.current.filter(Boolean);
      gsap.to(chars, {
        y: 0,
        fontWeight: weightInit,
        fontStretch: stretchInit,
        scaleY: 1,
        ease: 'elastic(0.35, 0.1)',
        duration: 1,
        stagger: {
          each: 0.02,
          from: charIndexSelected,
        },
      });
    };

    const initTextEvents = () => {
      const chars = charsRef.current.filter(Boolean);

      const handleMouseDown = (e, index) => {
        mouseInitialY = e.clientY;
        charIndexSelected = index;
        isMouseDown = true;
        document.body.classList.add('grab');
      };

      const handleMouseMove = (e) => {
        if (isMouseDown) {
          mouseFinalY = e.clientY;
          calcDist();
          setFontDragDimensions();
        }
      };

      const handleMouseUp = () => {
        if (isMouseDown) {
          isMouseDown = false;
          snapBackText();
          document.body.classList.remove('grab');
        }
      };

      document.body.addEventListener('mouseup', handleMouseUp);
      document.body.addEventListener('mousemove', handleMouseMove);

      chars.forEach((char, index) => {
        if (char) {
          char.addEventListener('mousedown', (e) => handleMouseDown(e, index));
        }
      });

      return () => {
        document.body.removeEventListener('mouseup', handleMouseUp);
        document.body.removeEventListener('mousemove', handleMouseMove);
      };
    };

    const timeoutId = setTimeout(() => {
      initTextEvents();
      calculateCharHeight();
    }, 200);

    const handleResize = () => calculateCharHeight();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initial title animation
  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      titleRef.current.innerHTML = '';

      const splitContainer = splitTextIntoChars(text);
      titleRef.current.appendChild(splitContainer);

      const chars = splitContainer.querySelectorAll('.char');
      charsRef.current = Array.from(chars);

      gsap.fromTo(
        chars,
        {
          y: -500,
          fontWeight: weightTarget || 400,
          fontStretch: '80%',
          scaleY: 2,
        },
        {
          y: 0,
          fontWeight: 600,
          fontStretch: '150%',
          scaleY: 1,
          ease: 'elastic(0.2, 0.1)',
          duration: 1.5,
          delay: 0.5,
          stagger: {
            each: 0.05,
            from: 'random',
          },
        }
      );
    }
  }, []);

  // Sections data
  const sectionsData = [
    {
      title: 'Foundation',
      content: "FashionONE ERP is a creation of more than 20 years experienced experts in Apparel Industry domain together with highly skilled software coding team ready to challenge the new technology innovations in Software industry that helps today's manufacturing simplified.",
      image: Abtfoundation,
      imagePosition: 'right'
    },
    {
      title: 'Our Vision',
      content: 'To bring the best innovative, modern technology machineries and software together to optimize factory manufacturing process through IoT and Data Analytic, thus enabling smart factory (Industry 4.0) in action for Apparel Industry.',
      image: Abtvision,
      imagePosition: 'right'
    },
    {
      title: 'Digitalization',
      content: 'Digital technologies are transforming the apparel supply chain and manufacturing by challenging old operating models. We Kleidsys Technologies transforming the apparel supply chain from design, manufacturing, distribution and sales into digital technology',
      image: Abdigitali,
      imagePosition: 'right'
    },
    {
      title: 'Implementation',
      content: 'Our expertise and Engineering team will study in deep of each application and process to recommend the most suitable automation solution based on your need and budget and get it implemented at its best efficiency.',
      image: Abtimplement2,
      imagePosition: 'right'
    }
  ];

  return (
    <>
      <ExpandableDock />
      
      {/* Global styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @font-face {
          font-family: 'GT-Flexa';
          src: url('https://assets.codepen.io/61488/GT-Flexa-VF-Trial.woff2');
          font-display: block;
          font-style: normal;
          font-weight: 100 800;
          font-stretch: 10% 200%;
        }

        body.grab {
          cursor: grab;
        }

        .stage {
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          min-height: 25vh;
          visibility: visible;
        }

        .txt {
          margin: 0;
          font-size: clamp(3rem, 8vw, 6rem);
          font-family: 'GT-Flexa', sans-serif;
          font-weight: 600;
          font-stretch: 150%;
          line-height: 0.8;
          letter-spacing: -0.05em;
          user-select: none;
          text-shadow: 0 0.05em 0 #00d9ff,
                      0 0.1em 0.1em rgba(0, 0, 0, 0.8),
                      0 0.4em 0.3em rgba(213, 215, 219, 0.6);
          color: transparent;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          padding: 2rem 0;
        }

        .char {
          position: relative;
          display: inline-block;
          transform-origin: center bottom;
          padding: 0.5rem;
          transition: all 0.3s ease;
        }

        .char:hover {
          cursor: grab;
        }

        .panel {
          background: #fcfdff;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}} />

      <Box sx={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Interactive Title Section */}
        <Box
          sx={{
            minHeight: '50vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 2, md: 4 },
            py: { xs: 8, md: 12 }
          }}
        >
          <Box className="stage"
          sx={{
              position: 'sticky',
          }}>
            <Typography ref={titleRef} className="txt" component="h1">
              About Us
            </Typography>
          </Box>
        </Box>

        {/* Sticky Text Color Reveal Section */}
        <Box
          ref={stickyTextRef}
          sx={{
            minHeight: '800vh',
            position: 'relative',
            background: '#ffffff'
          }}
        >
          <Box
            sx={{
              position: 'sticky',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '40vh',
              width: '100%',
              zIndex: 100,
              px: { xs: 3, sm: 4, md: 6 }
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.rem',
                  lg: '3rem'
                },
                textAlign: 'center',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                maxWidth: '900px',
                textTransform: 'none'
              }}
            >
              {coloredSegments.map((seg, i) => {
                const segmentProgress = i / coloredSegments.length;
                const reveal = progress > segmentProgress;
                
                return (
                  <Box
                    key={i}
                    component="span"
                    sx={{
                      color: reveal ? seg.color : '#d1d5db',
                      transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'inline',
                      marginRight: '0.4em'
                    }}
                  >
                    {seg.text}{' '}
                  </Box>
                );
              })}
            </Typography>
          </Box>
        </Box>

        {/* Horizontal Scroll Sections */}
        <Scrollytelling.Root defaults={{ ease: 'none' }} scrub={0.5}>
          <Scrollytelling.Pin
            childHeight="100vh"
            pinSpacerHeight="400vh"
            ref={containerRef}
          >
            <Scrollytelling.Animation
              tween={{
                start: 0,
                end: 100,
                to: { xPercent: -100 * (sectionsData.length - 1) }
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  width: `${sectionsData.length * 100}vw`, 
                  height: '100vh' 
                }}
              >
                {sectionsData.map((section, index) => (
                  <Box
                    key={index}
                    className="panel"
                    sx={{
                      width: '100vw',
                      height: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: { xs: 3, sm: 4, md: 6, lg: 8 },
                      flexShrink: 0,
                    }}
                  >
                    <Container maxWidth="xl">
                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems="center"
                        spacing={{ xs: 4, md: 6, lg: 8 }}
                        sx={{
                          opacity: 0,
                          animation: `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`
                        }}
                      >
                        {section.imagePosition === 'left' && (
                          <Box 
                            flex={1} 
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              opacity: 0,
                              animation: `fadeInScale 0.8s ease-out ${index * 0.2 + 0.2}s forwards`
                            }}
                          >
                            <Box
                              component="img"
                              src={section.image}
                              alt={section.title}
                              sx={{
                                width: { xs: '100%', md: '85%' },
                                maxWidth: '500px',
                                height: 'auto',
                                borderRadius: 3,
                                boxShadow: '0 10px 40px rgba(186, 230, 253, 0.5)'
                              }}
                            />
                          </Box>
                        )}
                        
                        <Box flex={1} sx={{ width: '100%' }}>
                          <Typography
                            level="h2"
                            sx={{
                              fontWeight: 800,
                              color: '#0ea5e9',
                              mb: { xs: 2, md: 3 },
                              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                              opacity: 0,
                              animation: `fadeInUp 0.8s ease-out ${index * 0.2 + 0.1}s forwards`
                            }}
                          >
                            {section.title}
                          </Typography>
                          <Typography
                            level="body-lg"
                            sx={{
                              color: '#334155',
                              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.375rem' },
                              lineHeight: 1.7,
                              opacity: 0,
                              animation: `fadeInUp 0.8s ease-out ${index * 0.2 + 0.2}s forwards`
                            }}
                          >
                            {section.content}
                          </Typography>
                        </Box>

                        {section.imagePosition === 'right' && (
                          <Box 
                            flex={1}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              opacity: 0,
                              animation: `fadeInScale 0.8s ease-out ${index * 0.2 + 0.3}s forwards`
                            }}
                          >
                            <Box
                              component="img"
                              src={section.image}
                              alt={section.title}
                              sx={{
                                width: { xs: '100%', md: '85%' },
                                maxWidth: '500px',
                                height: 'auto',
                                borderRadius: 30,
                                boxShadow: '0 10px 40px rgba(186, 230, 253, 0.5)'
                              }}
                            />
                          </Box>
                        )}
                      </Stack>
                    </Container>
                  </Box>
                ))}
              </Box>
            </Scrollytelling.Animation>
          </Scrollytelling.Pin>
        </Scrollytelling.Root>

        {/* Footer */}
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;