import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/joy';
import { gsap } from 'gsap';
// import dockRight from '../../assets/dockRight.jpg';

const ImagePeelEffect = ({ imageSrc }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Peel-off animation on load
  useEffect(() => {
    const layers = 5;
    const container = containerRef.current;

    // Create peel layers
    for (let i = 0; i < layers; i++) {
      const layer = document.createElement('div');
      layer.className = 'peel-layer';
      layer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${imageSrc});
        background-size: cover;
        background-position: center;
        transform-origin: top left;
        opacity: ${1 - i * 0.15};
      `;
      container.appendChild(layer);

      // Peel animation
      gsap.fromTo(
        layer,
        {
          scaleY: 1,
          scaleX: 1,
          transformOrigin: 'top center',
        },
        {
          scaleY: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.inOut',
          onComplete: () => {
            if (i === layers - 1) {
              // Show final image
              gsap.to(imageRef.current, {
                opacity: 1,
                duration: 0.5,
              });
            }
          },
        }
      );
    }
  }, [imageSrc]);

  // Decay effect on hover
  useEffect(() => {
    if (isHovered && imageRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(imageRef.current, {
        filter: 'hue-rotate(20deg) saturate(1.3)',
        duration: 0.3,
      })
        .to(imageRef.current, {
          x: gsap.utils.random(-3, 3),
          y: gsap.utils.random(-3, 3),
          duration: 0.1,
          repeat: 5,
        })
        .to(imageRef.current, {
          filter: 'hue-rotate(0deg) saturate(1)',
          duration: 0.3,
        });
    }
  }, [isHovered]);

  return (
    <Box
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        width: { xs: '200px', md: '800px' },
        height: { xs: '200px', md: '300px' },
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(14, 165, 233, 0.2)',
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <img
        ref={imageRef}
        src={imageSrc}
        alt="ERP Dashbdddddoard"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0,
          borderRadius: '20px',
        }}
      />
    </Box>
  );
};

export default ImagePeelEffect;
